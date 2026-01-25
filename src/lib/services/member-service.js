import 'server-only'

import sql from '../config/db'
import MemberDAL from '../dal/member-dal'
import { createMemberDTO } from '../dto/member-dto'
import { NotFoundError } from '../errors/not-found-error'
import { ActionFailedError } from '../errors/action-failed-error'

const isFound = async ({ id }) => {
  const [member] = MemberDAL.findById(sql, id)

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

    if (!member) {
      throw new NotFoundError(field, `${field} of member is not found`)
    }

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
      throw new NotFoundError('email', 'email is already in use.')
    }

    const phoneExist = await MemberService.isDataExist({ id, field: 'phone', value: phone })
    if (phoneExist) {
      throw new NotFoundError('phone', 'phone is already in use.')
    }

    const savedData = await sql.begin(async sql => {
      const data = { fullName, email, phone, address, birthDate, gender }

      const [savedData] = id === null
        ? await MemberDAL.create(sql, data)
        : await MemberDAL.update(sql, data, id)

      return savedData
    })

    if (savedData === null) {
      throw new ActionFailedError('failed to save member data')
    }

    return createMemberDTO(savedData)
  },
}

export default MemberService
