from rest_framework import serializers
from .models import User, ApplicantProfile, EmployerProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        data['username'] = self.user.username
        data['id'] = self.user.id
        return data

class ApplicantProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicantProfile
        fields = ['id', 'bio', 'skills']

class EmployerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfile
        fields = ['id', 'position']

class UserSerializer(serializers.ModelSerializer):
    applicant_profile = ApplicantProfileSerializer(read_only=True)
    employer_profile = EmployerProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'applicant_profile', 'employer_profile', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        if user.role == 'applicant':
            ApplicantProfile.objects.create(user=user)
        elif user.role == 'employer':
            EmployerProfile.objects.create(user=user)
        return user
