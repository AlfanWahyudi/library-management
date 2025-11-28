
-- drop book_authors_data
DELETE FROM book_authors;

-- drop authors
DELETE FROM authors;

-- drop db_view authors_view
DROP VIEW  authors_view;

-- make relationship for nationality into countries code
ALTER TABLE authors 
RENAME nationality TO country_code;

ALTER TABLE authors 
ADD FOREIGN KEY (country_code) REFERENCES countries(code);



-- insert updated authors data
ALTER SEQUENCE authors_id_seq RESTART WITH 1;

INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Asti Musman', 'ID', null, null, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Wahidah Murriska', 'ID', null, 'Memiliki pengalaman kerja sebagai English translator di Perpustakaan Ganesa, Sukoharjo (2015), English teacher di Erje Privat (2016), dan Writer di Sanggar Bahasa Yogyakarta (2017). Latar belakang pendidikannya adalah Sastra Inggris, Fakultas Ilmu Budaya, Universitas Sebelas Maret, dan Ilmu Linguistik, Fakultas Ilmu Budaya, Universitas Gadjah Mada', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Greg McKeown', 'GB', null, null, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Alice Monroe', 'CA', 1998, 'Lorem ipsum', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Javier Ortega', 'ES', 2005, 'Dolor sit amet', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Nina Patel', 'IN', 2010, 'Consectetur', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Tomoko Sato', 'JP', 1995, 'Adipiscing', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Liam O’Connor', 'IE', 2001, 'Elit lorem', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Fatima Zahra', 'MA', 2012, 'Sed do', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('George Smith', 'US', 1987, 'Eiusmod', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Chen Wei', 'CN', 2003, 'Tempor', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Sofia Rossi', 'IT', 1999, 'Incididunt', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Hans Müller', 'DE', 2007, 'Ut labore', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Amara Johnson', 'ZA', 2015, 'Et dolore', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Mateo Silva', 'BR', 2000, 'Magna aliqua', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Elena Petrova', 'RU', 1993, 'Ut enim', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Yusuf Demir', 'TR', 2008, 'Ad minim', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Grace Lee', 'KP', 2011, 'Veniam', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Omar Khalid', 'EG', 1996, 'Quis nostrud', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Isabelle Dubois', 'FR', 2004, 'Exercitation', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Nguyen Thi Lan', 'VN', 2006, 'Ullamco', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('John Doe', 'AU', 1990, 'Laboris nisi', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Maria Gonzalez', 'MX', 2013, 'Ut aliquip', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Ahmed Al-Farsi', 'SA', 2002, 'Ex ea', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Katarzyna Nowak', 'PL', 1997, 'Commodo', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Daniel Svensson', 'SE', 2009, 'Consequat', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Beatrice Ncube', 'ZW', 2014, 'Duis aute', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO authors (full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at) VALUES ('Tariq Rahman', 'PK', 2006, 'Irure dolor', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');


-- insert book_authors again
INSERT INTO book_authors (author_id, book_id, created_by, created_at, updated_by, updated_at) VALUES (1, 1, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO book_authors (author_id, book_id, created_by, created_at, updated_by, updated_at) VALUES (2, 2, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO book_authors (author_id, book_id, created_by, created_at, updated_by, updated_at) VALUES (3, 3, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');


-- create updated authors_view
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
	select * from book_authors ba 
	left join books b on b.id = ba.book_id
	where b.deleted_at is null and b.deleted_by is null
) as book_a ON book_a.author_id = a.id 
GROUP BY a.id, c.name
having 
	a.deleted_at is null and a.deleted_by is null;