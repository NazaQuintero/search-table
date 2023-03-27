import { ColumnType } from "../../types"

export type TableRowsProps<T, K extends keyof T> = {
    data: Array<T>,
    columns: Array<ColumnType<T, K>>
}

export const TableRows = <T, K extends keyof T>({ data, columns }: TableRowsProps<T, K>): JSX.Element => {
    const rows = data.map( (row, rowIndex) => {
        return (
            <tr key={`row-${rowIndex}`}>
                {columns.map((col, colIndex) => {
                        return (
                            <td key={`col-${colIndex}`} className='table-cell'>
                                {row[col.key] as string}
                            </td>
                        )
                    })
                }
            </tr>
        )
    })

    return (
        <tbody>
            {rows}
        </tbody>
    )
}