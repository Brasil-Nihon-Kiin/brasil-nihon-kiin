"use server"

import { prisma, toJSON } from "@utils"

import { Nanoid } from "@types"

import { UserFormValidation } from "@validation"

export async function updateUser(
  nid: Nanoid,
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
