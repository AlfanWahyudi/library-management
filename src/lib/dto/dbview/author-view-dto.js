import AuthorViewDAL from "@/lib/dal/dbview/author-view-dal"

const mapResToDTO = (authorViewData) => {
  return {
    id: authorViewData.id ? parseInt(authorViewData.id) : null,
    fullName: authorViewData.full_name,
    nationality: authorViewData.nationality, 
    activeSince: authorViewData.active_since ? parseInt(authorViewData.active_since) : null, 
    about: authorViewData.about, 
    createdAt: new Date(authorViewData.created_at), 
    updatedAt: new Date(authorViewData.updated_at), 
    bookCount: authorViewData.book_count ? parseInt(authorViewData.book_count) : null,
  }
}

const mapResArrToDTO = (authorViewArr = []) => {
  return authorViewArr.map((author) => mapResToDTO(author))
}


const AuthorViewDTO = {
  getAll: async () => {
    const data = await AuthorViewDAL.getAll()
    return mapResArrToDTO(data)
  },

  getAllPaginated: async ({
    page,
    limit,
    orderBy,
    orderDir,
    search,
    searchFields = [],
  }) => {
    const data = await AuthorViewDAL.getAllPaginated({page, limit, orderBy, orderDir, search, searchFields})
    return mapResArrToDTO(data)
  }
}

export default AuthorViewDTO