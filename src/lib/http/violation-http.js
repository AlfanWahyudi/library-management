const getPaginatedListViolation = async ({ page, limit, search, searchFields, orderBy, orderDir }) => {
  const query = new URLSearchParams({page, limit, search, searchFields, orderBy, orderDir}).toString();
  const res = await fetch(`/api/violations?${query}`)
  
  if (!res.ok) {
    throw new Error(err)
  }

  const resJson = await res.json()

  return {
    data: resJson.data,
    meta: resJson.meta
  }
}


const saveViolation = async ({ data, id = null }) => {
  let method = 'POST'
  let url = '/api/violations'
  let err = 'Gagal menambahkan data pelanggaran, mohon dicoba lagi nanti.'

  if (id !== null) {
    method = 'PUT'
    url += `/${id}`
    err = 'Gagal update data pelanggaran, mohon dicoba lagi nanti.'
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


const deleteViolation = async ({ id }) => {
  const res = await fetch('/api/violations/' + id, {
    method: 'DELETE'
  })      

  if (!res.ok) {
    throw new Error('Gagal menghapus data pelanggaran, mohon dicoba lagi nanti.')
  }

  return true
}

const canDeleteViolation = async ({ id }) => {
  const res = await fetch('/api/violations/' + id + '/can-delete', {
    method: 'GET'
  })      

  if (!res.ok) {
    throw new Error('Gagal melakukan pengecekan, apakah data pelanggaran dapat dihapus atau tidak. Mohon untuk mencoba lagi nanti.')
  }

  const resJson = await res.json()
  const result = resJson.data.violationCanDelete

  return result
}

export {
  getPaginatedListViolation,
  saveViolation,
  deleteViolation,
  canDeleteViolation
}