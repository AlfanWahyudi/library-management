import sql from "@/lib/config/db"

const UserRoleDAL = {
  //TODO: jangan menampilkan data yang telah di softdeleted
  getById: async ({ userId }) => {

    const data = await sql`
      select 
        u.id as user_id,
        u.username,
        u.email,
        u.full_name,
        u.gender,
        u.address,
        u.created_at as user_created_at,
        u.updated_at as user_updated_at,
        r.code as role_code,
        r.name as role_name,
        ur.created_at as user_role_created_at,
        ur.updated_at as user_role_updated_at
      from users u 
      join user_roles ur on u.id = ur.user_id 
      join roles r on ur.role_code = r.code
      where u.id = ${userId}
    `
    return data.map((item) => {
      return {
        user: {
          id: item.user_id,
          username: item.username,
          email: item.email,
          fullName: item.full_name,
          gender: item.gender,
          address: item.address,
          createdAt: item.user_created_at,
          updatedAt: item.user_updated_at
        },
        role: {
          code: item.role_code,
          name: item.name
        },
        createdAt: item.user_role_created_at,
        updatedAt: item.user_role_updated_at
      }
    })
  }
}

export default UserRoleDAL
