import ContentHead from "@/components/specific/content-head";
import UserProfileBreadcrumb from "@/components/specific/user-profiles/breadcrumb";
import UserProfileForm from "@/components/specific/user-profiles/form";
import SessionDAL from "@/lib/dal/session-dal";
import UserService from "@/lib/services/user-service";
import ChangeUsernameSheet from "../../../components/specific/user-profiles/change-username/sheet";
import { Separator } from "@/components/ui/separator";
import InfoTimestamp from "@/components/common/info-timestamp";
import Auth from "@/lib/auth/auth";
import UserPerm from "@/lib/auth/permission/user-perm";

export default async function userProfilePage() {
  const auth = await Auth.validateSession()
  const session = auth.getSession()

  const userPerm = await UserPerm.validation(session)
    .validateUpdateOwnUsername()
    .validateUpdateOwnUser()
    .exec()

  const user = await UserService.getById(session.userId)

  return (
    <section className="">
      <UserProfileBreadcrumb />
      <h1 className="sr-only">User Profile Page</h1>
      <ContentHead pageTitle='Profile'>
        {userPerm.canUpdateOwnUsername && (<ChangeUsernameSheet username={user.username} />)}
      </ContentHead>
      <section className="flex flex-col gap-3 pt-2">
        <InfoTimestamp createdAt={user.createdAt} updatedAt={user.updatedAt} />
        <Separator className="mb-3" />
        <UserProfileForm user={user} />
      </section>
    </section>
  )
}