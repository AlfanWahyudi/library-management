import 'server-only'

export function createAuthor({
  id, 
  fullName, 
  countryCode, 
  activeSince = null, 
  about = null, 
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
    countryCode: countryCode.toString(), 
    about: about && about.toString(), 
    activeSince: activeSince && parseInt(activeSince), 
    createdAt: createdAt && new Date(createdAt),
    updatedAt: updatedAt && new Date(updatedAt), 
    deletedAt: deletedAt && new Date(deletedAt),
    createdBy: createdBy && createdBy.toString(), 
    updatedBy: updatedBy && updatedBy.toString(), 
    deletedBy: deletedBy && deletedBy.toString(), 
  }
}
