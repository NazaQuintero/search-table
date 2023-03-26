import { useState } from "react";
import { FilterableFieldsType } from "../types";

export const useFilterable = (initialValue: FilterableFieldsType) => {

  const [filterableFields, setFilterableFields] = useState(initialValue)

  const handleFilterChange = (e: any) => {
    setFilterableFields(prevState => ({...prevState, activo: e.target.value}));
  }

  return {
    filterableFields,
    handleFilterChange,
  };
};