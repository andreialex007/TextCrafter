"""20250129_114444

Revision ID: f20ffa078a6e
Revises: c791d3729909
Create Date: 2025-01-29 11:44:45.603582

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'f20ffa078a6e'
down_revision: Union[str, None] = 'c791d3729909'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table("categories") as batch_op:
        # Add as nullable first
        batch_op.add_column(sa.Column("user_id", sa.Integer(), nullable=True))

        # Populate data
        batch_op.execute("UPDATE categories SET user_id = (SELECT id FROM users LIMIT 1)")

        # Add foreign key
        batch_op.create_foreign_key("fk_categories_user_id", "users", ["user_id"], ["id"])


def downgrade() -> None:
    with op.batch_alter_table("categories") as batch_op:
        batch_op.drop_constraint("fk_categories_user_id", type_="foreignkey")
        batch_op.drop_column("user_id")
