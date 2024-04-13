import { z } from "zod"

export const articleFormSchema = z.object({
  title: z.string().min(1, "É preciso um título"),
  content: z.string().min(1, "É preciso conteúdo"),
  abstract: z.string().optional().nullish(),
  thumbnailLink: z.string().optional().nullish(),
  isDraft: z.boolean().default(false),
})

export type ArticleFormValidation = z.infer<
  typeof articleFormSchema
>
