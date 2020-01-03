CREATE DATABASE kartify;
\c kartify

-- Table 'Questions'
CREATE TABLE IF NOT EXISTS Questions (
  id SERIAL PRIMARY KEY,
  product_id INT,
  asker_name VARCHAR(40),
  body VARCHAR(255),
  date DATE,
  helpful SMALLINT,
  reported SMALLINT
);

-- Table 'Answers'
		
CREATE TABLE IF NOT EXISTS Answers (
  id SERIAL PRIMARY KEY,
  question_id INT REFERENCES Questions(id),
  answer_name VARCHAR(40),
  body VARCHAR(255),
  date DATE,
  helpful SMALLINT,
  reported SMALLINT
);

-- Table 'Photos'
		
CREATE TABLE IF NOT EXISTS Photos (
  id SERIAL PRIMARY KEY,
  answer_id INT REFERENCES Answers(id),
  url VARCHAR(2047)
);