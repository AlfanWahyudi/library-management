import 'server-only'

export function createMember({
  id, 
  full_name, 
  email, 
  phone, 
  address, 
  birth_date, 
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
    email: email.toString(), 
    phone: phone.toString(), 
    address: address.toString(), 
    birthDate: new Date(birth_date), 
    gender: gender.toString(), 
    createdAt: created_at && new Date(created_at),
    updatedAt: updated_at && new Date(updated_at), 
    deletedAt: deleted_at && new Date(deleted_at),
    createdBy: created_by && created_by.toString(), 
    updatedBy: updated_by && updated_by.toString(), 
    deletedBy: deleted_by && updated_by.toString(), 
  }
}
