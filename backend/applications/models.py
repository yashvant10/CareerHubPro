from django.db import models
from accounts.models import User
from jobs.models import Job

class Resume(models.Model):
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resumes')
    file = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_default = models.BooleanField(default=False)

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Reviewed', 'Reviewed'), ('Interview', 'Interview'), ('Accepted', 'Accepted'), ('Rejected', 'Rejected')], default='Pending')
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    cover_letter = models.TextField(blank=True, null=True)
    portfolio_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    expected_salary = models.CharField(max_length=100, blank=True, null=True)
    notice_period = models.CharField(max_length=100, blank=True, null=True)
    years_of_experience = models.CharField(max_length=100, blank=True, null=True)
    current_company = models.CharField(max_length=255, blank=True, null=True)
    current_designation = models.CharField(max_length=255, blank=True, null=True)
    skills = models.CharField(max_length=255, blank=True, null=True)
    university_name = models.CharField(max_length=255, blank=True, null=True)
    graduation_year = models.CharField(max_length=100, blank=True, null=True)
    interview_time = models.CharField(max_length=255, blank=True, null=True)
    interview_room = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('job', 'applicant')
