import { useCallback, useEffect, useState } from 'react';
import { swapi } from 'src/plugins';

type Scope = keyof typeof swapi.rest;
type Data = Awaited<ReturnType<typeof swapi.rest[Scope]['search']>>['results'];
type DataItem = Data[0] | Record<string, never>;

interface UseDataItemDispatch {
  (scope: Scope, id: string): Promise<void>;
}

function useDataItem(): [DataItem, UseDataItemDispatch] {
  const [currentId, setCurrentId] = useState('');
  const [dataItem, setDataItem] = useState<DataItem>({});

  async function fetchDataItem(scope: Scope, id: string): Promise<void> {
    if (id && id === currentId) return;
    const response = await swapi.rest[scope].get({ id });
    setDataItem(response);
    setCurrentId(id);
  }

  return [dataItem, fetchDataItem];
}

function useData(query: string, scope: Scope): Data {
  const [data, setData] = useState<Data>([]);
  const fetchData = useCallback(async () => {
    const response = await swapi.rest[scope].search({ query });
    setData(response.results);
  }, [query, scope]);

  useEffect(() => {
    fetchData().catch(() => { /* ... */ });
  }, [fetchData]);

  return data;
}

export {
  useData,
  useDataItem,
};
