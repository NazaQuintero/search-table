import React, { useState } from 'react';
import './App.css';
import { Search } from './components/search/Search';
import { Table } from './components/table/table';
import { useCommerceData } from './hooks/useCommerceData';
import { Filters } from './components/filters';
import { Pagination } from './components/pagination/pagination';

const App = () => {
  const { 
    commerceData,
    columnNames,
    sorting,
    setSorting,
    searchableFields,
    setSearchableFields,
    searchedText,
    setSearchedText,
    setShouldRefetch,
    filterableFields,
    setFilterableFields,
    skipFrom,
    setSkipFrom
    } = useCommerceData();

  const [currentPage, setCurrentPage] = useState(1);

  const elementsPerPage = 5;
  const lastIndex = currentPage * elementsPerPage;
  const firstIndex = lastIndex - elementsPerPage;
  const entries = commerceData.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(commerceData.length/elementsPerPage);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();    
    setSearchedText(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSearchableFields( prevState => ({
      ...prevState,
      [e.target.name]: value
    }))
  }

  const handleSearch = () => {
    setShouldRefetch(true)
  }

  const handleFilterChange = (e: any) => {
    setFilterableFields(prevState => ({...prevState, activo: e.target.value}));
  }

  const setPage = (page: number) => {
    setCurrentPage(page);
  }

  const nextPage = () => {
    if(currentPage !== numberOfPages) {
      setCurrentPage(prevState => prevState + 1);
    } else {
      setSkipFrom(currentPage);
      setShouldRefetch(true)
    }
  }

  const prevPage = () => {
    if(currentPage !== 1) {
      setCurrentPage(prevState => prevState - 1);
    }
  }

  return (
    <div>
      <Search searchedText={searchedText} handleTextChange={handleTextChange} handleSearch={handleSearch}/>
      <Filters filterableFields={filterableFields} handleFilterChange={handleFilterChange} searchableFields={searchableFields} handleChange={handleChange} />
      <Table columnNames={columnNames} entries={entries} sorting={sorting} setSorting={setSorting} />
      <Pagination
        startFrom={skipFrom + 1}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        elementsPerPage={elementsPerPage}
        setPage={setPage}
        numberOfPages={numberOfPages}
      />
      Rows per page: {elementsPerPage} <br /><br />
    </div>
  );
}

export default App;
