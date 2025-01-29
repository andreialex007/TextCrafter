from common.database import Prompt, Category
from core.categories.category_dto import CategoryDto
from core.prompts.prompt_dto import PromptDto


class CategoryMapper:
    @staticmethod
    def to_category_dto(category: Category) -> CategoryDto:
        return CategoryDto(
            id=category.id,
            name=category.name,
            description=category.description
        )
