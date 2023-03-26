import { useEffect, useState } from "react";
import { FilterableFieldsType, SearchableFieldsType, SortableFieldsType } from "../types";

import { getUrl } from '../util/uriBuilder'

export const useCommerceDataRefetch = (baseUrl: string, searchedText: string, sortableFields: SortableFieldsType, filterableFields: FilterableFieldsType, searchableFields: SearchableFieldsType, skipFrom: number) => {
    const [urlWithParams, setUrlWithParams] = useState("");
  
    useEffect(() => {
        const result = getUrl(baseUrl, searchedText, filterableFields, searchableFields, sortableFields, skipFrom);
        setUrlWithParams(result);

        // console.log('Url with Params: ', result);
        
    }, [baseUrl, searchedText, filterableFields, searchableFields, sortableFields, filterableFields, skipFrom, urlWithParams]);
  
    return {
        urlWithParams,
    };
  };
