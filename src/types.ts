export type LocalCommerceData = {
    id: string
}

export type StoresData = {
    data: CommerceData[]
    page: number,
    pages: number,
    rowsPerPage: number,
    total: number
}

export type CommerceData = {
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


export type SearchableFields = {
    id: boolean,
    comercio: boolean,
    cuit: boolean
}

export type FilterableFields = {
    activo: -1 | 0 | 1
}

export type FilterableFieldsType = { [propKey: string]: number };

export type SortableFieldsType = { [propKey: string]: number };

export type SortableFields = {
    comercio: -1 | 0 | 1,
    cuit: -1 | 0 | 1
}