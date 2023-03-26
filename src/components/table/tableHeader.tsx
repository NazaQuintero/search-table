import { ColumnType, SortableFieldsType, SortingPayload } from "../../types"
import { TableCell } from "./cell"

export type TableHeaderProps<T, K extends keyof T> = {
    columns: Array<ColumnType<T, K>>,
    sorting: SortableFieldsType,
    setAscendingSort : (payload: SortingPayload) => void
    setDescendingSort : (payload: SortingPayload) => void
    unsetSort : (payload: SortingPayload) => void
}

export const TableHeader = <T, K extends keyof T>( { columns, sorting, setAscendingSort, setDescendingSort, unsetSort } : TableHeaderProps<T, K>) => {

    const headerCells = columns.map( (column, index) => {
            return (
                <TableCell key={`headCell-${index}`} column={column} sorting={sorting} setAscendingSort={setAscendingSort} setDescendingSort={setDescendingSort} unsetSort={unsetSort} />
            )
        })

    return (
        <thead>
            <tr>{headerCells}</tr>
        </thead>
    )
}