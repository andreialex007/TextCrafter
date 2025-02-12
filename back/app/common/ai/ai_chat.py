from common.ai.chat_response import TextProcessingResult
from common.ai.engines.claude_engine import ClaudeSonnetEngine
from common.ai.engines.openai_engine import OpenAiEngine


class AiChat:
    @staticmethod
    def get_suggestions(text: str, prompt: str, key: str,
                        options: int = 3) -> TextProcessingResult:
        return ClaudeSonnetEngine.get_ai_response(
            f"{prompt} (generate {options} variants): {text}",
            key,
            TextProcessingResult)
