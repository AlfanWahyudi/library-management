ALTER TABLE books
ADD COLUMN deleted_by varchar(25) DEFAULT null,
ADD COLUMN deleted_at TIMESTAMP DEFAULT null;