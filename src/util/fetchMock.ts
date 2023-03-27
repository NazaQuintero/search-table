import { CommerceData, StoresData } from '../types';

export class FetchMock {
  private static instance: FetchMock;

  private pages: StoresData[] = [];

  private constructor() {
    let counter = 1;
    for (let index = 1; index <= 12; index++) {
      let data: CommerceData[] = [];
      let elementsPerPage = 1
      while(elementsPerPage <= 5) {
        data.push({ 
          id: `${counter}`,
          comercio: "Zapatillas",
          cuit: "20123475691823",
          concepto1: 18,
          concepto2: 20,
          concepto3: 31,
          concepto4: 17,
          balanceActual: 100000,
          activo: 1,
          ultimaVenta: new Date().toISOString()
        })
        elementsPerPage++;
        counter++;
      }

      this.pages.push({
        data: data,
        page: index,
        pages: 12,
        rowsPerPage: 5,
        total: 60
      })
      
    }
  }

  public static getInstance(): FetchMock {
    if (!FetchMock.instance) {
      FetchMock.instance = new FetchMock();
    }
    return FetchMock.instance;
  }

  private resolveAfter = (value: any, delay: number): Promise<any> =>
  new Promise(resolve => {
    setTimeout(() => resolve(value), delay);
  });

  fetchMockedData = async (url: string, page: number): Promise<StoresData> => {
    return this.resolveAfter(this.pages.find(p => p.page === page), 1500);
  }
}