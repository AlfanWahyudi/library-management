
const updateProfile = async ({username, email, fullName, gender, address}) => {
  const res = await fetch(`/api/users/${username}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, fullName, gender, address})
  })
  
  if (!res.ok) {
    throw new Error('Gagal memperbarui data profile, mohon dicoba lagi nanti.')
  }

  const resJson = await res.json()

  return resJson.data
}

export {
  updateProfile
}