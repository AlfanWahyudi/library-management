import 'server-only'

import { createDataTableMetaDTO } from "./data-table-meta-dto";

export function createDataTableResDTO({ data = [], meta = {} }) {
  if (typeof(data) !== 'object') throw new Error('data property must be a object')
  if (typeof(meta) !== 'object') throw new Error('meta property must be a object')

  return {
    data: data,
    meta: createDataTableMetaDTO(meta)
  }
}