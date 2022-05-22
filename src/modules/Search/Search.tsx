import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

type Scope = keyof typeof swapi.rest | '';

interface SearchProperties {
  className?: string;
  query?: string | undefined;
}

function Search(properties: SearchProperties): JSX.Element {
  const { className, query } = properties;
  const navigate = useNavigate();
  const fieldReference = useRef<HTMLLabelElement>(null);
  const [scope, setScope] = useState<Scope>('');
  const [output, setOutput] = useState<SearchResponse>(swapi.search.defaults);
  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const [previousQuery, setPreviousQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState(query || '');

  function resetOutput(): void {
    setCurrentQuery('');
    setOutput(swapi.search.defaults);
    setIsOutputVisible(false);
  }

  const resetScope = (): void => {
    setScope('');
    resetOutput();
  };

  async function search(passedQuery: string): Promise<void> {
    const instance = scope ? swapi.rest[scope] : swapi;
    const searched = await instance.search({
      query: passedQuery,
    });
    if (searched.results.length === 0) return;
    setCurrentQuery(passedQuery);
    setOutput(searched);
    setIsOutputVisible(true);
  }

  async function handleQuery(passedQuery: string): Promise<void> {
    const hasItems = output.results.length > 0;
    const trimmed = passedQuery.trim();

    if (
      (previousQuery === trimmed && passedQuery.match(/\s*$/)?.[0]?.length !== 0)
      || (previousQuery && !hasItems && trimmed.length > previousQuery.length)
      || (!previousQuery && hasItems && !trimmed)
    ) return;

    if (!trimmed) {
      resetOutput();
    } else {
      await search(trimmed);
    }

    setPreviousQuery(trimmed);
  }

  return (
    <SearchRoot
      className={className}
      onSubmit={() => {
        let url = `/details?query=${currentQuery}`;
        if (scope) url += `&scope=${scope}`;
        navigate(url);
      }}
    >
      <SearchField
        query={query || ''}
        ref={fieldReference}
        onChange={debounce(handleQuery, 300)}
        onReset={resetScope}
      />
      <SearchScopes>
        {swapi.scopes.humanized.map((humanizedScope, index) => (
          <SearchScopesOption
            key={humanizedScope}
            label={humanizedScope}
            value={swapi.scopes.list[index] || humanizedScope.toLowerCase()}
            onReset={resetScope}
            onSelect={(value: Scope) => {
              setScope(value);
            }}
          />
        ))}
      </SearchScopes>
      <SearchOutput
        anchor={fieldReference}
        isVisible={isOutputVisible}
      >
        {output.results.map((item) => (
          <SearchOutputItem
            key={`${item.scope}${item.id}`}
            label={item.name || item.title || ''}
            to={'/details'
              + `?query=${currentQuery}`
              + `&scope=${item.scope}`
              + `&id=${item.id}`}
          />
        ))}
      </SearchOutput>
    </SearchRoot>
  );
}

export {
  Search,
};
