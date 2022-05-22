import { useLocation } from 'react-router';
import {
  Layout,
  LayoutFooter,
  LayoutHeader,
  LayoutMain,
  Logo,
} from 'src/components';
import { Feed, Search } from 'src/modules';
import type { swapi } from 'src/plugins';
import { extractParameters } from 'src/utils';
import styles from './Details.module.css';

function Details(): JSX.Element {
  const location = useLocation();
  const { id, query, scope } = extractParameters<{
    scope: keyof typeof swapi.rest;
  }>(location.search);
  return (
    <Layout className={styles.Details}>
      <LayoutHeader className={styles.DetailsHeader}>
        <Logo />
        <Search
          className={styles.DetailsSearch}
          query={query}
        />
      </LayoutHeader>
      <LayoutMain className={styles.DetailsMain}>
        {query
          ? (
            <Feed
              id={id}
              query={query}
              scope={scope}
            />
          )
          : 404}
      </LayoutMain>
      <LayoutFooter />
    </Layout>
  );
}

export {
  Details,
};
