import { SortableFieldsType } from "../../types"
import { Cell } from "./cell"

export type HeaderProps = {
    columnNames: string[],
    sorting: SortableFieldsType,
    setSorting: (sorting: SortableFieldsType) => void
}

export const Header = (props: HeaderProps) => {
    return (
        <thead>
            <tr>
                {
                    props.columnNames.map( column => <Cell key={column} column={column} sorting={props.sorting} setSorting={props.setSorting} />)
                }
            </tr>
        </thead>
    )
}