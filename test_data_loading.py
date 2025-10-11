import os

def test_static_files():
    """Test if static files are accessible"""
    # Check if cities.txt exists
    cities_path = os.path.join('static', 'data', 'cities.txt')
    if os.path.exists(cities_path):
        print("✓ cities.txt file exists")
        with open(cities_path, 'r', encoding='utf-8') as f:
            cities = f.read().split('\n')
            print(f"  Found {len(cities)} cities")
            print(f"  Sample cities: {cities[:5]}")
    else:
        print("✗ cities.txt file not found")
    
    # Check if courses.txt exists
    courses_path = os.path.join('static', 'data', 'courses.txt')
    if os.path.exists(courses_path):
        print("✓ courses.txt file exists")
        with open(courses_path, 'r', encoding='utf-8') as f:
            courses = f.read().split('\n')
            print(f"  Found {len(courses)} courses")
            print(f"  Sample courses: {courses[:5]}")
    else:
        print("✗ courses.txt file not found")

if __name__ == "__main__":
    test_static_files()