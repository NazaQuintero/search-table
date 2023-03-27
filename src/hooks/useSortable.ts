import { useReducer } from "react"
import { SortableFieldsType, SortingActions, SortingActionTypes, SortingPayload } from "../types"


export const useSortable = (initialValue: SortableFieldsType) => {
    
    const reducer = (state: SortableFieldsType, action: SortingActions) => {
        const {type, payload} = action;
        switch (type) {
            case SortingActionTypes.UNSET:
                return { 
                    ...state,
                    [payload.sortingKey]: 0
                };
            case SortingActionTypes.ASCENDING:
                return {
                    ...state,
                    [payload.sortingKey]: 1
                };
            case SortingActionTypes.DESCENDING:
                return {
                    ...state,
                    [payload.sortingKey]: -1
                }
            default:
                throw Error('Unknown action.');
        }
    }

    const [sortableFieldsState, dispatch] = useReducer(reducer, initialValue)

    const setAscendingSort = (payload: SortingPayload) => dispatch({type: SortingActionTypes.ASCENDING, payload })
    const setDescendingSort = (payload: SortingPayload) => dispatch({type: SortingActionTypes.DESCENDING, payload })
    const unsetSort = (payload: SortingPayload) => dispatch({type: SortingActionTypes.UNSET, payload })

    return {
        sortableFieldsState,
        setAscendingSort,
        setDescendingSort,
        unsetSort
    }
}