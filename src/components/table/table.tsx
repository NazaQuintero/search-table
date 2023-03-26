import { ColumnType, SortableFieldsType, SortingPayload } from '../../types'
import { TableHeader } from './tableHeader'
import { TableRows } from './tableRows'
import './table.css'

type TableProps<T, K extends keyof T> = {
    data: Array<T>,
    columns: Array<ColumnType<T, K>>,
    sorting: SortableFieldsType,
    setAscendingSort : (payload: SortingPayload) => void
    setDescendingSort : (payload: SortingPayload) => void
    unsetSort : (payload: SortingPayload) => void
}

export const Table = <T, K extends keyof T>(props: TableProps<T,K>) => {
    const { data, columns, sorting, setAscendingSort, setDescendingSort, unsetSort} = props;
    return (
        <div>
            <table className='table'>
                <TableHeader columns={columns} sorting={sorting} setAscendingSort={setAscendingSort} setDescendingSort={setDescendingSort} unsetSort={unsetSort} />
                <TableRows data={data} columns={columns} />
            </table>
        </div>
    )
}