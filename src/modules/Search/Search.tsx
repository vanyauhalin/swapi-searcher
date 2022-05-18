import { useMemo, useRef, useState } from 'react';
import { rest } from 'src/plugins';
import { debounce } from 'src/utils';
import {
  SearchField,
  SearchOutput,
  SearchResources,
  SearchRoot,
} from './components';
import { searchResourceContext, SearchResourceContext } from './context';

const resources = [
  'Film',
  'People',
  'Planet',
  'Species',
  'Starships',
  'Vehicles',
];

function Search(): JSX.Element {
  const fieldReference = useRef<HTMLLabelElement>(null);
  const [resource, setResource] = useState<string | undefined>();
  const [
    content,
    setContent,
  ] = useState<Awaited<ReturnType<typeof rest.search>>>([]);
  const [isOutputVisible, setIsOutputVisible] = useState(false);

  const resetResource = (): void => {
    setResource(searchResourceContext.resource);
    setContent([]);
    setIsOutputVisible(false);
  };
  const resourceContext = useMemo(() => ({
    resource,
    resetResource,
    setResource(value: string) {
      setResource(value);
    },
  }), [resource]);
  const changeQuery = debounce(async (query: string) => {
    if (!query) {
      resetResource();
      return;
    }
    const result = await rest.search(query);
    if (result.length > 0) {
      setContent(result);
      setIsOutputVisible(true);
    }
  }, 150);

  return (
    <SearchResourceContext.Provider value={resourceContext}>
      <SearchRoot>
        <SearchField
          ref={fieldReference}
          onChange={changeQuery}
          onReset={resetResource}
        />
        <SearchResources resources={resources} />
        <SearchOutput
          anchor={fieldReference}
          content={content}
          isVisible={isOutputVisible}
        />
      </SearchRoot>
    </SearchResourceContext.Provider>
  );
}

export {
  Search,
};
