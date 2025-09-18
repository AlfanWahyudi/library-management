
const saveAuthor = async ({ data }) => {
  const res = await fetch('/api/authors', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)  
  })      

  if (!res.ok) {
    throw new Error('Gagal menambahkan data pengarang, mohon dicoba lagi nanti.');
  }

  const resJson = await res.json()

  return resJson.data
}


export {
  saveAuthor,
}