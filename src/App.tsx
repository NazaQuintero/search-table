import React, { useEffect } from 'react';
import './App.css';
import { Search } from './components/search/Search';
import { Table } from './components/table/table';
import { useCommerceDataRefetch } from './hooks/useCommerceDataRefetch';
import { Filters } from './components/filters';
import { Pagination } from './components/pagination/pagination';
import { ColumnType, CommerceData } from './types';
import { useSortable } from './hooks/useSorting';
import { usePagination } from './hooks/usePagination';
import { useSearchable } from './hooks/useSearchable';
import { useDataFetch } from './hooks/useDataFetch';
import { useTextField } from './hooks/useTextField';
import { ColumnFieldsMapper } from './util/fieldsMapper';
import { useFilterable } from './hooks/useFilterable';

const App = () => {

  const colNames: ColumnType<CommerceData, keyof CommerceData>[] = [
    {
      key: 'id',
      header: 'ID',
      filterable: false,
      sortable: false,
      searchable: true
    },
    {
      key: 'comercio',
      header: 'Comercio',
      filterable: false,
      sortable: true,
      searchable: true
    },
    { 
      key: 'cuit',
      header: 'CUIT',
      filterable: false,
      sortable: true,
      searchable: true
    },
    {
      key: 'concepto1',
      header: 'Concepto 1',
      filterable: false,
      sortable: false,
      searchable: false
    },
    {
      key: 'concepto2',
      header: 'Concepto 2',
      filterable: false,
      sortable: false,
      searchable: false
    },
    {
      key: 'concepto3',
      header: 'Concepto 3',
      filterable: false,
      sortable: false,
      searchable: false
    },
    {
      key: 'concepto4',
      header: 'Concepto 4',
      filterable: false,
      sortable: false,
      searchable: false
    },
    {
      key: 'balanceActual',
      header: 'Balance actual',
      filterable: false,
      sortable: false,
      searchable: false
    },
    {
      key: 'activo',
      header: 'Activo',
      filterable: true,
      sortable: false,
      searchable: false
    },
    {
      key: 'ultimaVenta', 
      header: 'Ultima venta',
      filterable: false,
      sortable: false,
      searchable: false
    }
  ];

  const fieldsMapper = new ColumnFieldsMapper<CommerceData, keyof CommerceData>();
  const initialSortingState = fieldsMapper.getInitialSortableFields(colNames)
  const initialFilterState = fieldsMapper.getInitialFilterableFields(colNames)
  const initialSearchState = fieldsMapper.getInitialSearchableFields(colNames)

  const baseUri = "https://api.koibanx.com/stores";

  const { data, loading, error } =  useDataFetch(baseUri);

  const { searchedText, handleTextChange } = useTextField();

  const { searchableFieldsState, handleSearchableChange } = useSearchable(initialSearchState);

  const { sortableFieldsState, setAscendingSort, setDescendingSort, unsetSort } = useSortable(initialSortingState);

  const { filterableFields, handleFilterChange } = useFilterable(initialFilterState);

  const {
    elementsPerPage,
    currentPage,
    firstIndex,
    lastIndex,
    numberOfPages,
    startFrom,
    nextPage,
    prevPage,
    setPage
  } = usePagination({
    elementsPerPage: 5,
    currentPage: 1,
    firstIndex: 1,
    totalElements: data ? data.length : 0
  })

  const { urlWithParams } = useCommerceDataRefetch(baseUri, searchedText, sortableFieldsState, filterableFields, searchableFieldsState, startFrom - 1);

  // useEffect(() => {
  //   if(shouldRefetch === true) {
  //     console.log('Url: ', urlWithParams);
  //   }
  // }, [shouldRefetch])

  const slicedData = data ? data.slice(firstIndex, lastIndex) : [];

  return (
    <div>
      <Search searchedText={searchedText} handleTextChange={handleTextChange} handleSearch={() => { console.log('Refetch!') }}/>

      <Filters 
        filterableFields={filterableFields}
        handleFilterChange={handleFilterChange}
        searchableFields={searchableFieldsState}
        handleChange={handleSearchableChange}
      />
      
      { loading && ( <p>Loading data...</p> ) }

      { !loading && (<>
        <Table 
          data={slicedData}
          columns={colNames}
          sorting={sortableFieldsState}
          setAscendingSort={setAscendingSort}
          setDescendingSort={setDescendingSort}
          unsetSort={unsetSort} 
        />

        <Pagination
          startFrom={startFrom}
          currentPage={currentPage}
          elementsPerPage={elementsPerPage}
          numberOfPages={numberOfPages}
          nextPage={nextPage}
          prevPage={prevPage}
          setPage={setPage}
        />

        Rows per page: {elementsPerPage} <br /><br />
      </>
      )}
      
    </div>
  );
}

export default App;
