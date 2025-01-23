import inspect
import os


def current_folder():
    caller_frame = inspect.stack()[1]
    caller_file = os.path.abspath(caller_frame.filename)
    caller_folder = os.path.dirname(caller_file)
    return caller_folder

