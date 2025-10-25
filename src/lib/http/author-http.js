import { getFilenameFromRes } from "../utils/http";

const getPaginatedListAuthor = async ({ page, limit, search, searchFields, orderBy, orderDir }) => {
  const query = new URLSearchParams({page, limit, search, searchFields, orderBy, orderDir}).toString();
  const res = await fetch(`/api/authors?${query}`)
  
  if (!res.ok) {
    throw new Error(err)
  }

  const resJson = await res.json()

  return {
    data: resJson.data,
    meta: resJson.meta
  }
}

const saveAuthor = async ({ data, id = null }) => {
  let method = 'POST'
  let url = '/api/authors'
  let err = 'Gagal menambahkan data pengarang, mohon dicoba lagi nanti.'

  if (id !== null) {
    method = 'PUT'
    url += `/${id}`
    err = 'Gagal update data pengarang, mohon dicoba lagi nanti.'
  }

  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)  
  })      

  if (!res.ok) {
    throw new Error(err)
  }

  const resJson = await res.json()

  return resJson.data
}

const deleteAuthor = async ({ id }) => {
  const res = await fetch('/api/authors/' + id, {
    method: 'DELETE'
  })      

  if (!res.ok) {
    throw new Error('Gagal menghapus data pengarang, mohon dicoba lagi nanti.')
  }

  return 1
}

const downloadPdfAuthorAll = async () => {
  const res = await fetch('/api/authors/files?extension=xlsx')      

  if (!res.ok) {
    throw new Error('Gagal download data pengarang, mohon dicoba lagi nanti.')
  }

  let filename = "authors-file";

  const filenameRes = getFilenameFromRes(res)
  if (filenameRes) {
    filename = filenameRes
  }

  const blobData = await res.blob()

  return {
    filename,
    blobData
  }
}

export {
  getPaginatedListAuthor,
  saveAuthor,
  deleteAuthor,
  downloadPdfAuthorAll,
}
