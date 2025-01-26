"""20250126_130657

Revision ID: fd1efa34b04d
Revises: 9c23646b1157
Create Date: 2025-01-26 13:06:58.615968
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from alembic.operations import ops

# revision identifiers, used by Alembic.
revision: str = 'fd1efa34b04d'
down_revision: Union[str, None] = '9c23646b1157'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Use batch operations for SQLite
    with op.batch_alter_table('prompts') as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(), nullable=False))
        batch_op.create_unique_constraint('uq_prompts_name', ['name'])


def downgrade() -> None:
    with op.batch_alter_table('prompts') as batch_op:
        batch_op.drop_constraint('uq_prompts_name', type_='unique')
        batch_op.drop_column('name')
