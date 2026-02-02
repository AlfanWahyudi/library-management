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