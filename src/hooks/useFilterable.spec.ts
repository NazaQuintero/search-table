import { act, renderHook } from '@testing-library/react'
import { useFilterable } from './useFilterable';
import { useSortable } from './useSortable';


describe('useFilterable hook', () => {

    const initialFilterableValue = {
        homero: -1,
        marge: -1,
        lisa: -1
    }

    it('checking default state', () => {
        const { result } = renderHook(() => useFilterable(initialFilterableValue));

        expect(result.current.filterableFields).toBe(initialFilterableValue);
        expect(result.current.setFilteringValue).toBeInstanceOf(Function);
    })

    it('handleFilterChange changes homero value to 1', () => {
        const { result } = renderHook(() => useFilterable(initialFilterableValue));

        expect(result.current.filterableFields).toBe(initialFilterableValue);

        act(() => {
            result.current.setFilteringValue({filtering: initialFilterableValue, filteringKey: 'homero', value: 1})
        })

        const expectedResult = {...initialFilterableValue, homero: 1};

        expect(result.current.filterableFields).toStrictEqual(expectedResult);
        const homero = result.current.filterableFields['homero'];
        const marge = result.current.filterableFields['marge'];
        const lisa = result.current.filterableFields['lisa'];

        expect(homero).toBe(1);
        expect(marge).toBe(-1);
        expect(lisa).toBe(-1);
    })

    
})