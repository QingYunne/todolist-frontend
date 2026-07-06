export interface Todo {
    id: number,
    title: string,
    description: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string
}

export interface TodoRequest {
    title: string,
    description?: string,
    completed: boolean
}

export type TodoSortBy =
    | "createdAt"
    | "updatedAt"
    | "title";

export type SortDirection = "asc" | "desc";

export interface TodoSearchParams {
     keyword?: string;
    completed?: boolean;
    page?: number;
    size?: number;
    sortBy?: TodoSortBy;
    direction?: SortDirection;
}

