from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Application, Resume
from .serializers import ApplicationSerializer, ResumeSerializer

class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Resume.objects.all().order_by('-uploaded_at')
        return Resume.objects.filter(applicant=self.request.user)

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Application.objects.all().order_by('-created_at')
        if user.role == 'employer':
            return Application.objects.filter(job__company__employer=user).order_by('-created_at')
        return Application.objects.filter(applicant=user).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        job_id = request.data.get('job')
        existing = Application.objects.filter(job_id=job_id, applicant=request.user).first()
        if existing:
            return Response(self.get_serializer(existing).data, status=200)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated])
    def update_status(self, request, pk=None):
        application = self.get_object()
        if application.job.company.employer != request.user:
            return Response({'error': 'Not authorized'}, status=403)
        
        status = request.data.get('status')
        interview_time = request.data.get('interview_time')
        interview_room = request.data.get('interview_room')

        if status:
            application.status = status
        if interview_time is not None:
            application.interview_time = interview_time
        if interview_room is not None:
            application.interview_room = interview_room
            
        application.save()
        return Response({'status': 'Status updated', 'interview_time': application.interview_time, 'interview_room': application.interview_room})
