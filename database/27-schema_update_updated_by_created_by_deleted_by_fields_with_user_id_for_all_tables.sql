-- start:  authors table
UPDATE authors
SET 
	created_by = '1'
WHERE
created_by IS NOT NULL;


UPDATE authors
SET 
	updated_by = '1'
WHERE
updated_by IS NOT NULL;


UPDATE authors
SET 
	deleted_by = '1'
WHERE
deleted_by IS NOT NULL;
-- end: authors table

-- start:  book_authors table
UPDATE book_authors
SET 
	created_by = '1'
WHERE
created_by IS NOT NULL;
-- end: book_authors table


-- start:  book_loans table
UPDATE book_loans
SET 
	created_by = '2'
WHERE
  id=1 OR id=2 OR id=5;


UPDATE book_loans
SET 
	updated_by = '2'
WHERE
  id=1 OR id=2 OR id=5;

UPDATE book_loans
SET 
	created_by = '3'
WHERE
  id=3 OR id=4;


UPDATE book_loans
SET 
	updated_by = '3'
WHERE
  id=3 OR id=4;
-- end: book_loans table


-- start:  books table
UPDATE books
SET 
	created_by = '1'
WHERE
created_by IS NOT NULL;


UPDATE books
SET 
	updated_by = '1'
WHERE
updated_by IS NOT NULL;


UPDATE books
SET 
	deleted_by = '1'
WHERE
deleted_by IS NOT NULL;
-- end: books table


-- start:  loan_violations table
UPDATE loan_violations
SET 
	created_by = '2'
WHERE
  book_loan_id=1 AND violation_id=9;

UPDATE loan_violations
SET 
	created_by = '3'
WHERE
  book_loan_id=3 AND violation_id=9;
-- end: loan_violations table


-- start:  members table
UPDATE members
SET 
	created_by = '1'
WHERE
created_by IS NOT NULL;


UPDATE members
SET 
	updated_by = '1'
WHERE
updated_by IS NOT NULL;
-- end: members table


-- start:  role_permissions table
UPDATE role_permissions
SET 
	created_by = '1'
WHERE
created_by IS NOT NULL;


UPDATE role_permissions
SET 
	updated_by = '1'
WHERE
updated_by IS NOT NULL;
-- end: role_permissions table


-- start:  roles table
UPDATE roles
SET 
	created_by = '1'
WHERE
created_by IS NOT NULL;


UPDATE roles
SET 
	updated_by = '1'
WHERE
updated_by IS NOT NULL;
-- end: roles table


-- start:  user_roles table
UPDATE user_roles
SET 
	created_by = '1'
WHERE
created_by IS NOT NULL;


UPDATE user_roles
SET 
	updated_by = '1'
WHERE
updated_by IS NOT NULL;
-- end: user_roles table


-- start:  users table
UPDATE users
SET 
	created_by = '1'
WHERE
  created_by IS NOT NULL;

UPDATE users
SET 
	updated_by = '1'
WHERE
  id=1 OR id=2 OR id=6 OR id=7;

UPDATE users
SET 
	updated_by = '3'
WHERE
  id=3;

UPDATE users
SET 
	updated_by = '4'
WHERE
  id=4;

UPDATE users
SET 
	updated_by = '5'
WHERE
  id=5;

UPDATE users
SET 
	updated_by = '8'
WHERE
  id=8;
-- end: users table


-- start:  violations table
UPDATE violations
SET 
	created_by = '1'
WHERE
created_by IS NOT NULL;


UPDATE violations
SET 
	updated_by = '1'
WHERE
updated_by IS NOT NULL;


UPDATE violations
SET 
	deleted_by = '1'
WHERE
deleted_by IS NOT NULL;
-- end: violations table