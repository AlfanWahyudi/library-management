import { createDataTableMetaDTO } from "./datatable-meta-dto";

export function createDataTableResDTO({ data = [], meta = {} }) {
  return {
    data: data,
    meta: createDataTableMetaDTO(meta)
  }
}