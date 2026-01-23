import 'server-only'

export function createMember({
  id, 
  fullName, 
  email, 
  phone, 
  address, 
  birthDate, 
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
    email: email.toString(), 
    phone: phone.toString(), 
    address: address.toString(), 
    birthDate: new Date(birthDate), 
    gender: gender.toString(), 
    createdAt: createdAt && new Date(createdAt),
    updatedAt: updatedAt && new Date(updatedAt), 
    deletedAt: deletedAt && new Date(deletedAt),
    createdBy: createdBy && createdBy.toString(), 
    updatedBy: updatedBy && updatedBy.toString(), 
    deletedBy: deletedBy && deletedBy.toString(), 
  }
}
