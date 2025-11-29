import ContentHead from "@/components/specific/content-head";
import UserProfileBreadcrumb from "@/components/specific/user-profiles/breadcrumb";
import UserProfileForm from "@/components/specific/user-profiles/form";
import SessionDAL from "@/lib/dal/session-dal";
import UserService from "@/lib/services/user-service";

export default async function userProfilePage() {
  const session = await SessionDAL.verify()

  if (!session.isAuth) {
    //todo display error message 
  }

  const user = await UserService.getById(session.userId)
  console.log(user)

  return (
    <section className="">
      <UserProfileBreadcrumb />
      <h1 className="sr-only">User Profile Page</h1>
      <ContentHead pageTitle='Profile'>
      </ContentHead>

      <UserProfileForm 
        username={user.username} 
        fullName={user.fullName}
        gender={user.gender}
        address={user.address}
        email={user.email}
      />
    </section>
  )
}