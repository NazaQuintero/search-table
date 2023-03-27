import { FilterableFieldsType, SearchableFieldsType, SortableFieldsType } from "../types";

export const getUrlWithSearchedValueGivenFilteredFields = (searchedExpression: string, fields: SearchableFieldsType): string => {
    if (searchedExpression === "") {
        return "";
    }

    const paramsStr = Object.entries(fields)
        .filter( ([, value]) => value !== false)
        .map( ([key,]) => `"${key}": {"$regex": "${searchedExpression}"}`)

    return paramsStr.join(",");
}

export const getUrlSortingFields = (fields: SortableFieldsType): string => {

    const paramsStr = Object.entries(fields)
        .filter(([, value]) => value !== 0)
        .map(([key, value]) => `"${key}":${value}`)

    const joinedParams = paramsStr.join(",")
    if(joinedParams === "") {
        return ""
    }
    return `"$orderby": {${joinedParams}}`;
}

export const getUrlFilteredFields = (fields: FilterableFieldsType): string => {
  
    const paramsStr = Object.entries(fields)
        .filter(([, value]) => value !== -1)
        .map(([key, value]) => `"${key}": {"$not": ${value}}`)

    return paramsStr.join(",");
}

export const getSkipedValues = (skipFrom: number): string => {
    if (skipFrom === 0) {
        return '';
    }
    return `"$skip":${skipFrom}`;
}

export const getUrl = (baseUri: string, searchedText: string, filterablesFields: FilterableFieldsType , searchableFields: SearchableFieldsType, sorting: SortableFieldsType, skipFrom: number) => {
    const fieldsWithSearchExpression = getUrlWithSearchedValueGivenFilteredFields(searchedText, searchableFields);
    const filteredFields = getUrlFilteredFields(filterablesFields);
    const hasSomeValueBefore = fieldsWithSearchExpression !== "";
    const hasSomeFilteredField = filteredFields !== "";
    const filteredFieldsSeparated = hasSomeValueBefore && hasSomeFilteredField ? `,${filteredFields}` : filteredFields;

    const query = fieldsWithSearchExpression + filteredFieldsSeparated;

    const sortingParams = getUrlSortingFields(sorting);
    const skipedValues = getSkipedValues(skipFrom);
    const hasSortingParams = sortingParams !== ""
    const hasSkipedValues = skipedValues !== ""
    const skipedParamSeparated = hasSortingParams && hasSkipedValues ? `,${skipedValues}` : skipedValues;
    const hint = sortingParams + skipedParamSeparated;

    return baseUri + `?q={${query}}&h{${hint}}`;
}