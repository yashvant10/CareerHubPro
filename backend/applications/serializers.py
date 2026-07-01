from rest_framework import serializers
from .models import Application, Resume
from accounts.serializers import UserSerializer
from jobs.serializers import JobSerializer

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'
        read_only_fields = ['applicant']

class ApplicationSerializer(serializers.ModelSerializer):
    applicant_details = UserSerializer(source='applicant', read_only=True)
    job_details = JobSerializer(source='job', read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['applicant']
