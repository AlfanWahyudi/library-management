
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
    throw new Error(err);
  }

  const resJson = await res.json()

  return resJson.data
}

export {
  saveAuthor,
}