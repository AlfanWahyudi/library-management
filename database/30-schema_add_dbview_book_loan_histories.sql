CREATE OR REPLACE VIEW public.book_loan_hist_view
AS SELECT 
    bl.id,
    bl.book_id,
    b.title AS book_title,
    b.isbn AS book_isbn,
    bl.member_id,
    m.full_name AS member_full_name,
    m.email AS member_email,
    bl.start_date,
    bl.end_date,
    bl.finished_date,
    bl.created_by,
    bl.created_at,
    bl.updated_by,
    bl.updated_at
  FROM book_loans bl
    LEFT JOIN books b ON bl.book_id = b.id
    LEFT JOIN members m ON bl.member_id = m.id
  WHERE bl.finished_date IS NOT NULL AND b.deleted_by IS NULL AND b.deleted_at IS NULL;