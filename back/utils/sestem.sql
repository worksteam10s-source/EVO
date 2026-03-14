CREATE TABLE USER(
ID INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
password VARCHAR(255) NOT NULL,
role VARCHAR(50),
remember_token VARCHAR(255),
last_login DATETIME,
created_at DATETIME,
updated_at DATETIME
);

CREATE TABLE Admin(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
permission TEXT,
created_date DATETIME,
code VARCHAR(50) UNIQUE NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE Control(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
grade_id INT,
permission TEXT,
code VARCHAR(50) UNIQUE NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (Grade_id) REFERENCES Grade(ID)
);

CREATE TABLE Students(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
name VARCHAR(100) NOT NULL,
code VARCHAR(50) UNIQUE NOT NULL,
phone VARCHAR(20),
address VARCHAR(200),
department VARCHAR(100),
photo VARCHAR(255),
date_of_birth DATE,
age INT,
email VARCHAR(100) UNIQUE NOT NULL,
Age INT,
status VARCHAR(20),
current_semester VARCHAR(50),
year_level INT,
FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE Doctor(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT UNIQUE,
name VARCHAR(200) NOT NULL,
department VARCHAR(100),
qualification VARCHAR(200),
officeLocation VARCHAR(100),
email VARCHAR(100) UNIQUE NOT NULL,
photo VARCHAR(255),
rating FLOAT,
FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE Building(
id INT AUTO_INCREMENT PRIMARY KEY,
building_loc VARCHAR(100),
room_num VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE Specialization(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
code VARCHAR(50) UNIQUE NOT NULL,
description TEXT
);

CREATE TABLE Study_plan(
id INT AUTO_INCREMENT PRIMARY KEY,
spec_id INT,
year_name VARCHAR(150),
model VARCHAR(50),
FOREIGN KEY (spec_id) REFERENCES specialization(id)
);

CREATE TABLE Semesters(
id INT AUTO_INCREMENT PRIMARY KEY,
spec_id INT,
name VARCHAR(100) NOT NULL,
description TEXT,
start_date DATE,
end_date DATE,
build_id INT,
FOREIGN KEY (spec_id) REFERENCES specialization(id),
FOREIGN KEY (build_id) REFERENCES building(id)
);

CREATE TABLE Course(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(150) NOT NULL,
description TEXT,
credit_hours INT,
specialization_id INT,
doctor_id INT,
year_level INT,
FOREIGN KEY (specialization_id) REFERENCES specialization(id),
FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

CREATE TABLE Enrollments(
id INT AUTO_INCREMENT PRIMARY KEY,
student_id INT,
course_id INT,
spec_id INT,
date_end DATE,
FOREIGN KEY (student_id) REFERENCES students(id),
FOREIGN KEY (course_id) REFERENCES course(id),
FOREIGN KEY (spec_id) REFERENCES specialization(id)
);

CREATE TABLE Lecture(
id INT AUTO_INCREMENT PRIMARY KEY,
doctor_id INT,
course_id INT,
name VARCHAR(100),
schedule_day VARCHAR(20),
time_slot VARCHAR(50),
room VARCHAR(50),
live_url VARCHAR(255),
status VARCHAR(20),
FOREIGN KEY (doctor_id) REFERENCES doctor(id),
FOREIGN KEY (course_id) REFERENCES course(id),
FOREIGN KEY (Room_id) REFERENCES Building(ID)
);

CREATE TABLE Attendance(
id INT AUTO_INCREMENT PRIMARY KEY,
student_id INT,
lecture_id INT,
join_time DATETIME,
leave_time DATETIME,
duration INT,
status VARCHAR(20),
FOREIGN KEY (student_id) REFERENCES students(id),
FOREIGN KEY (lecture_id) REFERENCES lecture(id)
);

CREATE TABLE grade(
id INT AUTO_INCREMENT PRIMARY KEY,
student_id INT,
course_id INT,
semester_id INT,
sup_grades FLOAT,
mid_grades FLOAT,
final_grades FLOAT,
letter_grades VARCHAR(10),
FOREIGN KEY (student_id) REFERENCES students(id),
FOREIGN KEY (course_id) REFERENCES course(id),
FOREIGN KEY (semester_id) REFERENCES semesters(id)
);

CREATE TABLE lecture_material(
id INT AUTO_INCREMENT PRIMARY KEY,
lecture_id INT,
name VARCHAR(300) NOT NULL,
folder VARCHAR(100),
file_type VARCHAR(50),
file_size INT,
uploaded_by INT,
FOREIGN KEY (lecture_id) REFERENCES lecture(id),
FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE TABLE Assignment(
id INT AUTO_INCREMENT PRIMARY KEY,
Lec_mat_id INT,
student_id INT,
start_date DATETIME,
end_date DATETIME,
FOREIGN KEY (lecture_id) REFERENCES lecture(id),
FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE Live(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(100),
student_id INT,
doctor_id INT,
lec_id INT,
course_id INT,
start_date DATETIME,
end_date DATETIME,
FOREIGN KEY (student_id) REFERENCES students(id),
FOREIGN KEY (doctor_id) REFERENCES doctor(id),
FOREIGN KEY (course_id) REFERENCES course(id),
FOREIGN KEY (Lec_id) REFERENCES Lecture(ID)
);

CREATE TABLE Library(
id INT AUTO_INCREMENT PRIMARY KEY,
doctor_id INT,
title VARCHAR(200) NOT NULL,
author VARCHAR(100),
isbn VARCHAR(50) UNIQUE,
category VARCHAR(100),
description TEXT,
pdfurl VARCHAR(255),
coverimage VARCHAR(255),
updated_at DATETIME,
FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

CREATE TABLE Faq(
id INT AUTO_INCREMENT PRIMARY KEY,
question TEXT,
answer TEXT,
is_active BOOLEAN,
Rating INT,
student_id INT,
doctor_id INT,
FOREIGN KEY (student_id) REFERENCES students(id),
FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

CREATE TABLE Request_type(
id INT AUTO_INCREMENT PRIMARY KEY,
type_key VARCHAR(50) UNIQUE NOT NULL,
title VARCHAR(100) NOT NULL
);

CREATE TABLE Student_request(
id INT AUTO_INCREMENT PRIMARY KEY,
student_id INT,
type_request_id INT,
status VARCHAR(20),
create_at DATETIME,
viewed_by INT,
FOREIGN KEY (student_id) REFERENCES students(id),
FOREIGN KEY (type_request_id) REFERENCES request_type(id)
);

CREATE TABLE Student_affairs(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT UNIQUE,
request_id INT,
responsibilities TEXT,
code VARCHAR(50) UNIQUE NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (request_id) REFERENCES student_request(id)
);

CREATE TABLE Messages(
id INT AUTO_INCREMENT PRIMARY KEY,
sender INT,
receiver INT,
user_id INT,
content TEXT,
send_at DATETIME,
is_read BOOLEAN,
reply INT,
FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE news(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
title VARCHAR(200),
content TEXT,
img_url VARCHAR(255),
type_size VARCHAR(20),
created_at DATETIME,
author VARCHAR(100),
FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE upload_grades(
    id SERIAL PRIMARY KEY,
    course_id INT,
    doctor_id INT,
    control_id INT,
    spec_id INT,
    file_name VARCHAR(255),
    folder VARCHAR(255),
    year_level INT,
    status VARCHAR(50),
    upload_date TIMESTAMP,
    approval BOOLEAN,
    FOREIGN KEY (course_id) REFERENCES Course(ID),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(ID),
    FOREIGN KEY (control_id) REFERENCES Control(ID),
    FOREIGN KEY (spec_id) REFERENCES Specialization(ID)
);