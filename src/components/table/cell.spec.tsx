import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TableCell } from './cell'
import '@testing-library/jest-dom/extend-expect'
import { ColumnType, FilterableFieldsType, SearchableFieldsType, SortableFieldsType } from '../../types'

type Kukamonga = {
    mesas: string,
    sillas: string
}

describe('Table cell', () => {
    const handleSearchableChange = jest.fn();
    const setAscendingSort = jest.fn();
    const setDescendingSort = jest.fn();
    const unsetSort = jest.fn();
    const setFilteringValue = jest.fn();

    it('should have a Ascending Order icon', () => {
        const column: ColumnType<Kukamonga, keyof Kukamonga> = {
            key: 'mesas',
            header: 'MeSaS',
            filterable: false,
            searchable: false,
            sortable: true
        }

        const sortableFields: SortableFieldsType = { mesas: 1 };
        const filterableFields: FilterableFieldsType = {};
        const searchableFileds: SearchableFieldsType = {};
      
        const { getByTestId } = render(
            <table>
                <thead>
                    <tr>
                        <TableCell 
                            column={column}
                            handleSearchableChange={handleSearchableChange}
                            setAscendingSort={setAscendingSort}
                            setDescendingSort={setDescendingSort}
                            unsetSort={unsetSort}
                            setFilteringValue={setFilteringValue}
                            sortableFields={sortableFields}
                            filterableFields={filterableFields}
                            searchableFields={searchableFileds}
                        />
                    </tr>
                </thead>
            </table>
        )
  
        const icon = getByTestId("sort-icon")
  
        expect(icon).toHaveTextContent('↑');
    })

    it('should have a Descending Order icon', () => {
        const column: ColumnType<Kukamonga, keyof Kukamonga> = {
            key: 'mesas',
            header: 'MeSaS',
            filterable: false,
            searchable: false,
            sortable: true
        }

        const sortableFields: SortableFieldsType = { mesas: -1 };
        const filterableFields: FilterableFieldsType = {};
        const searchableFileds: SearchableFieldsType = {};
      
        const { getByTestId } = render(
            <table>
                <thead>
                    <tr>
                        <TableCell 
                            column={column}
                            handleSearchableChange={handleSearchableChange}
                            setAscendingSort={setAscendingSort}
                            setDescendingSort={setDescendingSort}
                            unsetSort={unsetSort}
                            setFilteringValue={setFilteringValue}
                            sortableFields={sortableFields}
                            filterableFields={filterableFields}
                            searchableFields={searchableFileds}
                        />
                    </tr>
                </thead>
            </table>
        )
  
        const icon = getByTestId("sort-icon")
  
        expect(icon).toHaveTextContent('↓');
    })

    it('should have a Sortable icon when sort has not been set', () => {
        const column: ColumnType<Kukamonga, keyof Kukamonga> = {
            key: 'mesas',
            header: 'MeSaS',
            filterable: false,
            searchable: false,
            sortable: true
        }

        const sortableFields: SortableFieldsType = { mesas: 0 };
        const filterableFields: FilterableFieldsType = {};
        const searchableFileds: SearchableFieldsType = {};
      
        const { getByTestId } = render(
            <table>
                <thead>
                    <tr>
                        <TableCell 
                            column={column}
                            handleSearchableChange={handleSearchableChange}
                            setAscendingSort={setAscendingSort}
                            setDescendingSort={setDescendingSort}
                            unsetSort={unsetSort}
                            setFilteringValue={setFilteringValue}
                            sortableFields={sortableFields}
                            filterableFields={filterableFields}
                            searchableFields={searchableFileds}
                        />
                    </tr>
                </thead>
            </table>
        )
  
        const icon = getByTestId("sort-icon")
  
        expect(icon).toHaveTextContent('⇅');
    })
  })