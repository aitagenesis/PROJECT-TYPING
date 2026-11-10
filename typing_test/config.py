import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "change-this-development-key")
    DATABASE = os.path.join(os.path.dirname(__file__), "database", "typing.db")
