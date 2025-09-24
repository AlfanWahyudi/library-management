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
	select * from book_authors ba1 
	left join books b on b.id = ba1.book_id
	where b.deleted_at is null and b.deleted_by is null
) as ba ON ba.author_id = a.id 
GROUP BY a.id, c.name
having 
	a.deleted_at is null and a.deleted_by is null;