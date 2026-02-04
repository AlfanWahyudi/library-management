import 'server-only'

import sql from '../config/db'
import MemberDAL from '../dal/member-dal'
import { createMemberDTO } from '../dto/member-dto'
import { NotFoundError } from '../errors/not-found-error'
import { ActionFailedError } from '../errors/action-failed-error'
import { generateMemberExcel } from '../excel/member-excel'
import { GENDER } from '../constants/gender'
import { BadRequestError } from '../errors/bad-request-error'

const isFound = async ({ id }) => {
  const [member] = await MemberDAL.findById(sql, id)
  return member !== undefined
}

const MemberService = {
  findById: async ({ id }) => {
    const [member] = await MemberDAL.findById(sql, id)
    
    if (!member) {
      throw new NotFoundError('id', 'member id is not found')
    }

    return createMemberDTO(member)
  },

  isDataExist: async ({ id = null, field, value }) => {
    let result = false

    const [member] = field === 'email'
      ? await MemberDAL.findByEmail(sql, value)
      : field === 'phone'
        ? await MemberDAL.findByPhone(sql, value)
        : []

    if (id) {
      const diffMember = member && member.id != id
      if (diffMember) {
        result = true
      }
    } else if (member) {
      result = true
    }

    return result
  },

  getAllPaginated: async ({
    page, 
    limit, 
    orderBy,
    orderDir,
    search,
    searchFields = [],
    gender = 'all',
  }) => {
    const data = {
      page, 
      limit, 
      orderBy,
      orderDir,
      search,
      searchFields,
      gender,
    }

    const items = await MemberDAL.getAllPaginated(sql, data)
    const dataMapped = items.data.map((member) => createMemberDTO(member))

    return {
      data: dataMapped,
      meta: items.meta,
    }
  }, 

  save: async ({
    id = null,
    fullName,
    email,
    phone,
    address,
    birthDate,
    gender
  }) => {
    if (id !== null) {
      const memberFound = await isFound({id})
      if (!memberFound) {
        throw new NotFoundError('id', 'member id is not found.')
      }
    }

    const emailExist = await MemberService.isDataExist({ id, field: 'email', value: email })
    if (emailExist) {
      throw new BadRequestError('email', 'email is already in use.')
    }

    const phoneExist = await MemberService.isDataExist({ id, field: 'phone', value: phone })
    if (phoneExist) {
      throw new BadRequestError('phone', 'phone is already in use.')
    }

    const result = await sql.begin(async sql => {
      const data = { fullName, email, phone, address, birthDate, gender }

      const [savedData] = id === null
        ? await MemberDAL.create(sql, data)
        : await MemberDAL.update(sql, data, id)

      if (savedData === null) {
        throw new ActionFailedError('failed to save member data')
      }
  
      return createMemberDTO(savedData)
    })
    
    return result
  },

  exportToExcel: async () => {
    const members = await MemberDAL.getAllForExcel(sql)
    
    const dataMapped = members.map((member) => ({...member, gender: GENDER[member.gender]}))
    const fileBuffer = await generateMemberExcel({ members: dataMapped }) 

    return fileBuffer
  },
}

export default MemberService
