DROP DATABASE "library-management";

CREATE DATABASE "library-management";

-- Define Enumerations data --
CREATE TYPE genderEnum AS ENUM ('m', 'f');
CREATE TYPE ViolationLevel AS ENUM ('minor', 'moderate', 'high')


CREATE TABLE users
(
  id serial,
  username varchar(25) not null unique,
  email varchar(255) not null unique,
  password varchar(255) not null,
  full_name varchar(255) not null,
  address text,
  gender genderEnum not null,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null, 
  primary key (id)
);


CREATE TABLE permissions
(
  id serial,
  name varchar(255) not null unique,
  description TEXT,
  primary key (id)
);


CREATE TABLE roles
(
  id serial,
  name varchar(255) not null,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (id)
);


CREATE TABLE role_permissions
(
  role_id int references roles(id) on delete cascade,
  permission_id int references permissions(id) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (role_id, permission_id)
);


CREATE TABLE user_roles
(
  user_id int references users(id) on delete cascade,
  role_id int references roles(id) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (user_id, role_id)
);


CREATE TABLE authors
(
  id serial,
  full_name varchar(255) not null,
  nationality varchar(255),
  active_since int,
  about text,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);


CREATE TABLE books
(
  id serial,
  isbn varchar(50) not null unique,
  title varchar(255) not null,
  sub_title varchar(255),
  publisher varchar(255),
  publication_date Date not null,
  page int,
  language varchar(255),
  edition int,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);


CREATE TABLE book_authors
(
  author_id int references authors(id) on delete cascade,
  book_id int references books(id) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (author_id, book_id)
);



CREATE TABLE book_image_files
(
  id serial,
  book_id int references books(id) on delete cascade,
  file_name varchar(255) not null,
  extension varchar(15) not null,
  size_kilobyte bigint not null,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (id)
);


CREATE TABLE members
(
  id serial,
  full_name varchar(255) not null,
  email varchar(255) not null unique,
  phone varchar(20) not null unique,
  address TEXT not null,
  birth_date date not null,
  gender genderEnum not null,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);


CREATE TABLE block_members
(
  id serial,
  member_id int references members(id) on delete cascade,
  start_date TIMESTAMP not null,
  end_date TIMESTAMP not null,
  is_completed boolean not null default false,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (id)
);

CREATE TABLE block_members_forever
(
  id serial,
  member_id int references members(id) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (id)
);


CREATE TABLE book_reservations
(
  id serial,
  member_id int references members(id) on delete cascade,
  book_id int references books(id) on delete cascade,
  start_date TIMESTAMP not null,
  end_date TIMESTAMP not null,
  is_completed boolean not null default false,
  is_cancelled boolean not null default false,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);


CREATE TABLE book_loans
(
  id serial,
  member_id int references members(id) on delete cascade,
  book_id int references books(id) on delete cascade,
  start_date TIMESTAMP not null,
  end_date TIMESTAMP not null,
  returned_date TIMESTAMP default null,
  is_returned boolean not null default false,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);


CREATE TABLE sanctions
(
  id serial,
  title varchar(255) not null,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);


CREATE TABLE violations
(
  id serial,
  title varchar(255) not null,
  level ViolationLevel not null,
  description TEXT default null,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (id)
);


CREATE TABLE violation_sanctions
(
  violation_id int references violations(id) on delete cascade,
  sanction_id int references sanctions(id) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (violation_id, sanction_id)
);


CREATE TABLE loan_violations
(
  book_loan_id int references book_loans(id) on delete cascade,
  violation_id int references violations(id) on delete cascade,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(25),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_by varchar(25) default null,
  deleted_at TIMESTAMP default null,
  primary key (book_loan_id, violation_id)
);
