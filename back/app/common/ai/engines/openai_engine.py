import os
from typing import TypeVar, Type

from faker import Faker
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
from pydantic import BaseModel

from common.ai.custom_faker_schema import CustomFakerSchema

T = TypeVar("T", bound=BaseModel)


class OpenAiEngine:
    @staticmethod
    def get_ai_response(prompt: str,
                        key: str,
                        response_model: Type[T],
                        model: str = "gpt-4o-mini") -> T:
        api_key = key
        chat = ChatOpenAI(model_name=model, temperature=0, openai_api_key=api_key)
        schema = response_model.model_json_schema()
        faker = Faker()
        custom_schema = CustomFakerSchema()
        custom_schema._faker = faker
        sample_json = custom_schema.generate_fake(schema)
        formatted_prompt = (
            f"{prompt}\n\n"
            "!!!Do not include any explanations, only provide a RFC8259 compliant"
            f" JSON response following this format without deviation: {sample_json}"
        )
        messages = [HumanMessage(content=formatted_prompt)]
        ai_response = chat(messages)
        resp = ai_response.content.strip()
        if resp.startswith("```json"):
            resp = resp[7:]
        if resp.endswith("```"):
            resp = resp[:-3]
        return response_model.parse_raw(resp)
