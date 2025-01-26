"""20250126_184249

Revision ID: c791d3729909
Revises: fd1efa34b04d
Create Date: 2025-01-26 18:42:50.467426
"""

from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'c791d3729909'
down_revision: Union[str, None] = 'fd1efa34b04d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def table_has_column(table_name: str, column_name: str) -> bool:
    conn = op.get_bind()
    insp = sa.inspect(conn)
    columns = [col["name"] for col in insp.get_columns(table_name)]
    return column_name in columns


def upgrade() -> None:
    if not table_has_column("settings", "value"):
        op.add_column('settings', sa.Column('value', sa.String(), nullable=False))

    with op.batch_alter_table('settings') as batch_op:
        batch_op.alter_column('name',
                              existing_type=sa.TEXT(),
                              type_=sa.String(),
                              existing_nullable=False)


def downgrade() -> None:
    with op.batch_alter_table('settings') as batch_op:
        if table_has_column("settings", "value"):
            batch_op.drop_column('value')
        batch_op.alter_column('name',
                              existing_type=sa.String(),
                              type_=sa.TEXT(),
                              existing_nullable=False)
