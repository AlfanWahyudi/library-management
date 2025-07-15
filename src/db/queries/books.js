import sql from "../index"

const columns = [
  'id',
  'isbn',
  'title',
  'sub_title',
  'publisher',
  'publication_date',
  'page',
  'language',
  'edition',
  'created_at',
  'updated_at'
]

export const findBookById = async ({id}) => {
  return await sql`SELECT ${ sql(columns) } FROM books WHERE id = ${id}`
}

export const getAllBooks = async () => {
  return await sql`SELECT ${ sql(columns) } FROM books ORDER BY updated_at`
}

export const createBook = ({isbn, title, sub_title, publisher, publication_date, page, language, edition}) => {
  //TODO
  return null
}

export const updateBook = ({id, isbn, title, sub_title, publisher, publication_date, page, language, edition}) => {
  //TODO
  return null
}

export const softDeleteBook = ({id}) => {
  //TODO
  return null
}

export const forceDeleteBook = ({id}) => {
  //TODO
  return null
}
