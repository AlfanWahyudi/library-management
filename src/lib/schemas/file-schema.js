import 'server-only'

import z from "zod"

const allowedExtMsg = 'Allowed extensions is' 

const defaultFileExtSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'extension must not be empty.')


const extSchema =  {
  xlsx: defaultFileExtSchema
    .refine(
      (val) => /xlsx/.test(val), 
      `${allowedExtMsg} xlsx.`
    ),
  
  csv: defaultFileExtSchema
    .refine(
      (val) => /csv/.test(val), 
      `${allowedExtMsg} csv.`
    ),
  
  doc: defaultFileExtSchema
    .refine(
      (val) => /doc/.test(val), 
      `${allowedExtMsg} doc.`
    ),

  docs: defaultFileExtSchema
    .refine(
      (val) => /docs/.test(val), 
      `${allowedExtMsg} docs.`
    ),
  
  pdf: defaultFileExtSchema
    .refine(
      (val) => /pdf/.test(val), 
      `${allowedExtMsg} pdf.`
    ),
}


export {
  extSchema
}