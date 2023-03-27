import { useMemo } from "react";
import './cell.css'
import { ColumnType, FilterableFieldsType, FilteringPayload, SearchableFieldsType, SortableFieldsType, SortingPayload } from "../../types";

export type TableCellProps<T, K extends keyof T> = {
    column: ColumnType<T, K>,
    sortableFields: SortableFieldsType,
    filterableFields: FilterableFieldsType,
    setFilteringValue: (payload: FilteringPayload) => void,
    searchableFields: SearchableFieldsType,
    handleSearchableChange: (e: any) => void,
    setAscendingSort : (payload: SortingPayload) => void
    setDescendingSort : (payload: SortingPayload) => void
    unsetSort : (payload: SortingPayload) => void
}

export const TableCell = <T, K extends keyof T>(props: TableCellProps<T,K>) => {
    const {
        column,
        sortableFields,
        setAscendingSort,
        setDescendingSort,
        unsetSort,
        searchableFields,
        handleSearchableChange,
        filterableFields,
        setFilteringValue: handleFilterChange
    } = props;

    const sortableIcon = useMemo(() => {

        const propName = column.key as string;
        const sortOrder = sortableFields[propName];
        const payload = { sorting: sortableFields, sortingKey: propName };

        switch (sortOrder) {
            case 0:
                return <span className="sort-icon" onClick={() => setAscendingSort(payload)}>⇅</span>
            case 1:
                return <span className="sort-icon" onClick={() => setDescendingSort(payload)}>↑</span>
            case -1:
                return <span className="sort-icon" onClick={() => unsetSort(payload)}>↓</span>
            default:
                return <></>;
        }
    }, [column, sortableFields, setAscendingSort, setDescendingSort, unsetSort])

    const searchableCheckbox = useMemo(() => {
        if (column.searchable === true) {
            const propName = column.key as string
            return (
                <label>
                    <input className="searchable-item" type="checkbox" name={propName} id={propName} checked={searchableFields[propName]} onChange={handleSearchableChange}/>
                    ᗊ
                </label>
            )
        } 
        return <></>
    }, [column, searchableFields, handleSearchableChange])

    const filterableSelect = useMemo(() => {
        if(column.filterable === true) {
            const propName = column.key as string

            const payload = {filtering: filterableFields, filteringKey: propName}

            return (
                <select name={propName} onChange={(e) => handleFilterChange({...payload, value: e.target.value})}>
                    <option value={-1}></option>
                    <option value={1}>1</option>
                    <option value={0}>0</option>
                </select>
            )
        }
        return <></>
    }, [column, filterableFields, handleFilterChange])

    return (
        <th key={column.header} className='table-cell'>
            {sortableIcon}
            {column.header}
            {searchableCheckbox}
            {filterableSelect}
        </th>
    )
}