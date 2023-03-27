import { useCallback, useState } from 'react';
import './App.css';
import { Search } from './components/search/Search';
import { Table } from './components/table/table';
import { Pagination } from './components/pagination/pagination';
import { ColumnType, CommerceData, StoresData } from './types';
import { useSortable } from './hooks/useSortable';
import { usePagination } from './hooks/usePagination';
import { useSearchable } from './hooks/useSearchable';
import { useDataFetch } from './hooks/useDataFetch';
import { useTextField } from './hooks/useTextField';
import { ColumnFieldsMapper } from './util/fieldsMapper';
import { useFilterable } from './hooks/useFilterable';
import { getUrl } from './util/uriBuilder';

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

  const [url, setUrl] = useState("https://api.koibanx.com/stores");
  const [pageNumber, setPageNumber] = useState(1)

  const { storeData, loading, error } = useDataFetch<StoresData>(url, pageNumber);

  const { searchedText, handleTextChange } = useTextField();

  const { searchableFieldsState, handleSearchableChange } = useSearchable(initialSearchState);

  const { sortableFieldsState, setAscendingSort, setDescendingSort, unsetSort } = useSortable(initialSortingState);

  const { filterableFields, setFilteringValue } = useFilterable(initialFilterState);

  const {
    elementsPerPage,
    numberOfPages,
    nextPage,
    prevPage,
    setPage,
    skipFrom
  } = usePagination({
    elementsPerPage: storeData.rowsPerPage,
    currentPage: pageNumber,
    setCurrentPage: setPageNumber,
    firstIndex: 1,
    totalElements: storeData.total
  })

  const refetch = useCallback(() => {
    const newUrl = getUrl(url, searchedText, filterableFields, searchableFieldsState, sortableFieldsState, skipFrom)
    
    setUrl(newUrl)
  }, [setUrl, url, searchedText, filterableFields, searchableFieldsState, sortableFieldsState, pageNumber, skipFrom])

  return (
    <div>
      <Search searchedText={searchedText} handleTextChange={handleTextChange} handleSearch={refetch}/>

      <br /><br />
     
      { loading && ( <p>Loading data...</p> ) }

      { error && ( <p>Something went wrong...</p> )}

      { !loading && (<>
        <Table 
          data={storeData.data}
          columns={colNames}
          sorting={sortableFieldsState}
          filterableFields={filterableFields}
          setFilteringValue={setFilteringValue}
          searchableFields={searchableFieldsState}
          handleSearchableChange={handleSearchableChange}
          setAscendingSort={setAscendingSort}
          setDescendingSort={setDescendingSort}
          unsetSort={unsetSort} 
        />

        <Pagination
          startFrom={1}
          currentPage={pageNumber}
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
