import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Search } from './Search'
import '@testing-library/jest-dom/extend-expect'

describe('Clicking search button', () => {
    it('calls handleSearch', () => {
        const text = '';
        const handleTextChange = jest.fn((value) => {})
        const handleSearch = jest.fn();
      
        const { getByTestId } = render(<Search searchedText={text} handleTextChange={handleTextChange} handleSearch={handleSearch} />)
  
        const searchButton = getByTestId("search-button")
  
        fireEvent.click(searchButton);
        
  
        expect(handleSearch).toBeCalled();
    })
  })


  describe('Input value', () => {
    it('calls on change', () => {
        const text = '';
        const handleTextChange = jest.fn((value: React.ChangeEvent<HTMLInputElement>) => {})
        const handleSearch = jest.fn();
      
        const { getByPlaceholderText } = render(<Search searchedText={text} handleTextChange={handleTextChange} handleSearch={handleSearch} />)
  
        const input = getByPlaceholderText("Type here...") as HTMLInputElement
  
        fireEvent.change(input, {target: {value: 'test'}})
  
        expect(handleTextChange).toBeCalled();
    })
  })