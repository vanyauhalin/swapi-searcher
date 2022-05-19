import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import styles from './SearchScopes.module.css';

interface SearchScopesOptionProperties {
  label: string;
  value: string;
  onReset(this: void): void;
  onSelect(this: void, value: string): void;
}

function SearchScopesOption(
  properties: SearchScopesOptionProperties,
): JSX.Element {
  const {
    label,
    onReset,
    onSelect,
    value,
  } = properties;
  const [isChecked, setIsChecked] = useState(false);
  return (
    <label className={styles.Option}>
      <input
        className={styles.OptionIndicator}
        name="scope"
        type="radio"
        value={value}
        onChange={(event) => {
          (event.target as HTMLInputElement).checked = true;
          setIsChecked(true);
          onSelect(event.target.value);
        }}
        onClick={(event) => {
          if (!isChecked) return;
          (event.target as HTMLInputElement).checked = false;
          setIsChecked(false);
          onReset();
        }}
      />
      <span className={styles.OptionName}>
        {label}
      </span>
    </label>
  );
}

function SearchScopes(properties: PropsWithChildren<unknown>): JSX.Element {
  const { children } = properties;
  return (
    <fieldset className={styles.Resources}>
      <legend className={styles.Legend}>
        Choose scope
      </legend>
      {children}
    </fieldset>
  );
}

export {
  SearchScopes,
  SearchScopesOption,
};
