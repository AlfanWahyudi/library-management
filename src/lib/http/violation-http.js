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

export {
  getPaginatedListViolation
}