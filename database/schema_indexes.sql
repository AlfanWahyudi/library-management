-- Drop Index --
DROP INDEX IF EXISTS authors_full_name_index;

-- END | Drop Index


-- Create Index --
CREATE INDEX authors_full_name_index ON authors (full_name);

-- END | Create Index
