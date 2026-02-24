CREATE OR REPLACE VIEW books_on_loan_view AS
SELECT
  bl.id,
  bl.book_id,
  b.title as book_title,
  b.isbn as book_isbn,
  bl.member_id,
  m.full_name as member_full_name,
  m.email as member_email,
  bl.start_date,
  bl.end_date,
  bl.created_by,
  bl.created_at,
  bl.updated_by,
  bl.updated_at
FROM 
  book_loans bl
LEFT JOIN 
  books b on bl.book_id = b.id
LEFT JOIN
  members m on bl.member_id = m.id
WHERE 
  bl.finished_date IS NULL AND
  (b.deleted_by IS NULL AND b.deleted_at IS NULL)