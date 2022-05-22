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
}

function Search(properties: SearchProperties): JSX.Element {
  const { className } = properties;
  const navigate = useNavigate();
  const fieldReference = useRef<HTMLLabelElement>(null);
  const [scope, setScope] = useState<Scope>('');
  const [output, setOutput] = useState<SearchResponse>(swapi.search.defaults);
  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const [previousQuery, setPreviousQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');

  function resetOutput(): void {
    setCurrentQuery('');
    setOutput(swapi.search.defaults);
    setIsOutputVisible(false);
  }

  const resetScope = (): void => {
    setScope('');
    resetOutput();
  };

  async function search(query: string): Promise<void> {
    const instance = scope ? swapi.rest[scope] : swapi;
    const searched = await instance.search({ query });
    if (searched.results.length === 0) return;
    setCurrentQuery(query);
    setOutput(searched);
    setIsOutputVisible(true);
  }

  async function handleQuery(query: string): Promise<void> {
    const hasItems = output.results.length > 0;
    const trimmed = query.trim();

    if (
      (previousQuery === trimmed && query.match(/\s*$/)?.[0]?.length !== 0)
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
        navigate(`/details?query=${currentQuery}`);
      }}
    >
      <SearchField
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
