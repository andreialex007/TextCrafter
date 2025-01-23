import subprocess
from pathlib import Path

from alembic import command
from alembic.config import Config

from common.utils import current_folder


def run_app_migrations():
    root = Path(__file__).parent
    alembic_ini = root / "alembic.ini"
    subprocess.run(["alembic", "-c", str(alembic_ini), "upgrade", "head"], check=True)
