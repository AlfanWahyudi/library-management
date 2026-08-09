import 'server-only'

export function createRole({
  id, 
  name, 
  createdAt = null, 
  updatedAt = null,
  createdBy = null,
  updatedBy = null,
}) {

  return {
    id: parseInt(id),
    name: name.toString(),
    createdAt: createdAt && new Date(createdAt),
    updatedAt: updatedAt && new Date(updatedAt), 
    createdBy: createdBy && createdBy.toString(), 
    updatedBy: updatedBy && updatedBy.toString(), 
  }
}

export const createArrRole = (roles = []) => {
  return roles.map((role) => createRole(role))
}