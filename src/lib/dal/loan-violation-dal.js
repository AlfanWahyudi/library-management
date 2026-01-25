import 'server-only'

const tableName = 'loan_violations'


//TODO: get curr user
const tempUsername = 'superadmin1' // later change this

const findByQuery = async ({ sql, field, value }) => {
  return await sql`
    SELECT * FROM ${ sql(tableName) }
    WHERE ${ sql(field) } = ${value}
  `
}

const LoanViolationDAL = {
  findByViolationId: async (sql, violationId) => {
    if (typeof(violationId) !== 'number') throw new Error('violationId must be a number.')

    return await findByQuery({ sql, field: 'violation_id', value: violationId })
  },

  findByBookLoanId: async (sql, bookLoanId) => {
    if (typeof(bookLoanId) !== 'number') throw new Error('bookLoanId must be a number.')

    return await findByQuery({ sql, field: 'book_loan_id', value: bookLoanId })
  },
}

export default LoanViolationDAL


export {
  tableName
}