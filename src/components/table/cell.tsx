import { useMemo } from "react";
import { ColumnType, SortableFieldsType, SortingPayload } from "../../types";

export type TableCellProps<T, K extends keyof T> = {
    column: ColumnType<T, K>,
    sorting: SortableFieldsType,
    setAscendingSort : (payload: SortingPayload) => void
    setDescendingSort : (payload: SortingPayload) => void
    unsetSort : (payload: SortingPayload) => void
}

export const TableCell = <T, K extends keyof T>(props: TableCellProps<T,K>) => {
    const {
        column,
        sorting,
        setAscendingSort,
        setDescendingSort,
        unsetSort
    } = props;

    const sortableIcon = useMemo(() => {

        const propName = column.key as string;
        const sortOrder = sorting[propName];
        const payload = { sorting: sorting, sortingKey: propName };

        switch (sortOrder) {
            case 0:
                return <span onClick={() => setAscendingSort(payload)}>⇅</span>
            case 1:
                return <span onClick={() => setDescendingSort(payload)}>↑</span>
            case -1:
                return <span onClick={() => unsetSort(payload)}>↓</span>
            default:
                return <></>;
        }
    }, [column, sorting, setAscendingSort, setDescendingSort, unsetSort])

    return (
        <th key={props.column.header} className='table-cell'>
            {sortableIcon}
            {props.column.header}
        </th>
    )
}