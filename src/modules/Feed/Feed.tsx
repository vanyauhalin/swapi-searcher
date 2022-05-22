import { useEffect, useState } from 'react';
import { swapi } from 'src/plugins';
import { useMount } from 'src/utils';
import {
  FeedDetails,
  FeedList,
  FeedListItem,
  FeedRoot,
} from './components';

type Scope = keyof typeof swapi.rest;
type Data = Awaited<ReturnType<typeof swapi.rest[Scope]['search']>>['results'];
type DataItem = Data[0];

interface FeedProperties {
  id?: string | undefined;
  query: string;
  scope?: Scope | undefined;
}

function Feed(properties: FeedProperties): JSX.Element {
  const { id = '', query, scope = 'films' } = properties;
  const [currentId, setCurrentId] = useState('');
  const [data, setData] = useState<Data>([]);
  const [
    dataItem,
    setDataItem,
  ] = useState<DataItem | Record<string, never>>({});
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  async function get(selectedScope: Scope, selectedId: string): Promise<void> {
    if (selectedId && selectedId === currentId) return;
    const response = await swapi.rest[selectedScope].get({
      id: selectedId,
    });
    setDataItem(response);
    setCurrentId(selectedId);
  }

  async function showDetails(
    selectedScope: Scope,
    selectedId: string,
  ): Promise<void> {
    await get(selectedScope, selectedId);
    setIsDetailsVisible(true);
  }

  useEffect(() => {
    async function search(): Promise<void> {
      const response = await swapi.rest[scope].search({ query });
      setData(response.results);
    }
    search().catch(() => { /* ... */ });
  }, [query, scope]);

  useMount(() => {
    if (id) showDetails(scope, id).catch(() => { /* ... */ });
  });

  return (
    <FeedRoot>
      <FeedList>
        {data.length > 0 && data.map((item) => (
          <FeedListItem
            description={Object.values(item).flat().join(', ')}
            heading={item.name || item.title || ''}
            key={item.id}
            onSelect={() => {
              showDetails(item.scope, item.id).catch(() => { /* ... */ });
            }}
          />
        ))}
      </FeedList>
      <FeedDetails
        data={dataItem}
        isVisible={isDetailsVisible}
        onClose={() => {
          setIsDetailsVisible(false);
        }}
      />
    </FeedRoot>
  );
}

export {
  Feed,
};
