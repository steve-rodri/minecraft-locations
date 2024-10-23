export type PayloadDocResponse<T> = {
  docs: T[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: unknown | null
  page: number
  pagingCounter: number
  prevPage: number | null
  totalDocs: number
  totalPages: number
}

export type PayloadMutationResponse<T> = {
  doc: T
  message: string
}
