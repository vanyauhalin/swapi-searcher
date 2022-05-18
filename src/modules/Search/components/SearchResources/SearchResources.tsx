import { useState } from 'react';
import { SearchResourceContext } from 'src/modules';
import styles from './SearchResources.module.css';

interface SearchResourcesOptionProperties {
  resource: string;
}

function SearchResourcesOption(
  properties: SearchResourcesOptionProperties,
): JSX.Element {
  const { resource } = properties;
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

interface SearchResourcesProperties {
  resources: string[];
}

function SearchResources(properties: SearchResourcesProperties): JSX.Element {
  const { resources } = properties;
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
