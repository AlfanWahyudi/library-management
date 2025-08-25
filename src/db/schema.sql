DROP DATABASE "library-management";

CREATE DATABASE "library-management";

-- Define Enumerations data --
CREATE TYPE genderEnum AS ENUM ('M', 'F');
CREATE TYPE ViolationLevel AS ENUM ('Minor', 'Moderate', 'High')

--  - users -> id, username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at
CREATE TABLE IF NOT EXISTS users
(
  id serial,
  username varchar(25) not null unique,
  email varchar(255) not null unique,
  password varchar(255) not null,
  full_name varchar(255) not null,
  gender genderEnum not null,
  address text,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null, 
  primary key (id)
);

--  - resources -> code, name, created_by, created_at, updated_by, updated_at
CREATE TABLE IF NOT EXISTS resources
(
  code varchar(10),
  name varchar(255) not null,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  primary key (code)
);

--  - operations -> code, name, created_by, created_at, updated_by, updated_at
CREATE TABLE IF NOT EXISTS operations
(
  code varchar(10),
  name varchar(255) not null,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  primary key (code)
);

--  - permissions -> id, resource_code, operation_code, created_by, created_at, updated_by, updated_at
CREATE TABLE IF NOT EXISTS permissions
(
  id serial,
  resource_code varchar(10) references resources(code) on delete cascade,
  operation_code varchar(10) references operations(code) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  primary key (id),
  unique (resource_code, operation_code)
);

--  - roles -> code, name, created_by, created_at, updated_by, updated_at
CREATE TABLE IF NOT EXISTS roles
(
  code varchar(10),
  name varchar(255) not null,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  primary key (code)
);

--  - role_permissions ->  role_code, permission_id, created_by, created_at
CREATE TABLE IF NOT EXISTS role_permissions
(
  role_code varchar(10) references roles(code) on delete cascade,
  permission_id int references permissions(id) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP,
  primary key (role_code, permission_id)
);

--  - user_roles -> user_id, role_code, created_by, created_at
CREATE TABLE IF NOT EXISTS user_roles
(
  user_id int references users(id) on delete cascade,
  role_code varchar(10) references roles(code) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP,
  primary key (user_id, role_code)
);


--  - authors -> id, full_name, email, birth_date, nationality, active_since, about, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at
CREATE TABLE IF NOT EXISTS authors
(
  id serial,
  full_name varchar(255) not null,
  nationality varchar(255),
  active_since int,
  about text,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);

--  - books -> id, isbn, title, sub_title, publisher, year_of_publication, copyright, editor_name, page, language, edition, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at
CREATE TABLE IF NOT EXISTS books
(
  id serial,
  isbn varchar(50) not null unique,
  title varchar(255) not null,
  sub_title varchar(255),
  publisher varchar(255),
  publication_date Date,
  page int,
  language varchar(255),
  edition int,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);

--  - book_authors -> author_id, book_id, created_by, created_at, updated_by, updated_at
CREATE TABLE IF NOT EXISTS book_authors
(
  author_id int references authors(id) on delete cascade,
  book_id int references books(id) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  primary key (author_id, book_id)
);


--  - book_image_files -> id, book_id, file_name, extension, size_kilobyte, created_by, created_at, updated_by, updated_at
CREATE TABLE IF NOT EXISTS book_image_files
(
  id serial,
  book_id int references books(id) on delete cascade,
  file_name varchar(255) not null,
  extension varchar(15) not null,
  size_kilobyte bigint not null,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  primary key (id)
);


--  - members -> id, full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at
CREATE TABLE IF NOT EXISTS members
(
  id serial,
  full_name varchar(255) not null,
  email varchar(255) not null unique,
  phone varchar(20) not null unique,
  address TEXT not null,
  birth_date date not null,
  gender genderEnum not null,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);


--  - block_members -> id, member_id, start_date, end_date, is_completed, created_by, created_at
CREATE TABLE IF NOT EXISTS block_members
(
  id serial,
  member_id int references members(id) on delete cascade,
  start_date DATE not null,
  end_date DATE not null,
  is_completed boolean not null default false,
  created_by varchar(25),
  created_at TIMESTAMP
);

--  - block_members_forever -> id, member_id, created_by, created_at
CREATE TABLE IF NOT EXISTS block_members_forever
(
  id serial,
  member_id int references members(id) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP,
  primary key (id)
);

--  - book_reservations -> id, member_id, book_id, start_date, end_date, is_completed, is_cancelled, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at
CREATE TABLE IF NOT EXISTS book_reservations
(
  id serial,
  member_id int references members(id) on delete cascade,
  book_id int references books(id) on delete cascade,
  start_date DATE not null,
  end_date DATE not null,
  is_completed boolean not null default false,
  is_cancelled boolean not null default false,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);

--  - book_loans -> id, member_id, book_id, start_date, end_date, returned_date, is_returned, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at
CREATE TABLE IF NOT EXISTS book_loans
(
  id serial,
  member_id int references members(id) on delete cascade,
  book_id int references books(id) on delete cascade,
  start_date DATE not null,
  end_date DATE not null,
  returned_date Date default null,
  is_returned boolean not null default false,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);

--  - sanctions -> id, title, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at
CREATE TABLE IF NOT EXISTS sanctions
(
  id serial,
  title varchar(255) not null,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);

--  - violations -> id, title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at
CREATE TABLE IF NOT EXISTS violations
(
  id serial,
  title varchar(255) not null,
  level ViolationLevel not null,
  description TEXT default null,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);

--  - violation_sanctions -> violation_id, sanction_id, created_by, created_at
CREATE TABLE IF NOT EXISTS violation_sanctions
(
  violation_id int references violations(id) on delete cascade,
  sanction_id int references sanctions(id) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP,
  primary key (violation_id, sanction_id)
);

--  - loan_violations -> book_loan_id, violation_id, created_by, created_at, deleted_by, deleted_at
CREATE TABLE IF NOT EXISTS loan_violations
(
  book_loan_id int references book_loans(id) on delete cascade,
  violation_id int references violations(id) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (book_loan_id, violation_id)
);


/* 
 --- Update table 
*/

-- change year_of_publication column into publication_date on books table
ALTER TABLE books
ADD COLUMN publication_date date not null;


-- change type from Date to timestamp
-- book_loans
ALTER TABLE book_loans
ALTER COLUMN start_date TYPE timestamp;


ALTER TABLE book_loans
ALTER COLUMN end_date TYPE timestamp;

-- book_reservations
ALTER TABLE book_reservations
ALTER COLUMN start_date TYPE timestamp;

ALTER TABLE book_reservations
ALTER COLUMN end_date TYPE timestamp;

-- block_members
ALTER TABLE block_members
ALTER COLUMN start_date TYPE timestamp;

ALTER TABLE block_members
ALTER COLUMN end_date TYPE timestamp;


-- adding primary key to id on block_members column
ALTER TABLE block_members
ADD CONSTRAINT pk_block_members PRIMARY KEY (id);



-- drop timestamps columns on roles table
ALTER TABLE roles
DROP COLUMN created_by,
DROP COLUMN created_at,
DROP COLUMN updated_by,
DROP COLUMN updated_at;


-- add updated_at, updated_by columns into user_roles table
ALTER TABLE user_roles
ADD COLUMN updated_by varchar(25),
ADD COLUMN updated_at TIMESTAMP;


-- drop timestamps columns on operations table
ALTER TABLE operations
DROP COLUMN created_by,
DROP COLUMN created_at,
DROP COLUMN updated_by,
DROP COLUMN updated_at;

-- drop timestamps columns on resources table
ALTER TABLE resources
DROP COLUMN created_by,
DROP COLUMN created_at,
DROP COLUMN updated_by,
DROP COLUMN updated_at;

-- drop timestamps columns on permissions table
ALTER TABLE permissions
DROP COLUMN created_by,
DROP COLUMN created_at,
DROP COLUMN updated_by,
DROP COLUMN updated_at;


-- add updated_at, updated_by columns into role_permissions table
ALTER TABLE role_permissions
ADD COLUMN updated_by varchar(25),
ADD COLUMN updated_at TIMESTAMP;

-- change varchar length for all code columns 
ALTER TABLE resources
ALTER COLUMN code TYPE varchar(25);

ALTER TABLE operations
ALTER COLUMN code TYPE varchar(25);

ALTER TABLE permissions
ALTER COLUMN resource_code TYPE varchar(25),
ALTER COLUMN Operation_code TYPE varchar(25);

ALTER TABLE roles
ALTER COLUMN code TYPE varchar(25);

ALTER TABLE role_permissions
ALTER COLUMN role_code TYPE varchar(25);

ALTER TABLE user_roles
ALTER COLUMN role_code TYPE varchar(25);


-- change enum (genderEnum) values
ALTER TYPE genderEnum RENAME VALUE 'F' TO 'f';
ALTER TYPE genderEnum RENAME VALUE 'M' TO 'm';


-- change enum (ViolationLevel) values
ALTER TYPE ViolationLevel RENAME VALUE 'Minor' TO 'minor';
ALTER TYPE ViolationLevel RENAME VALUE 'Moderate' TO 'moderate';
ALTER TYPE ViolationLevel RENAME VALUE 'High' TO 'high';
