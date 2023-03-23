import { useState } from "react";
import { SearchableFields, SortableFieldsType } from "../types";
export const useCriteria = () => {

  const [filterableFields, setFilterableFields] = useState({
    activo: -1
  })

  const [sorting, setSorting] = useState<SortableFieldsType>({
    comercio: 0,
    cuit: 0
  })

  const [searchableFields, setSearchableFields] = useState<SearchableFields>({
    id: true,
    comercio: false,
    cuit: false
  })

  const [searchedText, setSearchedText] = useState("")

  const [shouldRefetch, setShouldRefetch] = useState(false)

  const [skipFrom, setSkipFrom] = useState(0)

  return {
    sorting,
    setSorting,
    searchableFields,
    setSearchableFields,
    searchedText,
    setSearchedText,
    shouldRefetch,
    setShouldRefetch,
    filterableFields,
    setFilterableFields,
    skipFrom,
    setSkipFrom
  };
};