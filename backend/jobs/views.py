from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Job, SavedJob
from .serializers import JobSerializer, SavedJobSerializer

class IsEmployerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and (request.user.role == 'employer' or request.user.role == 'admin')

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.role == 'admin':
            return True
        return obj.company.employer == request.user

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.filter(is_draft=False).order_by('-created_at')
    serializer_class = JobSerializer
    permission_classes = [IsEmployerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['job_type', 'work_model', 'category', 'location']
    search_fields = ['title', 'description', 'requirements']

    def perform_create(self, serializer):
        company = self.request.user.companies.first()
        if not company:
            from companies.models import Company
            company = Company.objects.create(
                employer=self.request.user,
                name=f"{self.request.user.username}'s Company",
                description="Default company"
            )
        serializer.save(company=company)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def mine(self, request):
        jobs = Job.objects.filter(company__employer=request.user).order_by('-created_at')
        serializer = self.get_serializer(jobs, many=True)
        return Response(serializer.data)

class SavedJobViewSet(viewsets.ModelViewSet):
    serializer_class = SavedJobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedJob.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
