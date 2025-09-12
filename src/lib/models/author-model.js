import 'server-only'

export function createAuthor({
  id, 
  full_name, 
  country_code, 
  active_since = null, 
  about = null, 
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
    countryCode: country_code.toString(), 
    about: about && about.toString(), 
    activeSince: active_since && parseInt(active_since), 
    createdAt: created_at && new Date(created_at),
    updatedAt: updated_at && new Date(updated_at), 
    deletedAt: deleted_at && new Date(deleted_at),
    createdBy: created_by && created_by.toString(), 
    updatedBy: updated_by && updated_by.toString(), 
    deletedBy: deleted_by && updated_by.toString(), 
  }
}
