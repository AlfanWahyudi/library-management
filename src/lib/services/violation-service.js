import 'server-only'

import sql from '../config/db'
import { NotFoundError } from '../errors/not-found-error'
import ViolationDAL from '../dal/violation-dal'
import { createViolationDTO } from '../dto/violation-dto'

const isFound = async ({ id }) => {
  const [violation] = ViolationDAL.findById(sql, id)
  return violation !== undefined
}

const ViolationService = {
  findById: async ({ id }) => {
    const [violation] = await ViolationDAL.findById(sql, id)
    
    if (!violation) {
      throw new NotFoundError('id', 'violation id is not found')
    }

    return createViolationDTO(violation)
  },

  getAllPaginated: async ({
    page, 
    limit, 
    orderBy,
    orderDir,
    search,
    searchFields = [],
  }) => {
    const data = {
      page, 
      limit, 
      orderBy,
      orderDir,
      search,
      searchFields,
    }

    const items = await ViolationDAL.getAllPaginated(sql, data)
    const dataMapped = items.data.map((violation) => createViolationDTO(violation))

    return {
      data: dataMapped,
      meta: items.meta,
    }
  },

  // save: async ({
  //   id = null,
  //   fullName,
  //   email,
  //   phone,
  //   address,
  //   birthDate,
  //   gender
  // }) => {
  //   if (id !== null) {
  //     const memberFound = await isFound({id})
  //     if (!memberFound) {
  //       throw new NotFoundError('id', 'member id is not found.')
  //     }
  //   }

  //   const emailExist = await ViolationService.isDataExist({ id, field: 'email', value: email })
  //   if (emailExist) {
  //     throw new NotFoundError('email', 'email is already in use.')
  //   }

  //   const phoneExist = await ViolationService.isDataExist({ id, field: 'phone', value: phone })
  //   if (phoneExist) {
  //     throw new NotFoundError('phone', 'phone is already in use.')
  //   }

  //   const savedData = await sql.begin(async sql => {
  //     const data = { fullName, email, phone, address, birthDate, gender }

  //     const [savedData] = id === null
  //       ? await MemberDAL.create(sql, data)
  //       : await MemberDAL.update(sql, data, id)

  //     return savedData
  //   })

  //   if (savedData === null) {
  //     throw new ActionFailedError('failed to save member data')
  //   }

  //   return createMemberDTO(savedData)
  // },
}

export default ViolationService
