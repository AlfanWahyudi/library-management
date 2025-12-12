import 'server-only'

import sql from '../config/db'
import { getPaginatedList } from '@/lib/utils/datatable'
import { createMember } from '../models/member-model'

const tableName = 'members'

//TODO: get curr user
const tempUsername = 'superadmin1' // 


const MemberDAL = {
  getAllPaginated: async ({ 
    page = 0, 
    limit = 10, 
    orderBy = 'updated_at',
    orderDir = 'desc',
    search = '',
    searchFields = [],
    gender = 'all',
  }) => {
    const filterQueries = []

    if (gender !== 'all') {
      filterQueries.push(sql`${sql('gender')} = ${gender}`)
    }

    const paginatedItems = await getPaginatedList({
      page,
      limit,
      orderBy,
      orderDir,
      search,
      searchFields,
      tableName,
      filterQueries
    })

    paginatedItems.data = paginatedItems.data.map((item) => createMember({...item}))

    return paginatedItems
  },
}

export default MemberDAL

export {
  tableName,
}