import { createDataTableMetaDTO } from "./data-table-meta-dto";

export function createDataTableResDTO({ data = [], meta = {} }) {
  return {
    data: data,
    meta: createDataTableMetaDTO(meta)
  }
}