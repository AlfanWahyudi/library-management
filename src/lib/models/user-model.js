import 'server-only'

export function createUser({
  id, 
  full_name, 
  username, 
  email, 
  password, 
  address = null, 
  gender, 
  created_at = null, 
  updated_at = null,
  deleted_at = null,
  created_by = null,
  updated_by = null,
  deleted_by = null,
}) {

  return {
    id: parseInt(id),
    fullName: full_name.toString(),
    username: username.toString(), 
    email: email.toString(), 
    password: password.toString(), 
    address: address && address.toString(), 
    gender: gender.toString(), 
    createdAt: created_at && new Date(created_at),
    createdBy: created_by && created_by.toString(), 
    updatedAt: updated_at && new Date(updated_at), 
    updatedBy: updated_by && updated_by.toString(), 
    deletedAt: deleted_at && new Date(deleted_at),
    deletedBy: deleted_by && updated_by.toString(), 
  }
}
