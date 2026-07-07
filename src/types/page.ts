export interface PageResponse<T> {
    items: T[],
    page: number,
    totalElements: number,
    totalPages: number,
    first: boolean,
    last: boolean
}