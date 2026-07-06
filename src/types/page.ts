export interface PageResponse<T> {
    items: T[],
    page: number,
    totalElements: number,
    totalPage: number,
    first: boolean,
    last: boolean
}