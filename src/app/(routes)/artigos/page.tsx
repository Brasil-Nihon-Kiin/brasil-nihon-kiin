"use client"

import { PlusIcon } from "@heroicons/react/24/solid"

import { LoadingState } from "@types"

import { useArticles } from "@hooks"

import {
  ArticleEditor,
  ArticlesList,
  Dialog,
  Progress,
  showDialog,
} from "@components"

export default function ArticlesView() {
  const { articles, loadingState } = useArticles()

  if (loadingState === LoadingState.Loading) {
    return <Progress />
  }

  const articleEditorDialogId = "article-editor-dialog"

  return (
    <div>
      <div className="flex gap-4 items-center justify-between mb-4">
        <h1 className="text-xl font-semibold items-center ml-5">
          Artigos
        </h1>
        <button
          className="btn btn-outline btn-success w-max"
          onClick={() => showDialog(articleEditorDialogId)}
        >
          <PlusIcon className="h-5 w-5" />
          Criar Artigo
        </button>
      </div>
      <Dialog dialogId={articleEditorDialogId}>
        <ArticleEditor />
      </Dialog>

      {articles ? (
        <ArticlesList articles={articles} width="80vw" />
      ) : null}
    </div>
  )
}
