import { useReducer } from "react";
import { FilterableFieldsType, FilteringActions, FilteringActionTypes, FilteringPayload } from "../types";

export const useFilterable = (initialValue: FilterableFieldsType) => {

  const reducer = (state: FilterableFieldsType, action: FilteringActions) => {
    const {type, payload} = action;
    switch (type) {
        case FilteringActionTypes.UNSET:
            return { 
                ...state,
                [payload.filteringKey]: null
            };
        case FilteringActionTypes.SET:
            return {
                ...state,
                [payload.filteringKey]: payload.value
            };
        default:
            throw Error('Unknown action.');
    }
  }

  const [filterableFields, dispatch] = useReducer(reducer, initialValue)

  const setFilteringValue = (payload: FilteringPayload) => dispatch({type: FilteringActionTypes.SET, payload })

  return {
    filterableFields,
    setFilteringValue
  };
};