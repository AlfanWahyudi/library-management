
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

const checkEmailExist = async ({email}) => {
  const res = await fetch(`/api/users/find-duplicate?email=${email}`)

  if (!res.ok) {
    throw new Error('Gagal cek duplikasi email, mohon dicoba lagi nanti.')
  }

  const resJson = await res.json()

  return resJson.data['isEmailExist']
}

const checkUsernameExist = async ({username}) => {
  const res = await fetch(`/api/users/find-duplicate?username=${username}`)

  if (!res.ok) {
    throw new Error('Gagal cek duplikasi username, mohon dicoba lagi nanti.')
  }

  const resJson = await res.json()

  return resJson.data['isUsernameExist']
}

const changeUsername = async ({ newUsername }) => {
  const res = await fetch(`/api/users/change-username`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newUsername })
  })

  if (!res.ok) {
    throw new Error('Gagal mengganti username, mohon untuk dicoba lagi nanti.')
  }

  const resJson = await res.json()

  return resJson.data
}

export {
  updateProfile,
  checkEmailExist,
  checkUsernameExist,
  changeUsername,
}