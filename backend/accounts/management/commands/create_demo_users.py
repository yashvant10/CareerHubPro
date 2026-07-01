from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from accounts.models import ApplicantProfile, EmployerProfile

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates default demo accounts for testing'

    def handle(self, *args, **options):
        # Admin Demo
        if not User.objects.filter(username='admin_demo').exists():
            User.objects.create_superuser('admin_demo', 'admin@example.com', 'demo1234')
            # Manually set role to admin just in case our custom model expects it
            admin_user = User.objects.get(username='admin_demo')
            admin_user.role = 'admin'
            admin_user.save()
            self.stdout.write(self.style.SUCCESS('Admin demo user created'))
        else:
            self.stdout.write(self.style.WARNING('Admin demo user already exists'))

        # Employer Demo
        if not User.objects.filter(username='employer_demo').exists():
            employer = User.objects.create_user(
                username='employer_demo', 
                email='employer@example.com', 
                password='demo1234',
                role='employer',
                first_name='Tech',
                last_name='Corp'
            )
            EmployerProfile.objects.create(user=employer, position='HR Manager')
            self.stdout.write(self.style.SUCCESS('Employer demo user created'))
        else:
            self.stdout.write(self.style.WARNING('Employer demo user already exists'))

        # Candidate Demo
        if not User.objects.filter(username='candidate_demo').exists():
            candidate = User.objects.create_user(
                username='candidate_demo', 
                email='candidate@example.com', 
                password='demo1234',
                role='applicant',
                first_name='John',
                last_name='Doe'
            )
            ApplicantProfile.objects.create(user=candidate, bio='Passionate software developer.')
            self.stdout.write(self.style.SUCCESS('Candidate demo user created'))
        else:
            self.stdout.write(self.style.WARNING('Candidate demo user already exists'))
