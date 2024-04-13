import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ArticleWithCreator } from "@types"

import {
  ArticleFormValidation,
  articleFormSchema,
} from "@validation"

import { postArticle, updateArticle } from "@actions"

import { useClerkUser } from "@hooks"

import {
  Checkbox,
  TextArea,
  TextField,
  TextFieldTypes,
} from "../common/exports"

type ArticleEditorProps = {
  article?: ArticleWithCreator
}

export function ArticleEditor({
  article,
}: ArticleEditorProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormValidation>({
    resolver: zodResolver(articleFormSchema),
  })

  const { user } = useClerkUser()

  async function onSubmit(newData: ArticleFormValidation) {
    try {
      console.log(newData)

      article
        ? await updateArticle(
            article.nanoid,
            newData.title,
            newData.content,
            newData.isDraft,
            newData.thumbnailLink
          )
        : await postArticle(
            user!.id,
            newData.title,
            newData.content,
            newData.isDraft,
            newData.thumbnailLink
          )
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="flex flex-col gap-5 p-2 justify-items-end">
      <h2 className="font-medium text-2xl pl-1">
        Crie um Novo Artigo
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 justify-items-end gap-4"
      >
        <TextField<ArticleFormValidation>
          errors={errors}
          register={register}
          field="title"
          label="Título"
          placeholder="Um Artigo Sensacional"
        />
        <TextArea<ArticleFormValidation>
          errors={errors}
          register={register}
          colSpan="full"
          field="abstract"
          label="Resumo"
          placeholder="Resumindo..."
        />
        <TextArea<ArticleFormValidation>
          errors={errors}
          register={register}
          colSpan="full"
          field="content"
          label="Conteúdo"
          placeholder="Era uma vez..."
        />
        <TextField<ArticleFormValidation>
          errors={errors}
          register={register}
          field="thumbnailLink"
          label="Título"
          type={TextFieldTypes.Url}
          placeholder="https://imgur.com/..."
        />
        <Checkbox<ArticleFormValidation>
          errors={errors}
          register={register}
          field="isDraft"
          label="Rascunho?"
        />

        <button
          className="btn w-max"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <span className="loading loading-spinner"></span>
          )}
          Criar Artigo
        </button>
      </form>
    </section>
  )
}
