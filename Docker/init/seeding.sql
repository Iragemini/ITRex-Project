---
---  ROLES
---

BEGIN;
INSERT INTO roles(title) VALUES('patient');
INSERT INTO roles(title) VALUES('doctor');
INSERT INTO roles(title) VALUES('admin');
COMMIT;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

---
--- ADMIN
---

INSERT INTO users(email, password, role_id) 
    VALUES('admin@clinic.com', crypt('admin12345678', gen_salt('bf', 8)), (SELECT id FROM roles WHERE title='admin'));

---
---  SPECIALIZATIONS, USERS, DOCTORS
---

BEGIN;
INSERT INTO specializations(title) VALUES('Allergists');
INSERT INTO users(email, password) VALUES('doctor_1@clinic.com', crypt('12345678', gen_salt('bf', 8)));
INSERT INTO doctors(name) VALUES('Doctor_1');
UPDATE doctors 
    SET 
        user_id = (SELECT id FROM users WHERE email = 'doctor_1@clinic.com'), 
        specialization_id = (SELECT id FROM specializations WHERE title='Allergists')
    WHERE name = 'Doctor_1';
COMMIT;

BEGIN;
INSERT INTO specializations(title) VALUES('Dermatologists');
INSERT INTO users(email, password) VALUES('doctor_2@clinic.com', crypt('12345678', gen_salt('bf', 8)));
INSERT INTO doctors(name) VALUES('Doctor_2');
UPDATE doctors 
    SET 
        user_id = (SELECT id FROM users WHERE email = 'doctor_2@clinic.com'), 
        specialization_id = (SELECT id FROM specializations WHERE title='Dermatologists')
    WHERE name = 'Doctor_2';
COMMIT;

BEGIN;
INSERT INTO specializations(title) VALUES('Cardiologists');
INSERT INTO users(email, password) VALUES('doctor_3@clinic.com', crypt('12345678', gen_salt('bf', 8)));
INSERT INTO doctors(name) VALUES('Doctor_3');
UPDATE doctors 
    SET 
        user_id = (SELECT id FROM users WHERE email = 'doctor_3@clinic.com'), 
        specialization_id = (SELECT id FROM specializations WHERE title='Cardiologists')
    WHERE name = 'Doctor_3';
COMMIT;

UPDATE users 
    SET 
        role_id = (SELECT id FROM roles WHERE title='doctor') 
    WHERE email ~ 'doctor_.@clinic.com';

---
---  USERS, PATIENTS
---

BEGIN;
INSERT INTO users(email, password) VALUES('ivanov@gmail.com', crypt('qwerty1234', gen_salt('bf', 8)));
INSERT INTO patients(name, gender, birth_date) VALUES('Ivan', 'male', make_date(1990, 2, 10));
UPDATE patients 
    SET 
        user_id = (SELECT id FROM users WHERE email = 'ivanov@gmail.com')
    WHERE name = 'Ivan';
COMMIT;

BEGIN;
INSERT INTO users(email, password) VALUES('petrov@gmail.com', crypt('qwerty1234', gen_salt('bf', 8)));
INSERT INTO patients(name, gender, birth_date) VALUES('Petr', 'male', make_date(1995, 8, 25));
UPDATE patients 
    SET 
        user_id = (SELECT id FROM users WHERE email = 'petrov@gmail.com')
    WHERE name = 'Petr';
COMMIT;

BEGIN;
INSERT INTO users(email, password) VALUES('sidorova@gmail.com', crypt('qwerty1234', gen_salt('bf', 8)));
INSERT INTO patients(name, gender, birth_date) VALUES('Anna', 'female', make_date(2000, 6, 15));
UPDATE patients 
    SET 
        user_id = (SELECT id FROM users WHERE email = 'sidorova@gmail.com')
    WHERE name = 'Anna';
COMMIT;

UPDATE users 
    SET 
        role_id = (SELECT id FROM roles WHERE title='patient') 
    WHERE email IN ('ivanov@gmail.com', 'petrov@gmail.com', 'sidorova@gmail.com');
