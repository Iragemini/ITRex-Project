---
---  ROLES
---

BEGIN;
INSERT INTO roles(title) VALUES('patient');
INSERT INTO roles(title) VALUES('doctor');
COMMIT;


---
---  SPECIALIZATIONS, USERS, DOCTORS
---

CREATE EXTENSION IF NOT EXISTS pgcrypto;

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

UPDATE users SET role_id = (SELECT id FROM roles WHERE title='doctor') WHERE email ~ 'doctor_.@clinic.com';
