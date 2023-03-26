import { useEffect, useReducer } from "react"
import { fetchMockedData } from "../util/fetchMock";

type FetchingActionType =
| { type: "fetch" }
| { type: "data"; data: object }
| { type: "error", error: Error };

type FetchingState = {
    loading: boolean,
    data?: any,
    error?: string
}

const fetchReducer = (state: FetchingState, action: FetchingActionType) : FetchingState => {
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

export const useDataFetch = (url: string) => {

    const [fetchingState, dispatch] = useReducer(fetchReducer, { loading: true, data: {}})
    
    useEffect(() => {
        let unsubscribed = false;
        const fetchStoresData = async () => {
            dispatch( { type: "fetch" } );

            fetchMockedData(url)
            .then(data => {
                if (!unsubscribed) {
                    dispatch( { type: "data", data } )
                }
            })
            .catch(e => dispatch( {
                type: "error",
                error: new Error(`Error while trying to fetch data from: '${url}'. ${e.message}`)
            } 
            ));
        }
        fetchStoresData();

        return () => {
            unsubscribed = true;
            console.log('Unsubscribed!');
        }
    }, [url])

    return {
        loading: fetchingState.loading,
        data: fetchingState.data.data,
        error: fetchingState.error
    }
}