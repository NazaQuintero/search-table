import { ColumnType, CommerceData } from "./types";

export const colNames: ColumnType<CommerceData, keyof CommerceData>[] = [
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