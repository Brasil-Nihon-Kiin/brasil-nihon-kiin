import { ReactChildren, StringId } from "@types"

export function getDialog(dialogId: StringId) {
  return document.getElementById(
    dialogId
  ) as HTMLDialogElement
}

export function showDialog(dialogId: StringId) {
  const dialog = getDialog(dialogId)

  dialog.showModal()
}

export function hideModal(dialogId: StringId) {
  const dialog = document.getElementById(
    dialogId
  ) as HTMLDialogElement

  dialog.close()
}

type DialogProps = ReactChildren & {
  dialogId: StringId
}

export function Dialog({
  children,
  dialogId,
}: DialogProps) {
  return (
    <dialog id={dialogId} className="modal">
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}
