import { ColumnType, FilterableFieldsType, FilteringPayload, SearchableFieldsType, SortableFieldsType, SortingPayload } from "../../types"
import { TableCell } from "./cell"

export type TableHeaderProps<T, K extends keyof T> = {
    columns: Array<ColumnType<T, K>>,
    sorting: SortableFieldsType,
    filterableFields: FilterableFieldsType,
    setFilteringValue: (payload: FilteringPayload) => void,
    searchableFields: SearchableFieldsType,
    handleSearchableChange: (e: any) => void,
    setAscendingSort : (payload: SortingPayload) => void
    setDescendingSort : (payload: SortingPayload) => void
    unsetSort : (payload: SortingPayload) => void
}

export const TableHeader = <T, K extends keyof T>( props : TableHeaderProps<T, K>) => {

    const { 
        columns,
        sorting,
        filterableFields,
        setFilteringValue,
        searchableFields,
        handleSearchableChange,
        setAscendingSort,
        setDescendingSort,
        unsetSort
    } = props;

    const headerCells = columns.map( (column, index) => {
            return (
                <TableCell 
                    key={`headCell-${index}`}
                    column={column}
                    sortableFields={sorting}
                    filterableFields={filterableFields}
                    setFilteringValue={setFilteringValue}
                    searchableFields={searchableFields}
                    handleSearchableChange={handleSearchableChange}
                    setAscendingSort={setAscendingSort}
                    setDescendingSort={setDescendingSort}
                    unsetSort={unsetSort}
                />
            )
        })

    return (
        <thead>
            <tr>{headerCells}</tr>
        </thead>
    )
}