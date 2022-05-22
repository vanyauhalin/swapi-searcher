import { useState } from 'react';
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
  const { id = '', query, scope = '' } = properties;
  const [currentScope, setCurrentScope] = useState<Scope | ''>(scope);
  const [previousId, setPreviousId] = useState('');
  const [currentId, setCurrentId] = useState(id);
  const [data, setData] = useState<Data>([]);
  const [
    dataItem,
    setDataItem,
  ] = useState<DataItem | Record<string, never>>({});
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  async function get(): Promise<void> {
    if (!(currentScope && currentId)) return;
    if (previousId && previousId === currentId) return;
    const response = await swapi.rest[currentScope].get({
      id: currentId,
    });
    setDataItem(response);
    setPreviousId(currentId);
  }

  function closeDetails(): void {
    setIsDetailsVisible(false);
  }

  async function showDetails(
    selectedScope: Scope,
    selectedId: string,
  ): Promise<void> {
    setCurrentScope(selectedScope);
    setCurrentId(selectedId);
    await get();
    setIsDetailsVisible(true);
  }

  async function search(): Promise<void> {
    if (!currentScope) return;
    const response = await swapi.rest[currentScope].search({ query });
    setData(response.results);
  }

  useMount(() => {
    get().catch(() => { /* ... */ });
    search().catch(() => { /* ... */ });
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
          closeDetails();
        }}
      />
    </FeedRoot>
  );
}

export {
  Feed,
};
