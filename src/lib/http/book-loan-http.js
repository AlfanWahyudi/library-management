import { getFilenameFromRes } from "../utils/http";

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

const getPaginatedHistBookLoan = async ({ page, limit, search, searchFields, orderBy, orderDir, bookId = null, memberId = null }) => {
  const query = new URLSearchParams({page, limit, search, searchFields, orderBy, orderDir, bookId, memberId}).toString();
  const res = await fetch(`/api/book-loans/histories?${query}`)
  
  if (!res.ok) {
    throw new Error(err)
  }

  const resJson = await res.json()

  return {
    data: resJson.data,
    meta: resJson.meta
  }
}

const downExcelAllHistBookLoan = async () => {
  const res = await fetch('/api/book-loans/histories/files?extension=xlsx')      

  if (!res.ok) {
    throw new Error('Gagal download data riwayat peminjaman buku, mohon dicoba lagi nanti.')
  }

  let filename = "book-loan-histories-file";

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
  getPaginatedListBookOnLoan,
  getPaginatedHistBookLoan,
  saveBookLoan,
  completingBookLoan,
  downExcelAllHistBookLoan,
}