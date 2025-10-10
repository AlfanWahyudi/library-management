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
    throw new Error('Gagal download pdf data pengarang, mohon dicoba lagi nanti.')
  }

  //TODO: buat utils function untuk handle ini
  // 3. Extract filename from Content-Disposition header (if available)
  let filename = "authors-file";
  const disposition = res.headers.get("Content-Disposition");
  if (disposition && disposition.includes("filename=")) {
    const splitted = disposition.split("filename=")
    filename = splitted[1].replaceAll(`"`, ``)
  }

  const blobData = await res.blob()

  return {
    filename,
    blobData
  }
}

export {
  saveAuthor,
  deleteAuthor,
  downloadPdfAuthorAll,
}
