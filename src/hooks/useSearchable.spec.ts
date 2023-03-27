import { act, renderHook } from '@testing-library/react'
import { useSearchable } from './useSearchable';


describe('useSearchable hook', () => {

    const initialSearchableValue = {
        homero: true,
        marge: false,
        lisa: true
    }

    it('checking default state', () => {
        const { result } = renderHook(() => useSearchable(initialSearchableValue));

        expect(result.current.searchableFieldsState).toBe(initialSearchableValue);
        expect(result.current.handleSearchableChange).toBeInstanceOf(Function);
    })

    it('handleSearchableChange changes its state', () => {
        const { result } = renderHook(() => useSearchable(initialSearchableValue));

        expect(result.current.searchableFieldsState).toBe(initialSearchableValue);

        act(() => {
            result.current.handleSearchableChange( {target: {name: 'marge' , checked: true}} )
        })

        const expectedResult = {...initialSearchableValue, marge: true};

        expect(result.current.searchableFieldsState).toStrictEqual(expectedResult);
        const homero = result.current.searchableFieldsState['homero'];
        const marge = result.current.searchableFieldsState['marge'];
        const lisa = result.current.searchableFieldsState['lisa'];

        expect(homero).toBe(true);
        expect(marge).toBe(true);
        expect(lisa).toBe(true);
    })

    
})