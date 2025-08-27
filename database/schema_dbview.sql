CREATE OR REPLACE VIEW authors_view AS
SELECT 
	a.id,
	a.full_name,
	count(ba.book_id) AS book_count,
	a.nationality,
	a.active_since,
	a.about,
	a.created_at,
	a.updated_at
FROM authors a 
JOIN book_authors ba ON ba.author_id = a.id 
GROUP BY a.id