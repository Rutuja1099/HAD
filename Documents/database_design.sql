show databases;

create DATABASE suhrid;
use suhrid;

drop table doctorInfo;

CREATE TABLE doctorInfo(
dtRegno BIGINT PRIMARY KEY,
dtFullName VARCHAR(255) NOT NULL,
dtPhone VARCHAR(255) UNIQUE NOT NULL,
dtAddr VARCHAR(255) NOT NULL,
dtEmail VARCHAR(255) UNIQUE NOT NULL,
dtExperience INT,
dtPatientLimit INT NOT NULL,
dtActivePatients INT NOT NULL,
dtIsModerator BOOLEAN NOT NULL
);


CREATE TABLE doctorDegree(
dtRegno BIGINT PRIMARY KEY,
dtDegree VARCHAR(255) NOT NULL,
dtSpecialization VARCHAR(255) NOT NULL,
FOREIGN KEY (dtRegno) REFERENCES doctorInfo(dtRegno)
);


CREATE TABLE questions (
    ptRegno INT,
    questionId INT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    isEmergency BOOLEAN
);

CREATE TABLE answers (
    answerId INT PRIMARY KEY,
    questionId INT NOT NULL,
    answer VARCHAR(255) NOT NULL,
    dtRegno INT,
    upVote INT,
    isValid BOOLEAN,
    FOREIGN KEY (questionId) REFERENCES questions(questionId)
);

CREATE TABLE recommendation (
    recId INT PRIMARY KEY,
    recType VARCHAR(50),
    link VARCHAR(255),
    content VARCHAR(255)
);

create table questionnaire(
questionId int primary key, 
question varchar(100) unique, 
opt1 int not null, 
opt2 int not null, 
opt3 int not null, 
opt4 int not null
);

create table patientInfo(
ptRegNo int primary key,
ptFullname varchar(50) not null, 
ptPhone varchar(10), 
ptAddr varchar(100), 
ptDOB DATE
);

create table diagnosis(
diagnosisId int primary key, 
questionId int not null, 
patientRegNo int not null, 
currentWeek int,
ptRegNo int, 
foreign key (questionId) references questionnaire(questionId), 
foreign key (ptRegNo) references patientInfo(ptRegNo)
);

create table patientLogin(
ptRegNo int primary key, 
ptUsername varchar(30) unique, 
ptPassword varchar(30), 
foreign key (ptRegNo) references patientInfo(ptRegNo)
);

create table doctorLogin(
dtRegno bigint primary key, 
ptUsername varchar(30) unique, 
ptPassword varchar(30), 
foreign key (dtRegno) references doctorInfo(dtRegno)
);

create table patientProgress(
ptRegno int, 
dtRegno bigint, 
diagnosisId int, 
noOfWeeks int, 
currentWeek int, 
severity int, 
typeOfIllness varchar(30), 
diagnosis varchar(60), 
foreign key(ptRegno) references patientInfo(ptRegno), 
foreign key(dtRegno) references doctorInfo(dtRegno), 
foreign key(diagnosisId) references diagnosis(diagnosisId)
);

create table chat(
ptRegno int, 
dtRegno bigint, 
chatId int, 
chatMinutes int, 
chatDump varchar(50), 
foreign key(ptRegno) references patientInfo(ptRegno), 
foreign key(dtRegno) references doctorInfo(dtRegno)
);

create table doctorSchedule(
dtRegno bigint, 
thismonth varchar(10), 
thisweek varchar(10), 
thisday varchar(10), 
thisslot varchar(10), 
foreign key(dtRegno) references doctorInfo(dtRegno)
);

create table appointments(
aptId int primary key, 
dtRegno bigint, 
ptRegno int, 
aptDate date, 
aptTime time, 
foreign key(ptRegno) references patientInfo(ptRegno), 
foreign key(dtRegno) references doctorInfo(dtRegno)
);



show tables;