import { FilterableFieldsType, SearchableFields } from "../types"

export type FiltersType = {
    searchableFields: SearchableFields,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    filterableFields: FilterableFieldsType,
    handleFilterChange: (e: any) => void
}

export const Filters = (props: FiltersType) => {
    return (
        <div>
            <form>
                <label>
                    <input type="checkbox" name={'id'} id={'id'} checked={props.searchableFields.id} onChange={props.handleChange}/>
                    <span>{'id'}</span>
                </label>

                <label>
                    <input type="checkbox" name={'comercio'} id={'comercio'} checked={props.searchableFields.comercio} onChange={props.handleChange}/>
                    <span>{'comercio'}</span>
                </label>

                <label>
                    <input type="checkbox" name={'cuit'} id={'cuit'} checked={props.searchableFields.cuit} onChange={props.handleChange}/>
                    <span>{'cuit'}</span>
                </label>
            </form>

            <label>
                Filtro:
                <select name="selectedFilter" onChange={props.handleFilterChange}>
                    <option value={-1}>Sin Filtro</option>
                    <option value={1}>Activo</option>
                    <option value={0}>No Activo</option>
                </select>
            </label>
        </div>
    )
}