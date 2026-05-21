const getPaginatedListBook = async ({ page, limit, search, searchFields, orderBy, orderDir }) => {
  const query = new URLSearchParams({page, limit, search, searchFields, orderBy, orderDir }).toString();
  const res = await fetch(`/api/books?${query}`)
  
  if (!res.ok) {
    throw new Error(err)
  }

  const resJson = await res.json()

  return {
    data: resJson.data,
    meta: resJson.meta
  }
}

const saveBook = async ({ data, id = null }) => {
  let method = 'POST'
  let url = '/api/books'
  let err = 'Gagal menambahkan data buku, mohon dicoba lagi nanti.'

  if (id !== null) {
    method = 'PUT'
    url += `/${id}`
    err = 'Gagal update data buku, mohon dicoba lagi nanti.'
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

const checkDuplicationBook = async ({ id = null, field, value  }) => {
  const res = await fetch(`/api/books/find-duplicate?id=${id}&field=${field}&value=${value}`)

  if (!res.ok) {
    throw new Error('Gagal cek duplikasi, mohon dicoba lagi nanti.')
  }

  const resJson = await res.json()

  return resJson.data[field]
}

const deleteBook = async ({ id }) => {
  const res = await fetch('/api/books/' + id, {
    method: 'DELETE'
  })      

  if (!res.ok) {
    throw new Error('Gagal menghapus data pelanggaran, mohon dicoba lagi nanti.')
  }

  return true
}

const canDeleteBook = async ({ id }) => {
  const res = await fetch('/api/books/' + id + '/can-delete', {
    method: 'GET'
  })      

  if (!res.ok) {
    throw new Error('Gagal melakukan pengecekan, apakah data buku dapat dihapus atau tidak. Mohon untuk mencoba lagi nanti.')
  }

  const resJson = await res.json()
  const result = resJson.data.bookCanDelete

  return result
}

const listIncludeLoan = async ({ orderDir = '', orderBy = '' }) => {
  const query = new URLSearchParams({orderDir, orderBy }).toString();
  const res = await fetch(`/api/books/include-loan-list?${query}`)      

  if (!res.ok) {
    throw new Error('Gagal mengambil daftar buku yang sudah termasuk status peminjaman. Mohon untuk mencoba lagi nanti.')
  }

  const resJson = await res.json()
  const result = resJson.data

  return result
}

export {
  getPaginatedListBook,
  saveBook,
  deleteBook,
  canDeleteBook,
  checkDuplicationBook,
  listIncludeLoan
}