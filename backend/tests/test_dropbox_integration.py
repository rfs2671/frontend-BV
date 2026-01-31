"""
Backend API Tests for Dropbox Integration
Tests the Dropbox-related endpoints for the Blueview construction management app
"""
import pytest
import requests
import os

BASE_URL = "https://blueview2-production.up.railway.app"

# Test credentials
TEST_EMAIL = "rfs2671@gmail.com"
TEST_PASSWORD = "Asdddfgh1$"


class TestAuthentication:
    """Authentication endpoint tests"""
    
    def test_login_success(self):
        """Test login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "token" in data
        assert "user" in data
        assert data["user"]["email"] == TEST_EMAIL
        assert data["user"]["role"] == "admin"
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "invalid@example.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401


@pytest.fixture(scope="module")
def auth_token():
    """Get authentication token for tests"""
    response = requests.post(f"{BASE_URL}/api/auth/login", json={
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    })
    if response.status_code == 200:
        return response.json().get("token")
    pytest.skip("Authentication failed - skipping authenticated tests")


@pytest.fixture
def authenticated_headers(auth_token):
    """Headers with auth token"""
    return {
        "Authorization": f"Bearer {auth_token}",
        "Content-Type": "application/json"
    }


class TestDropboxStatus:
    """Dropbox status endpoint tests"""
    
    def test_get_dropbox_status(self, authenticated_headers):
        """Test GET /api/dropbox/status returns connection status"""
        response = requests.get(
            f"{BASE_URL}/api/dropbox/status",
            headers=authenticated_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert "connected" in data
        assert isinstance(data["connected"], bool)
        # connected_at can be null if not connected
        assert "connected_at" in data
    
    def test_dropbox_status_requires_auth(self):
        """Test that dropbox status requires authentication"""
        response = requests.get(f"{BASE_URL}/api/dropbox/status")
        # API returns 403 Forbidden for unauthenticated requests
        assert response.status_code in [401, 403]


class TestDropboxAuthUrl:
    """Dropbox OAuth URL endpoint tests"""
    
    def test_get_auth_url(self, authenticated_headers):
        """Test GET /api/dropbox/auth-url returns OAuth URL"""
        response = requests.get(
            f"{BASE_URL}/api/dropbox/auth-url",
            headers=authenticated_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert "authorize_url" in data
        assert "dropbox.com/oauth2/authorize" in data["authorize_url"]
        assert "client_id=" in data["authorize_url"]
    
    def test_auth_url_requires_auth(self):
        """Test that auth URL requires authentication"""
        response = requests.get(f"{BASE_URL}/api/dropbox/auth-url")
        # API returns 403 Forbidden for unauthenticated requests
        assert response.status_code in [401, 403]


class TestProjects:
    """Projects endpoint tests"""
    
    def test_get_all_projects(self, authenticated_headers):
        """Test GET /api/projects returns list"""
        response = requests.get(
            f"{BASE_URL}/api/projects",
            headers=authenticated_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_projects_requires_auth(self):
        """Test that projects endpoint requires authentication"""
        response = requests.get(f"{BASE_URL}/api/projects")
        # API returns 403 Forbidden for unauthenticated requests
        assert response.status_code in [401, 403]


class TestDropboxFolders:
    """Dropbox folders endpoint tests (requires Dropbox to be connected)"""
    
    def test_get_folders_not_connected(self, authenticated_headers):
        """Test GET /api/dropbox/folders when not connected"""
        response = requests.get(
            f"{BASE_URL}/api/dropbox/folders",
            headers=authenticated_headers
        )
        # Should return error or empty when not connected
        # Accept 400 (not connected), 404 (not found), or 200 (empty list)
        assert response.status_code in [200, 400, 403, 404]


class TestProjectDropboxFiles:
    """Project Dropbox files endpoint tests"""
    
    def test_get_project_files_invalid_project(self, authenticated_headers):
        """Test GET /api/projects/{id}/dropbox-files with invalid project"""
        response = requests.get(
            f"{BASE_URL}/api/projects/invalid_id/dropbox-files",
            headers=authenticated_headers
        )
        # Should return 404 or 400 for invalid project
        assert response.status_code in [400, 404, 422]


class TestDropboxDisconnect:
    """Dropbox disconnect endpoint tests"""
    
    def test_disconnect_when_not_connected(self, authenticated_headers):
        """Test DELETE /api/dropbox/disconnect when not connected"""
        response = requests.delete(
            f"{BASE_URL}/api/dropbox/disconnect",
            headers=authenticated_headers
        )
        # Should succeed or return appropriate error
        assert response.status_code in [200, 400, 404]


class TestAuthMe:
    """Auth me endpoint tests"""
    
    def test_get_current_user(self, authenticated_headers):
        """Test GET /api/auth/me returns current user"""
        response = requests.get(
            f"{BASE_URL}/api/auth/me",
            headers=authenticated_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert "email" in data
        assert data["email"] == TEST_EMAIL


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
