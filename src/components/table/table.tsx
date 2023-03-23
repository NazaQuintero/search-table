import { LocalCommerceData, SortableFieldsType } from '../../types'
import { Header } from './header'
import './table.css'

type ContentProps = {
    entries: LocalCommerceData[]
}

const Content = (props: ContentProps) => {
    return (
        <tbody>
            { props.entries.map( (data) => (
                <tr key={data.id}>
                    {Object.entries(data).map( itemProp => <td key={itemProp[0]} className='table-cell'>{itemProp[1].toString()}</td> )}
                </tr>
            ))}
        </tbody>
    )
}

type TableProps = {
    sorting: SortableFieldsType,
    setSorting: (sorting: SortableFieldsType) => void,
    columnNames: string[],
    entries: LocalCommerceData[]
}
export const Table = (props: TableProps) => {
    return (
        <div>
            <table className='table'>
                <Header columnNames={props.columnNames} sorting={props.sorting} setSorting={props.setSorting}/>
                <Content entries={props.entries} />
            </table>
        </div>
    )
}