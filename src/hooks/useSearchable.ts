import { useState } from "react"
import { SearchableFieldsType } from "../types"

export const useSearchable = (initialValue: SearchableFieldsType) => {

    const [searchableFieldsState, setSearchableFields] = useState(initialValue);

    const handleSearchableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchableFields( prevState => ({
            ...prevState,
            [e.target.name]: e.target.checked
        }))
    }

    return {
        searchableFieldsState,
        handleSearchableChange
    }
}