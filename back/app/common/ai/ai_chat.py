from common.ai.ai_engine import AiEngine
from common.ai.chat_response import TextProcessingResult


class AiChat:
    @staticmethod
    def get_suggestions(text: str, prompt: str) -> TextProcessingResult:
        return AiEngine.get_ai_response(f"{prompt}: {text}", TextProcessingResult)
