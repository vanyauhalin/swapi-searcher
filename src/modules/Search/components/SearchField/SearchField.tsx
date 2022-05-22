import {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SearchIcon, XIcon } from 'src/components';
import styles from './SearchField.module.css';

interface SearchFieldProperties {
  query?: string;
  onChange(query: string): void;
  onReset(): void;
}

const SearchField = forwardRef<HTMLLabelElement, SearchFieldProperties>(
  ({ query = '', onChange, onReset }, reference) => {
    const input = useRef<HTMLInputElement>(null);
    const [isActive, setIsActive] = useState(false);

    function isActiveByCode(code: string): boolean {
      return code === 'Slash' && document.activeElement !== input.current;
    }

    useEffect(() => {
      function keyup(event: KeyboardEvent): void {
        if (isActiveByCode(event.code)) input.current?.focus();
      }
      function keydown(event: KeyboardEvent): void {
        if (isActiveByCode(event.code)) event.preventDefault();
      }
      document.addEventListener('keyup', keyup);
      document.addEventListener('keydown', keydown);
      if (input.current) input.current.value = query;
      return () => {
        document.removeEventListener('keyup', keyup);
        document.removeEventListener('keydown', keydown);
      };
    }, [query]);

    return (
      <label
        className={`${styles.Field || ''} ${isActive
          ? styles.FieldActive || ''
          : ''}`}
        ref={reference}
      >
        <SearchIcon color="gray" />
        <input
          className={styles.Input}
          placeholder="Search"
          ref={input}
          type="text"
          onChange={(event) => {
            if (event.target.value) {
              setIsActive(true);
            } else {
              setIsActive(false);
            }
            onChange(event.target.value);
          }}
        />
        <kbd className={styles.Key}>
          /
        </kbd>
        <button
          aria-label="Reset search query"
          className={styles.Reset}
          type="button"
          onClick={() => {
            if (input.current) {
              input.current.value = '';
              setIsActive(false);
            }
            onReset();
          }}
        >
          <XIcon />
        </button>
      </label>
    );
  },
);

SearchField.defaultProps = {
  query: '',
};

export {
  SearchField,
};
