--
-- PostgreSQL database itrex
--

DROP DATABASE itrex;

CREATE DATABASE itrex;

\c itrex

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--
-- Name: roles; Type: TABLE; Schema: -; Owner: -
--

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (title)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON roles
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--
-- Name: specializations; Type: TABLE; Schema: -; Owner: -
--

CREATE TABLE specializations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (title)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON specializations
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--
-- Name: users; Type: TABLE; Schema: -; Owner: -
--

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role_id INTEGER,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (email),
    FOREIGN KEY (role_id)
    REFERENCES roles (id)
    ON DELETE SET NULL
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--
-- Name: doctors; Type: TABLE; Schema: -; Owner: -
--

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    specialization_id INTEGER,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,
    FOREIGN KEY (specialization_id)
    REFERENCES specializations (id)
    ON DELETE SET NULL
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON doctors
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--
-- Name: patients; Type: TABLE; Schema: -; Owner: -
--

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(30) NOT NULL,
    birth_date DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (email),
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON patients
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--
-- Name: resolutions; Type: TABLE; Schema: -; Owner: -
--

CREATE TABLE resolutions (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER,
    patient_id INTEGER,
    resolution VARCHAR(255) NOT NULL,
    expire DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (doctor_id)
    REFERENCES doctors (id)
    ON DELETE SET NULL,
    FOREIGN KEY (patient_id)
    REFERENCES patients (id)
    ON DELETE CASCADE
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON resolutions
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
