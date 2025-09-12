'use server'

import { revalidatePath } from "next/cache"
import routeConst from "@/lib/constants/route-const"
import AuthorService from "@/lib/services/author-service"

const saveAuthor = async (prevState, formData) => {
  //TODO: validate serverside
  //TODO: role permission
  const fullName = formData.get('fullName')
  const countryCode = formData.get('countryCode')
  const activeSince = formData.get('activeSince').trim() === '' 
    ? null 
    : parseInt(formData.get('activeSince'))

  const about = formData.get('about').trim() === '' 
    ? null 
    : formData.get('about')

  console.log('-- start - save author action --')
  console.log(fullName, countryCode, activeSince, about)
  console.log('-- end - save author action --')

  const author = await AuthorService.create({ fullName, countryCode, activeSince, about })

  console.log('--- new author data that has been added ---')
  console.log(author)

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