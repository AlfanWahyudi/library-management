-- 1. Updated authors view to remove dependant Object deleted_at and deleted_by on books
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
LEFT JOIN book_authors as ba ON ba.author_id = a.id 
GROUP BY a.id, c.name
having 
	a.deleted_at is null and a.deleted_by is null;

-- 2. Remove columns
ALTER TABLE books
DROP COLUMN deleted_at,
DROP COLUMN deleted_by;