export type PaginationQuery<T extends object = {}> = T & { page: number }

export type Numeric = string | number
export type Booleanic = '0' | '1' | 0 | 1