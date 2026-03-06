import { getFilenameFromRes } from "../utils/http";

const getPaginatedListMember = async ({ page, limit, search, searchFields, orderBy, orderDir, gender }) => {
  const query = new URLSearchParams({page, limit, search, searchFields, orderBy, orderDir, gender}).toString();
  const res = await fetch(`/api/members?${query}`)
  
  if (!res.ok) {
    throw new Error(err)
  }

  const resJson = await res.json()

  return {
    data: resJson.data,
    meta: resJson.meta
  }
}

const checkDuplicationMember = async ({ id = null, field, value  }) => {
  const res = await fetch(`/api/members/find-duplicate?id=${id}&field=${field}&value=${value}`)

  if (!res.ok) {
    throw new Error('Gagal cek duplikasi, mohon dicoba lagi nanti.')
  }

  const resJson = await res.json()

  return resJson.data[field]
}

const saveMember = async ({ data, id = null }) => {
  let method = 'POST'
  let url = '/api/members'
  let err = 'Gagal menambahkan data anggota, mohon dicoba lagi nanti.'

  if (id !== null) {
    method = 'PUT'
    url += `/${id}`
    err = 'Gagal update data anggota, mohon dicoba lagi nanti.'
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

const downloadExcelMemberAll = async () => {
  const res = await fetch('/api/members/files?extension=xlsx')      

  if (!res.ok) {
    throw new Error('Gagal download data anggota, mohon dicoba lagi nanti.')
  }

  let filename = "members-file";

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

const searchableListMember = async ({ search = '', searchFields = '', orderDir = '', orderBy = '' }) => {
  const query = new URLSearchParams({ search, searchFields, orderDir, orderBy }).toString();
  const res = await fetch(`/api/members/searchable-list?${query}`)      

  if (!res.ok) {
    throw new Error('Gagal menampilkan daftar anggota yang dicari, mohon untuk dicoba lagi nanti.')
  }

  const resJson = await res.json()

  return resJson.data
}

export {
  getPaginatedListMember,
  checkDuplicationMember,
  saveMember,
  downloadExcelMemberAll,
  searchableListMember
}