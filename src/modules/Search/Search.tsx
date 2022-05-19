import { Fragment, useRef, useState } from 'react';
import { swapi } from 'src/plugins';
import { debounce } from 'src/utils';
import type { SearchResponse } from 'types/swapi';
import {
  SearchField,
  SearchOutput,
  SearchOutputItem,
  SearchRoot,
  SearchScopes,
  SearchScopesOption,
} from './components';
import { searchContext } from './context';

function Search(): JSX.Element {
  const fieldReference = useRef<HTMLLabelElement>(null);
  const [, setScope] = useState<typeof searchContext['scope']>();
  const [content, setContent] = useState<SearchResponse | []>([]);
  const [isOutputVisible, setIsOutputVisible] = useState(false);

  const resetScope = (): void => {
    setScope(searchContext.scope);
    setContent([]);
    setIsOutputVisible(false);
  };

  async function search(query: string): Promise<void> {
    if (!query) {
      resetScope();
      return;
    }
    const searched = await swapi.search({ query });
    if (searched.length > 0) {
      setContent(searched);
      setIsOutputVisible(true);
    }
  }

  return (
    <SearchRoot>
      <SearchField
        ref={fieldReference}
        onChange={debounce(search, 150)}
        onReset={resetScope}
      />
      <SearchScopes>
        {swapi.scopes.humanized.map((humanizedScope, index) => (
          <SearchScopesOption
            key={humanizedScope}
            label={humanizedScope}
            value={swapi.scopes.list[index] || humanizedScope.toLowerCase()}
            onReset={resetScope}
            onSelect={setScope}
          />
        ))}
      </SearchScopes>
      <SearchOutput
        anchor={fieldReference}
        isVisible={isOutputVisible}
      >
        {content.map(([key, items]) => (
          <Fragment key={key}>
            {items.map((item) => (
              <SearchOutputItem
                key={item.id}
                label={item.name || item.title || ''}
              />
            ))}
          </Fragment>
        ))}
      </SearchOutput>
    </SearchRoot>
  );
}

export {
  Search,
};
