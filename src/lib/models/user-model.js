import 'server-only'

export function createUser({
  id, 
  fullName, 
  username, 
  email, 
  password, 
  address = null, 
  gender, 
  createdAt = null,
  updatedAt = null,
  deletedAt = null,
  createdBy = null,
  updatedBy = null,
  deletedBy = null,
}) {

  return {
    id: parseInt(id),
    fullName: fullName.toString(),
    username: username.toString(), 
    email: email.toString(), 
    password: password.toString(), 
    address: address && address.toString(), 
    gender: gender.toString(), 
    createdAt: createdAt && new Date(createdAt),
    updatedAt: updatedAt && new Date(updatedAt), 
    deletedAt: deletedAt && new Date(deletedAt),
    createdBy: createdBy && createdBy.toString(), 
    updatedBy: updatedBy && updatedBy.toString(), 
    deletedBy: deletedBy && deletedBy.toString(), 
  }
}
