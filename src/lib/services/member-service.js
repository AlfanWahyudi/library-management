import 'server-only'

import MemberDAL from '../dal/member-dal'
import { createMemberDTO } from '../dto/member-dto'
import { NotFoundError } from '../errors/not-found-error'

const isFound = async ({ id }) => {
  return await MemberDAL.findById({id}) !== null
}

const MemberService = {
  findById: async ({ id }) => {
    const member = await MemberDAL.findById({ id })
    
    if (member === null) {
      throw new NotFoundError('id', 'member id is not found')
    }

    return createMemberDTO(member)
  },

  isDataExist: async ({ id = null, field, value }) => {
    let result = false

    let member = null
    switch (field) {
      case 'email':
        member = await MemberDAL.findByEmail({ email: value })
        break;
      case 'phone':
        member = await MemberDAL.findByPhone({ phone: value })
        break;
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

    const items = await MemberDAL.getAllPaginated({ page, limit, orderBy, orderDir, search, searchFields, gender})
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

    const member = await MemberDAL.save({ id, fullName, email, phone, address, birthDate, gender })
    if (member === null) {
      throw new Error('failed to save member data')
    }

    return createMemberDTO(member)
  },
}

export default MemberService
