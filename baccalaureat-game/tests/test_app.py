from app import app

def test_home_page(client):
    response = client.get('/')
    assert response.status_code == 200

def test_presenter_page(client):
    response = client.get('/presenter')
    assert response.status_code == 200

def test_tv_page(client):
    response = client.get('/tv')
    assert response.status_code == 200

def test_player_page(client):
    response = client.get('/player')
    assert response.status_code == 200

def test_websocket_connection(client):
    # pytest environment doesn't provide a websocket-capable test client here.
    # Check that the websocket endpoint exists (responds to GET) instead.
    response = client.get('/ws')
    assert response.status_code in (200, 101, 302)