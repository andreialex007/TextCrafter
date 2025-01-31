import os
from typing import TypeVar, Type

from faker import Faker
from faker.providers import BaseProvider
from faker_schema.faker_schema import FakerSchema
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
from pydantic import BaseModel


class CustomFakerSchema(FakerSchema):
    """
    Custom implementation of FakerSchema to add fallback defaults
    for unsupported or generic types.
    """

    def _generate_one_fake(self, schema):
        try:
            data = {}
            for key, value in schema.get("properties", {}).items():
                schema_type = value.get("type")

                # Provide fallback values for various types
                if schema_type == "string":
                    data[key] = "example_string"
                elif schema_type == "integer":
                    data[key] = 0
                elif schema_type == "boolean":
                    data[key] = True
                elif schema_type == "array":
                    data[key] = ["example_item"]
                elif schema_type == "object":
                    # Recursively handle nested objects
                    data[key] = self._generate_one_fake(value)
                else:
                    # Fallback for unknown types
                    data[key] = None
            return data
        except AttributeError:
            # Use base class behavior as fallback
            return super()._generate_one_fake(schema)


T = TypeVar("T", bound=BaseModel)


class AiEngine:
    @staticmethod
    def get_ai_response(prompt: str, response_model: Type[T], model: str = "gpt-4o") -> T:
        api_key = os.getenv("GPT_KEY")
        chat = ChatOpenAI(model_name=model, temperature=0, openai_api_key=api_key)

        # Get JSON schema from the Pydantic response model
        schema = response_model.model_json_schema()

        # Initialize Faker and CustomFakerSchema
        faker = Faker()  # Base faker instance
        custom_schema = CustomFakerSchema()
        custom_schema._faker = faker  # Use the base faker instance in CustomFakerSchema

        # Generate fake data using the custom schema
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
