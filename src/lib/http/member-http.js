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

export {
  getPaginatedListMember,
}