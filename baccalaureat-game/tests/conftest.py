import pytest

from app import app as flask_app


@pytest.fixture
def app():
    """Provide the Flask application instance to pytest-flask fixtures."""
    return flask_app
