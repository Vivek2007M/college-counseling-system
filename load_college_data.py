import os
import csv
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'college_counseling.settings')
django.setup()

from college_recommendation.models import College

def load_college_data():
    """Load college data from CSV file into the database"""
    csv_path = os.path.join('static', 'data', 'colleges.csv')
    
    if not os.path.exists(csv_path):
        print(f"CSV file not found at {csv_path}")
        return
    
    print(f"Loading data from {csv_path}...")
    
    # Clear existing data
    College.objects.all().delete()
    print("Cleared existing data")
    
    # Load data from CSV
    count = 0
    with open(csv_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        colleges_to_create = []
        
        for row in reader:
            try:
                college = College(
                    college_code=row['college_code'],
                    college_name=row['college_name'],
                    course_code=row['course_code'],
                    course_name=row['course_name'],
                    category=row['category'],
                    merit_rank=int(row['merit_rank']),
                    percentile=float(row['percentile']),
                    city=row['city']
                )
                colleges_to_create.append(college)
                count += 1
                
                # Bulk create in batches to avoid memory issues
                if len(colleges_to_create) >= 1000:
                    College.objects.bulk_create(colleges_to_create)
                    print(f"Loaded {count} records...")
                    colleges_to_create = []
                    
            except Exception as e:
                print(f"Error processing row: {row}")
                print(f"Error: {e}")
                continue
        
        # Create remaining colleges
        if colleges_to_create:
            College.objects.bulk_create(colleges_to_create)
    
    print(f"Successfully loaded {count} college records into the database")

if __name__ == "__main__":
    load_college_data()