const getPaginatedListBookOnLoan = async ({ page, limit, search, searchFields, orderBy, orderDir }) => {
  const query = new URLSearchParams({page, limit, search, searchFields, orderBy, orderDir}).toString();
  const res = await fetch(`/api/book-loans?${query}`)
  
  if (!res.ok) {
    throw new Error(err)
  }

  const resJson = await res.json()

  return {
    data: resJson.data,
    meta: resJson.meta
  }
}

const saveBookLoan = async ({ data }) => {
  const res = await fetch('/api/book-loans', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)  
  })      

  if (!res.ok) {
    throw new Error('Gagal menyimpan pinjaman buku, mohon untuk dicoba lagi nanti.')
  }

  const resJson = await res.json()

  return resJson.data
}


const completingBookLoan = async ({ id, data }) => {
  const res = await fetch(`/api/book-loans/${id}/complete`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)  
  })      

  if (!res.ok) {
    throw new Error('Gagal melakukan penyelesaian pinjaman buku, mohon untuk dicoba lagi nanti.')
  }

  const resJson = await res.json()

  return resJson.data
}


export {
  getPaginatedListBookOnLoan,
  saveBookLoan,
  completingBookLoan,
}