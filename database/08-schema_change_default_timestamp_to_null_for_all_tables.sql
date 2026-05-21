ALTER TABLE users
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;


ALTER TABLE roles
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;


ALTER TABLE role_permissions
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;

ALTER TABLE user_roles
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;


ALTER TABLE authors
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;


ALTER TABLE books
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;


ALTER TABLE book_authors
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;


ALTER TABLE book_image_files
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;



ALTER TABLE members
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;


ALTER TABLE block_members
ALTER COLUMN created_at SET DEFAULT null;


ALTER TABLE block_members_forever
ALTER COLUMN created_at SET DEFAULT null;



ALTER TABLE book_reservations
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;

ALTER TABLE book_loans
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;


ALTER TABLE sanctions
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;


ALTER TABLE violations
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;


ALTER TABLE violation_sanctions
ALTER COLUMN created_at SET DEFAULT null;


ALTER TABLE loan_violations
ALTER COLUMN created_at SET DEFAULT null,
ALTER COLUMN updated_at SET DEFAULT null;

