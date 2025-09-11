'use server'

import { revalidatePath } from "next/cache"
import routeConst from "@/lib/constants/route-const"

const saveAuthor = async (prevState, formData) => {
  //TODO: validate serverside
  //TODO: save author data
  //TODO: role permission
  const fullName = formData.get('fullName')
  const nationality = formData.get('nationality')
  const activeSince = formData.get('activeSince')
  const about = formData.get('about')

  console.log(fullName, nationality, activeSince, about)

  revalidatePath(routeConst.authors.url) // show the updated data
}

const removeAuthor = async (prevState, formData) => {
  //TODO: role permission

  const id = formData.get('id')
  console.log(id)

  // return {id}

  revalidatePath(routeConst.authors.url)
}

export {
  saveAuthor,
  removeAuthor
}