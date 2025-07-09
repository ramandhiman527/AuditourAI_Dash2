#!/usr/bin/env python3
import requests
import json
import sys
import time
import os
from datetime import datetime

# Get the backend URL from the frontend .env file
def get_backend_url():
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.strip().split('=')[1].strip('"\'')
    return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("Error: Could not find REACT_APP_BACKEND_URL in frontend/.env")
    sys.exit(1)

API_URL = f"{BACKEND_URL}/api"
print(f"Testing backend at: {API_URL}")

def test_health_check():
    """Test the root endpoint for health check"""
    print("\n=== Testing Health Check ===")
    try:
        response = requests.get(f"{API_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert "message" in response.json(), "Response does not contain 'message' field"
        assert response.json()["message"] == "Hello World", f"Expected 'Hello World', got {response.json()['message']}"
        
        print("✅ Health check test passed")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Health check test failed: {e}")
        return False
    except AssertionError as e:
        print(f"❌ Health check test failed: {e}")
        return False

def test_cors_headers():
    """Test CORS headers are properly set"""
    print("\n=== Testing CORS Configuration ===")
    try:
        # Send OPTIONS request to check CORS headers
        response = requests.options(f"{API_URL}/", headers={
            "Origin": "http://example.com",
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "Content-Type"
        })
        
        print(f"Status Code: {response.status_code}")
        print(f"CORS Headers: {json.dumps(dict(response.headers), indent=2)}")
        
        assert response.status_code in [200, 204], f"Expected status code 200 or 204, got {response.status_code}"
        assert "Access-Control-Allow-Origin" in response.headers, "Missing Access-Control-Allow-Origin header"
        assert "Access-Control-Allow-Methods" in response.headers, "Missing Access-Control-Allow-Methods header"
        assert "Access-Control-Allow-Headers" in response.headers, "Missing Access-Control-Allow-Headers header"
        
        print("✅ CORS configuration test passed")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ CORS configuration test failed: {e}")
        return False
    except AssertionError as e:
        print(f"❌ CORS configuration test failed: {e}")
        return False

def test_invalid_endpoint():
    """Test error handling for invalid endpoints"""
    print("\n=== Testing Error Handling for Invalid Endpoints ===")
    try:
        response = requests.get(f"{API_URL}/nonexistent_endpoint")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:200]}...")  # Show first 200 chars
        
        assert response.status_code == 404, f"Expected status code 404, got {response.status_code}"
        assert "detail" in response.json(), "Response does not contain 'detail' field"
        
        print("✅ Invalid endpoint test passed")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Invalid endpoint test failed: {e}")
        return False
    except AssertionError as e:
        print(f"❌ Invalid endpoint test failed: {e}")
        return False

def test_status_endpoint():
    """Test the status endpoint for database connection"""
    print("\n=== Testing Status Endpoint (Database Connection) ===")
    try:
        # First, create a status check
        client_name = f"test_client_{datetime.utcnow().isoformat()}"
        create_response = requests.post(
            f"{API_URL}/status", 
            json={"client_name": client_name}
        )
        
        print(f"Create Status Code: {create_response.status_code}")
        print(f"Create Response: {create_response.json()}")
        
        assert create_response.status_code == 200, f"Expected status code 200, got {create_response.status_code}"
        assert "id" in create_response.json(), "Response does not contain 'id' field"
        assert create_response.json()["client_name"] == client_name, f"Expected client_name '{client_name}', got {create_response.json()['client_name']}"
        
        # Then, get all status checks to verify the one we created is there
        get_response = requests.get(f"{API_URL}/status")
        
        print(f"Get Status Code: {get_response.status_code}")
        print(f"Get Response (first few items): {json.dumps(get_response.json()[:2], indent=2)}")
        
        assert get_response.status_code == 200, f"Expected status code 200, got {get_response.status_code}"
        assert isinstance(get_response.json(), list), "Response is not a list"
        
        # Check if our created status check is in the list
        created_id = create_response.json()["id"]
        found = False
        for status in get_response.json():
            if status["id"] == created_id:
                found = True
                break
        
        assert found, f"Created status check with id {created_id} not found in the list"
        
        print("✅ Status endpoint test passed")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Status endpoint test failed: {e}")
        return False
    except AssertionError as e:
        print(f"❌ Status endpoint test failed: {e}")
        return False

def test_api_docs():
    """Test the FastAPI documentation endpoint"""
    print("\n=== Testing API Documentation ===")
    try:
        # FastAPI docs are at /docs
        response = requests.get(f"{BACKEND_URL}/docs")
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Content Type: {response.headers.get('Content-Type', 'Not specified')}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert "text/html" in response.headers.get('Content-Type', ''), "Response is not HTML"
        assert "swagger" in response.text.lower(), "Swagger UI not found in docs"
        
        print("✅ API documentation test passed")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ API documentation test failed: {e}")
        return False
    except AssertionError as e:
        print(f"❌ API documentation test failed: {e}")
        return False

def run_all_tests():
    """Run all tests and return overall result"""
    print(f"\n{'='*50}")
    print(f"STARTING BACKEND API TESTS AT {datetime.utcnow().isoformat()}")
    print(f"{'='*50}")
    
    tests = [
        ("Health Check", test_health_check),
        ("CORS Configuration", test_cors_headers),
        ("Error Handling", test_invalid_endpoint),
        ("Database Connection", test_status_endpoint),
        ("API Documentation", test_api_docs)
    ]
    
    results = []
    for name, test_func in tests:
        print(f"\n{'-'*50}")
        print(f"Running test: {name}")
        try:
            result = test_func()
            results.append((name, result))
        except Exception as e:
            print(f"❌ Test '{name}' failed with unexpected error: {e}")
            results.append((name, False))
    
    print(f"\n{'='*50}")
    print("TEST RESULTS SUMMARY")
    print(f"{'='*50}")
    
    all_passed = True
    for name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{name}: {status}")
        if not result:
            all_passed = False
    
    print(f"\n{'='*50}")
    if all_passed:
        print("🎉 ALL TESTS PASSED! Backend API is working correctly.")
    else:
        print("❌ SOME TESTS FAILED. See details above.")
    
    return all_passed

if __name__ == "__main__":
    run_all_tests()