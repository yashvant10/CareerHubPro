from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApplicationViewSet, ResumeViewSet

router = DefaultRouter()
router.register(r'resumes', ResumeViewSet, basename='resumes')
router.register(r'', ApplicationViewSet, basename='applications')

urlpatterns = [
    path('', include(router.urls)),
]
