import { FilterableFieldsType, SearchableFields, SortableFieldsType } from "../types";

export const getUrlWithSearchedValueGivenFilteredFields = (searchedExpression: string, fields: SearchableFields): string => {
    const params: string[] = [];
    for (const [key, value] of Object.entries(fields)) {
        if(value === true) {
            params.push(key)
        }
    }
    const paramsStr = params.map(param => `"${param}": {"$regex": "${searchedExpression}"}`)
    return paramsStr.join(",");
}

export const getUrlSortingFields = (fields: SortableFieldsType): string => {
    const params: string[] = [];
    for (const [key, value] of Object.entries(fields)) {
        if(value !== 0) {
            params.push(`&sort=${key}&dir=${value}`)
        }
    }
    return params.join("");
}

export const getUrlFilteredFields = (fields: FilterableFieldsType): string => {
    const params: string[] = [];
    for (const [key, value] of Object.entries(fields)) {
        if(value !== -1) {
            params.push(`"${key}": ${value}`)            
        }
    }
    return params.join(",");
}

export const getSkipedValues = (skipFrom: number): string => {
    if (skipFrom === 0) {
        return '';
    }
    return `&skip=${skipFrom}`;
}

export const getUrl = (baseUri: string, searchedText: string, filterablesFields: FilterableFieldsType , searchableFields: SearchableFields, sorting: SortableFieldsType, skipFrom: number) => {
    return baseUri + '?q={' + getUrlWithSearchedValueGivenFilteredFields(searchedText, searchableFields) + ',' + getUrlFilteredFields(filterablesFields) + getUrlSortingFields(sorting) + getSkipedValues(skipFrom) + '}';
}