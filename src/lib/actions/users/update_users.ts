"use server"

import { prisma, toJSON } from "@utils"

import { Nid } from "@types"

import { UserFormValidation } from "@validation"

export async function updateUser(
  nid: Nid,
  userForm: UserFormValidation
) {
  try {
    const updatedUser = await prisma.user.update({
      where: { nanoid: nid },
      data: userForm,
    })

    return toJSON(updatedUser)
  } catch (e) {
    console.error(e)
  }
}
