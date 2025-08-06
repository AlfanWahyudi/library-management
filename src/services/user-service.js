import UserDAL from '@/dal/user-dal'
import 'server-only'

export default UserService = {
  verify: async (username) => {
    const user = await UserDAL.getByUsername(username)
    
    if (user) {

    }
  }
}