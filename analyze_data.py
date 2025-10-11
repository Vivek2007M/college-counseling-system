import csv
import os

def analyze_college_data():
    # Path to the CSV file
    csv_path = os.path.join('static', 'data', 'colleges.csv')
    
    # Check if CSV file exists
    if not os.path.exists(csv_path):
        print("College data not found")
        return
    
    # Collect unique cities and courses
    cities = set()
    courses = set()
    
    # Read the CSV file
    with open(csv_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            cities.add(row['city'])
            courses.add(row['course_name'])
    
    print(f"Total unique cities: {len(cities)}")
    print(f"Total unique courses: {len(courses)}")
    
    # Save cities and courses to files for use in the web app
    with open(os.path.join('static', 'data', 'cities.txt'), 'w', encoding='utf-8') as f:
        for city in sorted(cities):
            f.write(city + '\n')
    
    with open(os.path.join('static', 'data', 'courses.txt'), 'w', encoding='utf-8') as f:
        for course in sorted(courses):
            f.write(course + '\n')
    
    print("Cities and courses saved to files.")
    print("\nSample cities:")
    for city in sorted(list(cities))[:10]:
        print(f"  {city}")
    
    print("\nSample courses:")
    for course in sorted(list(courses))[:10]:
        print(f"  {course}")

if __name__ == "__main__":
    analyze_college_data()