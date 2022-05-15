import { useState } from 'react';
import { SearchResourceContext } from 'src/modules';
import styles from './SearchResources.module.css';

function SearchResourcesOption({
  resource,
}: {
  resource: string;
}): JSX.Element {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <label className={styles.Option}>
      <SearchResourceContext.Consumer>
        {({ setResource, resetResource }) => (
          <input
            className={styles.OptionIndicator}
            name="resource"
            type="radio"
            value={resource.toLowerCase()}
            onChange={(event) => {
              setIsChecked(true);
              setResource(event.target.value);
            }}
            onClick={() => {
              if (isChecked) {
                setIsChecked(false);
                resetResource();
              }
            }}
          />
        )}
      </SearchResourceContext.Consumer>
      <span className={styles.OptionName}>
        {resource}
      </span>
    </label>
  );
}

function SearchResources({
  resources,
}: {
  resources: string[];
}): JSX.Element {
  return (
    <fieldset className={styles.Resources}>
      <legend className={styles.Legend}>
        Choose resource
      </legend>
      {resources.map((resource) => (
        <SearchResourcesOption
          key={resource}
          resource={resource}
        />
      ))}
    </fieldset>
  );
}

export {
  SearchResources,
};
