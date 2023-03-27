import { useEffect, useReducer } from "react"
import { FetchMock } from "../util/fetchMock";

type FetchingActionType<T> =
| { type: "fetch" }
| { type: "data"; data: T }
| { type: "error", error: Error };

type FetchingState<T> = {
    loading: boolean,
    data?: T,
    error?: string
}

const fetchReducer = <T>(state: FetchingState<T>, action: FetchingActionType<T>) : FetchingState<T> => {
    switch (action.type) {
        case "fetch":
            return { ...state, loading: true }

        case "data":
            return { ...state, loading: false, data: action.data }

        case "error":
            return { ...state, loading: false, error: action.error.message }

        default:
            return state
    }

}

export const useDataFetch = <T>(url: string, page: number) => {

    const [fetchingState, dispatch] = useReducer(fetchReducer, { loading: true, data: {}})
    console.info('Url: ', url);
    
    useEffect(() => {
        const fetchStoresData = async () => {
            dispatch( { type: "fetch" } );

            FetchMock.getInstance().fetchMockedData(url, page)
            .then(data => dispatch( { type: "data", data } ))
            .catch(e => dispatch(
                    {
                        type: "error",
                        error: new Error(`Error while trying to fetch data from: '${url}'. ${e.message}`)
                    } 
                )
            );
        }
        fetchStoresData();

        return () => {
            console.log('Unsubscribed!');
        }
    }, [url, page])

    return {
        loading: fetchingState.loading,
        storeData: fetchingState.data as T,
        error: fetchingState.error
    }
}