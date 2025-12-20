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

export {
  getPaginatedListMember,
  checkDuplicationMember,
  saveMember
}