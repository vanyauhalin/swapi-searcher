import { useState } from 'react';
import type { swapi } from 'src/plugins';
import { useData, useDataItem } from 'src/plugins';
import { useMount } from 'src/utils';
import {
  FeedDetails,
  FeedList,
  FeedListItem,
  FeedRoot,
} from './components';

type Scope = keyof typeof swapi.rest;

interface FeedProperties {
  id?: string | undefined;
  query: string;
  scope?: Scope | undefined;
}

function Feed(properties: FeedProperties): JSX.Element {
  const { id = '', query, scope = 'films' } = properties;
  const data = useData(query, scope);
  const [dataItem, fetchDataItem] = useDataItem();
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  async function showDetails(
    selectedScope: Scope,
    selectedId: string,
  ): Promise<void> {
    await fetchDataItem(selectedScope, selectedId);
    setIsDetailsVisible(true);
  }

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
