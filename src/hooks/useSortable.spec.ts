import { act, renderHook } from '@testing-library/react'
import { useSortable } from './useSortable';


describe('useSortable hook', () => {

    const initialSortableValue = {
        homero: 0,
        marge: 0,
        lisa: 0
    }

    it('checking default state', () => {
        const { result } = renderHook(() => useSortable(initialSortableValue));

        expect(result.current.sortableFieldsState).toBe(initialSortableValue);
        expect(result.current.setAscendingSort).toBeInstanceOf(Function);
        expect(result.current.setDescendingSort).toBeInstanceOf(Function);
        expect(result.current.unsetSort).toBeInstanceOf(Function);
    })

    it('setAscending to homero changes its state to 1', () => {
        const { result } = renderHook(() => useSortable(initialSortableValue));

        expect(result.current.sortableFieldsState).toBe(initialSortableValue);

        act(() => {
            result.current.setAscendingSort({sorting: initialSortableValue, sortingKey: 'homero'})
        })

        const expectedResult = {...initialSortableValue, homero: 1};

        expect(result.current.sortableFieldsState).toStrictEqual(expectedResult);
        const homero = result.current.sortableFieldsState['homero'];
        const marge = result.current.sortableFieldsState['marge'];
        const lisa = result.current.sortableFieldsState['lisa'];

        expect(homero).toBe(1);
        expect(marge).toBe(0);
        expect(lisa).toBe(0);
    })

    it('setDescending to marge changes its state to -1', () => {
        const { result } = renderHook(() => useSortable(initialSortableValue));

        expect(result.current.sortableFieldsState).toBe(initialSortableValue);

        act(() => {
            result.current.setDescendingSort({sorting: initialSortableValue, sortingKey: 'marge'})
        })

        const expectedResult = {...initialSortableValue, marge: -1};

        expect(result.current.sortableFieldsState).toStrictEqual(expectedResult);
        const homero = result.current.sortableFieldsState['homero'];
        const marge = result.current.sortableFieldsState['marge'];
        const lisa = result.current.sortableFieldsState['lisa'];

        expect(homero).toBe(0);
        expect(marge).toBe(-1);
        expect(lisa).toBe(0);
    })

    it('unsetSort to lisa changes its state back to 0', () => {
        const sortValues = {
            homero: 1,
            marge: -1,
            lisa: 1
        }
        const { result } = renderHook(() => useSortable(sortValues));

        expect(result.current.sortableFieldsState).toBe(sortValues);

        act(() => {
            result.current.unsetSort({sorting: sortValues, sortingKey: 'lisa'})
        })

        const expectedResult = {...sortValues, lisa: 0};

        expect(result.current.sortableFieldsState).toStrictEqual(expectedResult);
        const homero = result.current.sortableFieldsState['homero'];
        const marge = result.current.sortableFieldsState['marge'];
        const lisa = result.current.sortableFieldsState['lisa'];

        expect(homero).toBe(1);
        expect(marge).toBe(-1);
        expect(lisa).toBe(0);
    })

    
})