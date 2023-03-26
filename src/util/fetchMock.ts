import MockedData from '../db.json'
import { StoresData } from '../types';

const resolveAfter = (value: any, delay: number): Promise<any> =>
  new Promise(resolve => {
    setTimeout(() => resolve(value), delay);
  });

export const fetchMockedData = async (url: string): Promise<StoresData> => {
    console.log('Url: ', url);
    return resolveAfter(MockedData, 3000);
}