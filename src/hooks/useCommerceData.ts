import { useEffect, useState } from "react";
import { LocalCommerceData, StoresData } from "../types";

import MockedData from '../db.json'
import { useCriteria } from "./useCriteria";
import { getUrl } from '../util/uriBuilder'

export const useCommerceData = () => {
    const [commerceData, setCommerceData] = useState<LocalCommerceData[]>([]);
    const [columnNames, setColumnNames] = useState<string[]>([]);

    const { 
        sorting,
        setSorting,
        searchableFields,
        setSearchableFields,
        searchedText,
        setSearchedText,
        setShouldRefetch,
        shouldRefetch,
        filterableFields,
        setFilterableFields,
        skipFrom,
        setSkipFrom
      } = useCriteria();
  
    useEffect(() => {
      const fetchStores = async () => {
        const baseUri = "https://api.koibanx.com/stores";

        const uri = shouldRefetch ? getUrl(baseUri, searchedText, filterableFields, searchableFields, sorting, skipFrom) : baseUri;
        
        console.log('Url: ', uri);
        
        // const response = await fetch(baseUri);
        // const methods: CommerceData[] = await response.json();

        const stores: StoresData = MockedData;
  
        if (stores.data.length > 0) {
            const localCommerceData: LocalCommerceData[] = stores.data.map((commerceData) => ({
                id: commerceData.id,
                comercio: commerceData.comercio,
                cuit: commerceData.cuit,
                concepto1: commerceData.concepto1,
                concepto2: commerceData.concepto2,
                concepto3: commerceData.concepto3,
                concepto4: commerceData.concepto4,
                balanceActual: commerceData.balanceActual,
                activo: commerceData.activo,
                ultimaVenta: commerceData.ultimaVenta
            }));
    
            const names = Object.keys(localCommerceData[0]);
            setCommerceData(localCommerceData);
            setColumnNames(names);
        } else {
            setCommerceData([]);
            setColumnNames([]);
        }
      };
  
      fetchStores();
      setShouldRefetch(false);
    }, [shouldRefetch, searchableFields, searchedText, sorting, setShouldRefetch]);
  
    return {
        commerceData,
        columnNames,
        sorting,
        setSorting,
        searchableFields,
        setSearchableFields,
        searchedText,
        setSearchedText,
        setShouldRefetch,
        filterableFields,
        setFilterableFields,
        skipFrom,
        setSkipFrom
    };
  };
