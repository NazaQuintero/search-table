import { FilterableFieldsType, SearchableFieldsType, SortableFieldsType } from '../types';
import { getUrlWithSearchedValueGivenFilteredFields, getUrlSortingFields, getUrlFilteredFields, getSkipedValues } from './uriBuilder'

test('should create params with id, comercio and cuit value', () => {
    const filteredValues: SearchableFieldsType = {
        id: true,
        comercio: true,
        cuit: true
    };
    const searchedValue = "homero";
  expect(getUrlWithSearchedValueGivenFilteredFields(searchedValue, filteredValues)).toBe(
    `"id": {"$regex": "${searchedValue}"},"comercio": {"$regex": "${searchedValue}"},"cuit": {"$regex": "${searchedValue}"}`);
});

test('should create params with id and comercio', () => {
    const filteredValues: SearchableFieldsType = {
        id: true,
        comercio: true,
        cuit: false
    };
    const searchedValue = "homero";
  expect(getUrlWithSearchedValueGivenFilteredFields(searchedValue, filteredValues)).toBe(
    `"id": {"$regex": "${searchedValue}"},"comercio": {"$regex": "${searchedValue}"}`);
});

test('should create params with sorting value', () => {
    const sortingValues: SortableFieldsType = {
        comercio : 1,
        cuit: -1
    }
  expect(getUrlSortingFields(sortingValues)).toBe(
    `"$orderby": {"comercio":1,"cuit":-1}`
    );
});

test('should create params with filer value when is 1 o 0', () => {
  const filterablesFields: FilterableFieldsType = {
      activo: 1
  }
  expect(getUrlFilteredFields(filterablesFields)).toBe(
    `"activo": {"$not": 1}`
  );
});

test('should not add params when activo is -1', () => {
  const filterablesFields: FilterableFieldsType = {
      activo: -1
  }
  expect(getUrlFilteredFields(filterablesFields)).toBe(
    ``
  );
});

test('it should return a &skip=value when skip from its greater than 0', () => {
  const skipFrom = 10;
  expect(getSkipedValues(skipFrom)).toBe(
    `&skip=${skipFrom}`
  );
});

test('it should return "" when skipFrom is 0', () => {
  const skipFrom = 0;
  expect(getSkipedValues(skipFrom)).toBe(
    ``
  );
});