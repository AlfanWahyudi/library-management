import 'server-only'
import MemberDAL from '../dal/member-dal'
import { createMemberDTO } from '../dto/member-dto'


const MemberService = {
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
}

export default MemberService
