import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from accounts.models import User, ApplicantProfile, EmployerProfile
from companies.models import Company
from jobs.models import Job

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def applicant_user(db):
    user = User.objects.create_user(username='applicant1', password='password123', role='applicant')
    return user

@pytest.fixture
def employer_user(db):
    user = User.objects.create_user(username='employer1', password='password123', role='employer')
    return user

@pytest.mark.django_db
def test_user_registration(api_client):
    url = reverse('register')
    data = {
        'username': 'newuser',
        'password': 'password123',
        'email': 'new@test.com',
        'role': 'applicant'
    }
    response = api_client.post(url, data)
    assert response.status_code == 201
    assert User.objects.filter(username='newuser').exists()
    assert ApplicantProfile.objects.filter(user__username='newuser').exists()

@pytest.mark.django_db
def test_user_login(api_client, applicant_user):
    url = reverse('login')
    data = {
        'username': 'applicant1',
        'password': 'password123'
    }
    response = api_client.post(url, data)
    assert response.status_code == 200
    assert 'access' in response.data

@pytest.mark.django_db
def test_create_company_requires_auth(api_client):
    response = api_client.post('/api/companies/', {'name': 'Test Corp', 'location': 'NY'})
    assert response.status_code == 401

@pytest.mark.django_db
def test_create_company_by_employer(api_client, employer_user):
    api_client.force_authenticate(user=employer_user)
    response = api_client.post('/api/companies/', {
        'name': 'Test Corp', 
        'description': 'A test company',
        'location': 'NY'
    })
    assert response.status_code == 201
    assert Company.objects.filter(name='Test Corp').exists()

@pytest.mark.django_db
def test_create_job(api_client, employer_user):
    api_client.force_authenticate(user=employer_user)
    company = Company.objects.create(employer=employer_user, name='Test', description='T', location='L')
    response = api_client.post('/api/jobs/', {
        'title': 'Developer',
        'description': 'Dev role',
        'requirements': 'Python',
        'job_type': 'Full Time',
        'company': company.id,
        'location': 'Remote'
    })
    assert response.status_code == 201
    assert Job.objects.filter(title='Developer').exists()
