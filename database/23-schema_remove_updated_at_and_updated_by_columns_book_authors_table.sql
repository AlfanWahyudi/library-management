-- 1. Drop authors_view view
DROP VIEW  authors_view;

-- 2. remove updated_at and updated_by columns from book_authors
ALTER TABLE book_authors
DROP COLUMN updated_at,
DROP COLUMN updated_by;


-- 3. recreate authors_view (query still same with previous author_view, from 22-schema_update_author_view_db_...sql file)
CREATE OR REPLACE VIEW authors_view AS
SELECT 
	a.id,
	a.full_name,
	count(ba.book_id) AS book_count,
	a.country_code,
	c.name AS country_name,
	a.active_since,
	a.about,
	a.created_at,
	a.updated_at
FROM authors a 
JOIN countries c ON c.code = a.country_code
LEFT JOIN (
	SELECT * FROM book_authors ba1 
	LEFT JOIN books b ON b.id = ba1.book_id
	WHERE (ba1.deleted_at IS NULL AND ba1.deleted_by IS NULL) AND 
	(b.deleted_at IS NULL AND b.deleted_by IS NULL)
) as ba ON ba.author_id = a.id 
GROUP BY a.id, c.name
having 
	(a.deleted_at is null and a.deleted_by is null);