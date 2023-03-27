import { act, renderHook } from '@testing-library/react'
import { useTextField } from './useTextField'

describe('useTextField hook', () => {
    it('checking default state', () => {
        const { result } = renderHook(() => useTextField());

        expect(result.current.searchedText).toBe('');
        expect(result.current.handleTextChange).toBeInstanceOf(Function);
    })

    it('handleTextChange changes its searchedText', () => {
        const { result } = renderHook(() => useTextField());

        expect(result.current.searchedText).toBe('');

        act(() => {
            result.current.handleTextChange( {target: {value: 'Zapas'}} )
        })

        expect(result.current.searchedText).toBe('Zapas');
    })

    
})
