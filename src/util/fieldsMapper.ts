import { ColumnType } from "../types";

export class ColumnFieldsMapper<T, K extends keyof T> {
    INITIAL_SORTING_VALUE = 0;
    INITIAL_FILTERABLE_VALUE = -1;
    INITIAL_SEARCHABLE_VALUE = false;

    getSortableColumnsAsArray = (columnFields: ColumnType<T,K>[]): ColumnType<T,K>[] => {
        return columnFields.filter(col => col.sortable);
    }

    getFilterableColumnsAsArray = (columnFields: ColumnType<T,K>[]): ColumnType<T,K>[] => {
        return columnFields.filter(col => col.filterable);
    }

    getSearchableColumnsAsArray = (columnFields: ColumnType<T,K>[]): ColumnType<T,K>[] => {
        return columnFields.filter(col => col.searchable);
    }

    getInitialSortableFields = (columnFields: ColumnType<T,K>[]) => {
        return Object.fromEntries(this.getSortableColumnsAsArray(columnFields).map(f => [f.key, this.INITIAL_SORTING_VALUE]))
    }

    getInitialFilterableFields = (columnFields: ColumnType<T,K>[]) => { 
        return Object.fromEntries(this.getFilterableColumnsAsArray(columnFields).map(f => [f.key, this.INITIAL_FILTERABLE_VALUE]))
    }

    getInitialSearchableFields = (columnFields: ColumnType<T,K>[]) => { 
        return Object.fromEntries(this.getSearchableColumnsAsArray(columnFields).map(f => [f.key, this.INITIAL_SEARCHABLE_VALUE]))
    }
}