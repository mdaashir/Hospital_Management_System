USE sql12759310;

CREATE TABLE Patient (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    address TEXT NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    height INT NOT NULL,
    weight INT NOT NULL,
    marital_status ENUM('single', 'married', 'divorced', 'widowed') NOT NULL,
    medications ENUM('yes', 'no') NOT NULL
);
select * from Patient;

DELIMITER //
CREATE PROCEDURE GetPatient(IN patientId INT)
BEGIN
    SELECT * FROM Patient where patient_id=patientId;
END;
// DELIMITER 

DELIMITER //
call GetPatient(1);
// DELIMITER 


DELIMITER // 
CREATE PROCEDURE InsertPatient(
    IN p_name VARCHAR(255),
    IN p_age INT,
    IN p_dob DATE,
    IN p_gender VARCHAR(10),
    IN p_address VARCHAR(255),
    IN p_mobileNumber VARCHAR(15),
    IN p_BloodGroup VARCHAR(5),
    IN p_height INT,
    IN p_weight INT,
    IN p_maritalStatus VARCHAR(20),
    IN p_medications VARCHAR(10) -- Adjust the length as per your requirement
)
BEGIN
    INSERT INTO Patient (name, age, dob, gender, address, mobile_number, blood_group, height, weight, marital_status, medications)
    VALUES (p_name, p_age, p_dob, p_gender, p_address, p_mobileNumber, p_BloodGroup, p_height, p_weight, p_maritalStatus, p_medications);
END;
// DELIMITER 




DELIMITER //
CREATE PROCEDURE GetAllPatients()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE pid INT;
    DECLARE pname VARCHAR(255);
    DECLARE age INT;
    DECLARE dob DATE;
    DECLARE gender ENUM('male', 'female', 'other');
    DECLARE address TEXT;
    DECLARE mobile_number VARCHAR(15);
    DECLARE blood_group VARCHAR(5);
    DECLARE height INT;
    DECLARE weight INT;
    DECLARE marital_status ENUM('single', 'married', 'divorced', 'widowed');
    DECLARE medications ENUM('yes', 'no');
    
    DECLARE patients TEXT DEFAULT '[]';  -- Initialize an empty JSON array
    DECLARE isFirst BOOLEAN DEFAULT TRUE;  -- To track the first patient

    DECLARE cur CURSOR FOR 
        SELECT * FROM Patient;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE; -- Handler for end of cursor loop
    
    OPEN cur;

    SET patients = '[';  -- Start the JSON array
    read_loop: LOOP
        FETCH cur INTO pid, pname, age, dob, gender, address, mobile_number, blood_group, height, weight, marital_status, medications;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Add a comma if it's not the first patient
        IF NOT isFirst THEN
            SET patients = CONCAT(patients, ',');
        ELSE
            SET isFirst = FALSE;  -- After first patient, subsequent patients need a comma
        END IF;

        -- Construct a JSON object for the current patient and append it to the JSON array
        SET patients = CONCAT(patients, 
            '{"pid":', pid, 
            ',"pname":"', pname, '"', 
            ',"age":', age, 
            ',"dob":"', dob, '"',
            ',"gender":"', gender, '"',
            ',"address":"', address, '"',
            ',"mobile_number":"', mobile_number, '"',
            ',"blood_group":"', blood_group, '"',
            ',"height":', height,
            ',"weight":', weight,
            ',"marital_status":"', marital_status, '"',
            ',"medications":"', medications, '"}'
        );
    END LOOP;

    CLOSE cur;

    -- Close the JSON array
    SET patients = CONCAT(patients, ']');

    -- Debug statement: Print the JSON array containing patient details
    SELECT patients;
END;
// DELIMITER 


DELIMITER //
call GetAllPatients();
// DELIMITER 

DELIMITER //
SHOW CREATE PROCEDURE GetAllPatients;     
// DELIMITER 

DELIMITER //
drop procedure if exists GetAllPatients;
// DELIMITER 

DELIMITER //
SHOW PROCEDURE STATUS;	
// DELIMITER 


DELIMITER //
CREATE PROCEDURE ModifyPatient(
    IN p_patientId INT,
    IN p_detailColumn VARCHAR(255),
    IN p_newValue VARCHAR(255)
)
BEGIN
    -- Check if the detail column exists in the Patient table
    IF NOT EXISTS (
        SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'Patient' AND COLUMN_NAME = p_detailColumn
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Column does not exist in the Patient table';
    END IF;

    -- Construct the SQL statement based on the detail column
    CASE
        WHEN p_detailColumn = 'name' THEN
            UPDATE Patient SET name = p_newValue WHERE patient_id = p_patientId;
        WHEN p_detailColumn = 'age' THEN
            UPDATE Patient SET age = CAST(p_newValue AS UNSIGNED) WHERE patient_id = p_patientId;
        WHEN p_detailColumn = 'dob' THEN
            UPDATE Patient SET dob = CAST(p_newValue AS DATE) WHERE patient_id = p_patientId;
        WHEN p_detailColumn = 'gender' THEN
            UPDATE Patient SET gender = p_newValue WHERE patient_id = p_patientId;
        WHEN p_detailColumn = 'address' THEN
            UPDATE Patient SET address = p_newValue WHERE patient_id = p_patientId;
        WHEN p_detailColumn = 'mobile_number' THEN
            UPDATE Patient SET mobile_number = p_newValue WHERE patient_id = p_patientId;
        WHEN p_detailColumn = 'blood_group' THEN
            UPDATE Patient SET blood_group = p_newValue WHERE patient_id = p_patientId;
        WHEN p_detailColumn = 'height' THEN
            UPDATE Patient SET height = CAST(p_newValue AS UNSIGNED) WHERE patient_id = p_patientId;
        WHEN p_detailColumn = 'weight' THEN
            UPDATE Patient SET weight = CAST(p_newValue AS UNSIGNED) WHERE patient_id = p_patientId;
        WHEN p_detailColumn = 'marital_status' THEN
            UPDATE Patient SET marital_status = p_newValue WHERE patient_id = p_patientId;
        WHEN p_detailColumn = 'medications' THEN
            UPDATE Patient SET medications = p_newValue WHERE patient_id = p_patientId;
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Invalid detail column';
    END CASE;
END;
// DELIMITER



-- ****************

CREATE TABLE Doctors (
    DoctorID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Specialization VARCHAR(255) NOT NULL,
    Qualification VARCHAR(255) NOT NULL,
    Contact VARCHAR(20) NOT NULL
);
DELIMITER //
select * from Doctors;
// DELIMITER

DELIMITER //
UPDATE Doctors
SET Name = 'James'
WHERE DoctorId = 2;
// DELIMITER

DELIMITER //
CREATE PROCEDURE InsertDoctor(
    IN doctorName VARCHAR(255),
    IN specialization VARCHAR(255),
    IN qualification VARCHAR(255),
    IN contact VARCHAR(20)
)
BEGIN
    INSERT INTO Doctors (Name, Specialization, Qualification, Contact)
    VALUES (doctorName, specialization, qualification, contact);
END;
// DELIMITER

DELIMITER //
CALL InsertDoctor('Lia', 'Cardiology',	'MBBS., MD', 6789054331);
// DELIMITER


DELIMITER //
CREATE PROCEDURE RemoveDoctor(
    IN doc_id INT,
    IN reason VARCHAR(255)
)
BEGIN
    DELETE FROM Doctors where DoctorId = doc_id ;
    
	UPDATE Removed_Doctors
	set reason = reason
    where DoctorID=doc_id;
    
END;
// DELIMITER

DELIMITER //
drop procedure RemoveDoctor;
// DELIMITER

DELIMITER //
CREATE TABLE Removed_Doctors(
    DoctorID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Specialization VARCHAR(255) NOT NULL,
    Qualification VARCHAR(255) NOT NULL,
    Contact VARCHAR(20) NOT NULL,
    reason  VARCHAR(255)
);
// DELIMITER

DELIMITER //
CREATE TRIGGER remove_doctor_reason BEFORE DELETE ON Doctors
FOR EACH ROW
BEGIN
    INSERT INTO Removed_Doctors
    ( DoctorID, Name, Specialization, Qualification, Contact, reason )
    VALUES
    (
		OLD.DoctorID,
        OLD.Name,
        OLD.Specialization,
        OLD.Qualification,
        OLD.Contact,
		Reason
    );
END;
// DELIMITER

DELIMITER //
drop trigger remove_doctor_reason;
// DELIMITER

DELIMITER //
CALL RemoveDoctor(19,'Transfer to another city');
// DELIMITER

DELIMITER //
select *from Removed_Doctors;
// DELIMITER


DELIMITER //
CREATE PROCEDURE ModifyDoctor(
    IN p_doctorId INT,
    IN p_detailColumn VARCHAR(255),
    IN p_newValue VARCHAR(255)
)
BEGIN
    -- Check if the detail column exists in the Doctors table
    IF NOT EXISTS (
        SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'Doctors' AND COLUMN_NAME = p_detailColumn
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Column does not exist in the Doctors table';
    END IF;

    -- Construct the SQL statement based on the detail column
    CASE
        WHEN p_detailColumn = 'Name' THEN
            UPDATE Doctors SET Name = p_newValue WHERE DoctorID = p_doctorId;
        WHEN p_detailColumn = 'Specialization' THEN
            UPDATE Doctors SET Specialization = p_newValue WHERE DoctorID = p_doctorId;
        WHEN p_detailColumn = 'Qualification' THEN
            UPDATE Doctors SET Qualification = p_newValue WHERE DoctorID = p_doctorId;
        WHEN p_detailColumn = 'Contact' THEN
            UPDATE Doctors SET Contact = p_newValue WHERE DoctorID = p_doctorId;
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Invalid detail column';
    END CASE;
END; 
//DELIMITER 



DELIMITER //
CREATE PROCEDURE Getdoctorsid(IN doctor_id INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE doc_id INT;
    DECLARE dname VARCHAR(255);
    DECLARE qualification VARCHAR(255);
    DECLARE specialization VARCHAR(255);
    DECLARE contact VARCHAR(20);
   
	DECLARE doctor_details TEXT DEFAULT '[]'; 
	DECLARE isFirst BOOLEAN DEFAULT TRUE;  
    
    DECLARE cur CURSOR FOR
        SELECT * FROM Doctors;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE; -- Handler for end of cursor loop
   
    OPEN cur;

    SET doctor_details = '[';  -- Start the JSON array
    read_loop: LOOP
        FETCH cur INTO doc_id, dname, specialization, qualification, contact;
        IF done THEN
            LEAVE read_loop;
        END IF;
        IF doc_id = doctor_id THEN
            IF NOT isFirst THEN
                SET doctor_details = CONCAT(doctor_details, ',');
            ELSE
                SET isFirst = FALSE;  -- After first doctor, subsequent doctors need a comma
            END IF;

            SET doctor_details = CONCAT(doctor_details, 
                '{"doc_id":', doc_id, 
                ',"dname":"', dname, '"', 
                ',"qualification":"', qualification, '"',
                ',"specialization":"', specialization, '"',
                ',"contact":"', contact, '"}'
            );
        END IF;
    END LOOP;
    
    CLOSE cur;
    
    SET doctor_details = CONCAT(doctor_details, ']');
    SELECT doctor_details;
END;
// DELIMITER

DELIMITER //
CALL Getdoctorsid(3);
// DELIMITER

DELIMITER //
drop procedure if exists Getdoctorsid;
// DELIMITER


DELIMITER //
CREATE PROCEDURE GetAllDoctors()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE doc_id INT;
    DECLARE dname VARCHAR(255);
    DECLARE specialization VARCHAR(255);
    DECLARE qualification VARCHAR(255);
    DECLARE contact VARCHAR(20);

    DECLARE doctors TEXT DEFAULT '[]';  
    DECLARE isFirst BOOLEAN DEFAULT TRUE;

    DECLARE cur CURSOR FOR 
        SELECT * FROM Doctors;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE; -- Handler for end of cursor loop
    
    OPEN cur;

     SET doctors = '[';  
    read_loop: LOOP
        FETCH cur INTO doc_id, dname, specialization, qualification, contact;
        IF done THEN
            LEAVE read_loop;
        END IF;

        IF NOT isFirst THEN
            SET doctors = CONCAT(doctors, ',');
        ELSE
            SET isFirst = FALSE;  -- After first doctor, subsequent doctors need a comma
        END IF;
        
        SET doctors = CONCAT(doctors, 
            '{"doc_id":', doc_id, 
            ',"dname":"', dname, '"', 
            ',"qualification":"', qualification, '"',
            ',"specialization":"', specialization, '"',
            ',"contact":"', contact, '"}'
        );
    END LOOP;
    
    CLOSE cur;
    
    SET doctors = CONCAT(doctors, ']');
    SELECT doctors;
END;
// DELIMITER 

DELIMITER //
call GetAllDoctors();
// DELIMITER 


DELIMITER //
SHOW CREATE PROCEDURE GetAllDoctors;     
// DELIMITER 

DELIMITER //
drop procedure if exists GetAllDoctors;
// DELIMITER 




DELIMITER //
CREATE PROCEDURE Get_dept_Doctors(IN deptname varchar(25))
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE doc_id INT;
    DECLARE dname VARCHAR(255);
    DECLARE specialization VARCHAR(255);
    DECLARE qualification VARCHAR(255);
    DECLARE contact VARCHAR(20);
   
	DECLARE doctors_spec TEXT DEFAULT '[]';  
    DECLARE isFirst BOOLEAN DEFAULT TRUE;

    DECLARE cur CURSOR FOR
        SELECT * FROM Doctors;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;
    SET doctors_spec = '[';  -- Start the JSON array
    read_loop: LOOP
        FETCH cur INTO doc_id, dname, specialization, qualification, contact;
        IF done THEN
            LEAVE read_loop;
        END IF;
        IF LOWER(TRIM(specialization)) = LOWER(TRIM(deptname)) THEN
            IF NOT isFirst THEN
                SET doctors_spec = CONCAT(doctors_spec, ',');
            ELSE
                SET isFirst = FALSE;  
            END IF;

            SET doctors_spec = CONCAT(doctors_spec, 
                '{"doc_id":', doc_id, 
                ',"dname":"', dname, '"', 
                ',"qualification":"', qualification, '"',
                ',"specialization":"', specialization, '"',
                ',"contact":"', contact, '"}'
            );
        END IF;
    END LOOP;
    CLOSE cur;
    
    SET doctors_spec = CONCAT(doctors_spec, ']');
    SELECT doctors_spec;
END;
// DELIMITER


DELIMITER //
call Get_dept_Doctors('Dentist');
// DELIMITER 


DELIMITER //
SHOW CREATE PROCEDURE Get_dept_Doctors;     
// DELIMITER 

DELIMITER //
drop procedure if exists Get_dept_Doctors;
// DELIMITER 


DELIMITER //
drop TRIGGER if exists InsertDoctortriggers;
// DELIMITER

DELIMITER //
CREATE TRIGGER InsertDoctortriggers AFTER INSERT ON Doctors
FOR EACH ROW
BEGIN
    DECLARE department_count INT;

    -- Check if the department exists in the Department table
    SELECT COUNT(*) INTO department_count FROM Department WHERE name = NEW.Specialization;

    -- If the department doesn't exist, insert it into the Department table
    IF department_count = 0 THEN
        INSERT INTO Department (name, doctor_id)
        VALUES (NEW.Specialization, NEW.DoctorID);
    END IF;
END;
// DELIMITER

DELIMITER //
drop trigger if exists InsertDoctortriggers;	
// DELIMITER

-- ************************************************************

DELIMITER //
CREATE TABLE Appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    appointment_time TIME,
    appointment_type ENUM('Checkup', 'Follow-up', 'Treatment', 'Consultation', 'Surgery'),
    appointment_reason TEXT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);
// DELIMITER 
-- DROP TABLE Appointments;



DELIMITER //
CREATE PROCEDURE InsertAppointment(
    IN patient_id INT,
    IN doctor_id INT,
    IN appointment_date DATE,
    IN appointment_time TIME,
    IN appointment_type ENUM('Checkup', 'Follow-up', 'Treatment', 'Consultation', 'Surgery'),
    IN appointment_reason TEXT
)
BEGIN
    INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, appointment_type, appointment_reason)
    VALUES (patient_id, doctor_id, appointment_date, appointment_time, appointment_type, appointment_reason);
END; 
// DELIMITER

DELIMITER //
select * from Appointments;
// DELIMITER

DELIMITER //
drop procedure InsertAppointment;
// DELIMITER




DELIMITER //
CREATE PROCEDURE Get_AppointmentDetails_docId(
    IN p_doctor_id INT,
    IN p_appointment_date DATE
)
BEGIN
    -- Declare variables to hold appointment details
    DECLARE done INT DEFAULT FALSE;
    DECLARE patient_id INT;
    DECLARE patient_name VARCHAR(255);
    DECLARE appointment_type ENUM('Checkup', 'Follow-up', 'Treatment', 'Consultation', 'Surgery');
    DECLARE appointment_reason TEXT;
    DECLARE appointment_time TIME;

    -- Declare cursor to iterate over appointments
    DECLARE cur CURSOR FOR
        SELECT p.patient_id, p.name, a.appointment_type, a.appointment_reason, a.appointment_time
        FROM Appointments a
        INNER JOIN Patient p ON a.patient_id = p.patient_id
        WHERE a.doctor_id = p_doctor_id AND a.appointment_date = p_appointment_date;
       
    -- Declare handler for end of cursor loop
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open cursor
    OPEN cur;
   
    -- Initialize an empty JSON array to store appointment details
    SELECT JSON_ARRAY() INTO @appointment_details;

    -- Loop through appointments and construct JSON objects
    read_loop: LOOP
        FETCH cur INTO patient_id, patient_name, appointment_type, appointment_reason, appointment_time;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Construct JSON object for each appointment and append to the array
        SET @appointment_details = JSON_ARRAY_APPEND(@appointment_details, '$', JSON_OBJECT('patient_id',patient_id,'patient_name', patient_name, 'appointment_type', appointment_type, 'appointment_reason', appointment_reason, 'appointment_time', appointment_time));
    END LOOP;

    -- Close cursor
    CLOSE cur;

    -- Return JSON array containing appointment details
    SELECT @appointment_details AS appointment_details;
END;
// DELIMITER

DELIMITER //
drop procedure Get_AppointmentDetails_docId;
// DELIMITER

DELIMITER //
call Get_AppointmentDetails_docId(24,'2024-04-15')
// DELIMITER

DELIMITER //
CREATE PROCEDURE Get_patient_all_AppointmentDetails( IN p_id INT )
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE doc_name VARCHAR(255);
    DECLARE appointment_type ENUM('Checkup', 'Follow-up', 'Treatment', 'Consultation', 'Surgery');
    DECLARE appointment_reason TEXT;
    DECLARE appointment_time TIME;
    DECLARE appointment_date DATE;
    
   DECLARE cur CURSOR FOR
	SELECT d.Name, a.appointment_type, a.appointment_reason, a.appointment_time, a.appointment_date
	FROM Appointments a
	INNER JOIN Doctors d ON a.doctor_id = d.DoctorID
	WHERE a.patient_id = p_id;
    
	-- Declare handler for end of cursor loop
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open cursor
    OPEN cur;
   
    -- Initialize an empty JSON array to store appointment details
    SELECT JSON_ARRAY() INTO @appointment_details;

    -- Loop through appointments and construct JSON objects
    read_loop: LOOP
        FETCH cur INTO doc_name, appointment_type, appointment_reason, appointment_time, appointment_date;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Construct JSON object for each appointment and append to the array
        SET @appointment_details = JSON_ARRAY_APPEND(@appointment_details, '$', JSON_OBJECT('doctor_name', doc_name, 'appointment_type', appointment_type, 'appointment_reason', appointment_reason, 'appointment_time', appointment_time, 'appointment_date',appointment_date));
    END LOOP;

    -- Close cursor
    CLOSE cur;

    -- Return JSON array containing appointment details
    SELECT @appointment_details AS appointment_details;
END;	
// DELIMITER
    
DELIMITER // 
drop procedure Get_patient_all_AppointmentDetails;
// DELIMITER 
 
DELIMITER // 
call Get_patient_all_AppointmentDetails(1);
//  DELIMITER  


DELIMITER //
CREATE TRIGGER PreventDoubleBooking
BEFORE INSERT ON Appointments
FOR EACH ROW
BEGIN
    DECLARE count_appointments INT;

    -- Check if there are any appointments for the same doctor at the same date and time
    SELECT COUNT(*) INTO count_appointments
    FROM Appointments
    WHERE doctor_id = NEW.doctor_id
    AND appointment_date = NEW.appointment_date
    AND appointment_time = NEW.appointment_time;

    -- If count is greater than 0, it means there is already an appointment booked for the same doctor at the same date and time
    IF count_appointments > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Doctor is already booked at the specified date and time';
    END IF;
END ;
// DELIMITER 

-- **************


DELIMITER //
CREATE PROCEDURE GetAll_Appointments_date( IN appointment_date DATE )
BEGIN
    -- Declare variables to hold appointment details
    DECLARE done INT DEFAULT FALSE;
    DECLARE doctor_name VARCHAR(255);
    DECLARE patient_name VARCHAR(255);
    DECLARE appointment_type ENUM('Checkup', 'Follow-up', 'Treatment', 'Consultation', 'Surgery');
    DECLARE appointment_reason TEXT;
    DECLARE appointment_time TIME;

    -- Declare cursor to iterate over appointments
    DECLARE cur CURSOR FOR
        SELECT d.Name, p.name, a.appointment_type, a.appointment_reason, a.appointment_time
        FROM Appointments a
        INNER JOIN Patient p ON a.patient_id = p.patient_id
		INNER JOIN Doctors d ON a.doctor_id = d.DoctorId
        WHERE a.appointment_date = appointment_date;
       
    -- Declare handler for end of cursor loop
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open cursor
    OPEN cur;
   
    -- Initialize an empty JSON array to store appointment details
    SELECT JSON_ARRAY() INTO @appointment_details;

    -- Loop through appointments and construct JSON objects
    read_loop: LOOP
        FETCH cur INTO doctor_name, patient_name, appointment_type, appointment_reason, appointment_time;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Construct JSON object for each appointment and append to the array
        SET @appointment_details = JSON_ARRAY_APPEND(@appointment_details, '$', JSON_OBJECT('doctor_name',doctor_name, 'patient_name', patient_name, 'appointment_type', appointment_type, 'appointment_reason', appointment_reason, 'appointment_time', appointment_time));
    END LOOP;

    -- Close cursor
    CLOSE cur;

    -- Return JSON array containing appointment details
    SELECT @appointment_details AS appointment_details;
END;
// DELIMITER 


DELIMITER //
CALL GetAll_Appointments_date('2024-04-15');
// DELIMITER 

DELIMITER //
drop procedure GetAll_Appointments_date;
// DELIMITER 


-- **************






















-- ######################################################################################
CREATE TABLE Patient_Doctor (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctors(DoctorID)
    -- Add more columns as needed
);


CREATE TABLE Department_Doctor (
    department_doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    doctor_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctors(DoctorID)
    -- Add more columns as needed
);

DELIMITER //


DELIMITER //
CREATE TABLE Department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(255),
    doctor_id INT,
    FOREIGN KEY (doctor_id) REFERENCES Doctors(DoctorID)
);
// DELIMITER


DELIMITER //
select * from Department;
// DELIMITER 

DELIMITER //
drop table Departments;
// DELIMITER