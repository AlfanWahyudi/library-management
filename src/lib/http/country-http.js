
const getAllCountry = async ({ orderDir = 'asc', orderBy = 'name' }) => {
  const res = await fetch(`/api/countries?orderBy=${orderBy}&orderDir=${orderDir}`)      

  if (!res.ok) {
    throw new Error('Gagal mengambil data seluruh negara. Mohon coba lagi nanti.');
  }

  const resJson = await res.json()

  return resJson.data
}


export {
  getAllCountry
}