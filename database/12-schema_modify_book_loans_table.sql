ALTER TABLE book_loans
DROP COLUMN is_returned;

ALTER TABLE book_loans
RENAME returned_date TO finished_date;