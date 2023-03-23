import { useCallback, useMemo } from "react";
import { SortableFieldsType } from "../../types";

export type CellProps = {
    column: string,
    sorting: SortableFieldsType,
    setSorting: (sorting: SortableFieldsType) => void
}

export const Cell = (props: CellProps) => {
    const {column, sorting, setSorting} = props;

    const setSortingValue = useCallback((sortingValue: 0 | -1 | 1) => {
        const updatedSorting = {...sorting}
        updatedSorting[column] = sortingValue;
        setSorting(updatedSorting);
    }, [column, sorting, setSorting])

    const setAscending = useCallback(() => setSortingValue(1), [setSortingValue])
    const setDescending = useCallback(() => setSortingValue(-1), [setSortingValue])
    const setDefaultOrder = useCallback(() => setSortingValue(0), [setSortingValue])

    const sortableIcon = useMemo(() => {
        const sortOrder = sorting[column];
        switch (sortOrder) {
            case 0:
                return <span onClick={setAscending}>⇅</span>
            case 1:
                return <span onClick={setDescending}>↑</span>
            case -1:
                return <span onClick={setDefaultOrder}>↓</span>
            default:
                return <></>;
        }
    }, [column, sorting, setAscending, setDescending, setDefaultOrder])

    return (
        <th key={props.column} className='table-cell'>
            {sortableIcon}
            {props.column.toUpperCase()}
        </th>
    )
}