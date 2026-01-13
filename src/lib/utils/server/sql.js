import 'server-only'

import sql from '../../config/db'

// const dataNotDeleted = (alias = '') => sql`deleted_by IS NULL AND deleted_at IS NULL`
const dataNotDeleted = (alias = '') => {
  if (alias.trim() === '') {
    return sql`deleted_by IS NULL AND deleted_at IS NULL `
  }

  return sql`${ sql(alias + '.deleted_by') } IS NULL AND ${ sql(alias + '.deleted_at') } IS NULL`

}

const dataDeleted = (alias = '') => {
  if (alias.trim() === '') {
    return sql`deleted_by IS NULL AND deleted_at IS NULL `
  }

  return sql`${ sql(alias + '.deleted_by') } IS NULL AND ${ sql(alias + '.deleted_at') } IS NULL`
}

export {
  dataNotDeleted,
  dataDeleted
}