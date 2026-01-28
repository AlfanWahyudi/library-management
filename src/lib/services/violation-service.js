import 'server-only'

import sql from '../config/db'
import { NotFoundError } from '../errors/not-found-error'
import ViolationDAL from '../dal/violation-dal'
import { createViolationDTO } from '../dto/violation-dto'
import LoanViolationDAL from '../dal/loan-violation-dal'
import { ActionFailedError } from '../errors/action-failed-error'
import { BadRequestError } from '../errors/bad-request-error'

const isFound = async ({ id }) => {
  const [violation] = await ViolationDAL.findById(sql, id)
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
    levels = []
  }) => {
    const data = {
      page, 
      limit, 
      orderBy,
      orderDir,
      search,
      searchFields,
      levels
    }

    const items = await ViolationDAL.getAllPaginated(sql, data)
    const dataMapped = items.data.map((violation) => createViolationDTO(violation))

    return {
      data: dataMapped,
      meta: items.meta,
    }
  },

  save: async ({
    id = null,
    title,
    level,
    description,
  }) => {
    if (id !== null) {
      const found = await isFound({id})
      if (!found) {
        throw new NotFoundError('id', 'violation id is not found.')
      }
    }

    const savedData = await sql.begin(async sql => {
      const data = { title, level, description }

      const [savedData] = id === null
        ? await ViolationDAL.create(sql, data)
        : await ViolationDAL.update(sql, data, id)

      return savedData
    })

    if (!savedData) {
      throw new ActionFailedError('failed to save violation data')
    }

    return createViolationDTO(savedData)
  },

  isIncludeOnLoanViolation: async ({ violationId }) => {
    const items = await LoanViolationDAL.findByViolationId(sql, violationId)
    return items.length > 0
  },

  canDataDeleted: async ({ id }) => {
    let result = true

    const found = await isFound({id})
    if (!found) {
      throw new NotFoundError('id', 'violation id is not found.')
    }

    const isOnLoanViolation = await ViolationService.isIncludeOnLoanViolation({ violationId: id })
    if (isOnLoanViolation) {
      result = false
    }

    return result
  },

  delete: async ({ id }) => {
    const found = await isFound({id})
    if (!found) {
      throw new NotFoundError('id', 'violation id is not found.')
    }

    const dataCanDelete = await ViolationService.canDataDeleted({ id })
    if (!dataCanDelete) {
      throw new BadRequestError('violation_id','Failed delete: violation data is already used in loan violation')
    }

    const deletedData = await sql.begin(async (sql) => {
      const [deletedData] = await ViolationDAL.delete(sql, id)

      return deletedData
    })

    if (!deletedData) {
      throw new ActionFailedError('failed to delete violation data')
    }

    return createViolationDTO(deletedData)
  },

  restore: async ({ id }) =>{
    const found = await isFound({id})
    if (found) {
      throw new BadRequestError('id', `violation data is not deleted, id: ${id}`)
    }

    const restoredData = await sql.begin(async (sql) => {
      const [restoredData] = await ViolationDAL.restore(sql, id)

      return restoredData
    })

    if (!restoredData) {
      throw new ActionFailedError('failed to restore violation data')
    }
    
    return createViolationDTO(restoredData)
  }
}

export default ViolationService
