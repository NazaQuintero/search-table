
export type StoresData = {
    data: CommerceData[]
    page: number,
    pages: number,
    rowsPerPage: number,
    total: number
}

export type ColumnType<T, K extends keyof T> = {
    key: K,
    header: string,
    searchable: boolean,
    filterable: boolean,
    sortable: boolean
}

export interface CommerceData {
    id: string,
    comercio: string,
    cuit: string,
    concepto1: number,
    concepto2: number,
    concepto3: number,
    concepto4: number,
    balanceActual: number,
    activo: number,
    ultimaVenta: string,
}

export type SearchableFieldsType = { [propKey: string]: boolean };

export type FilterableFieldsType = { [propKey: string]: number };

export type SortableFieldsType = { [propKey: string]: number };

export enum SortingActionTypes {
    UNSET = 'UNSET',
    ASCENDING = 'ASCENDING',
    DESCENDING = 'UNLIKED'
}

export type SortingPayload = {
    sorting: SortableFieldsType,
    sortingKey: string
}

export type SortingActions = {
    type: SortingActionTypes;
    payload: SortingPayload
}