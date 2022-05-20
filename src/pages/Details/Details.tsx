import {
  Layout,
  LayoutFooter,
  LayoutHeader,
  LayoutMain,
  Logo,
} from 'src/components';
import { Search } from 'src/modules';
import styles from './Details.module.css';

function Details(): JSX.Element {
  return (
    <Layout className={styles.Details}>
      <LayoutHeader className={styles.DetailsHeader}>
        <Logo />
        <Search className={styles.DetailsSearch} />
      </LayoutHeader>
      <LayoutMain>
        main
      </LayoutMain>
      <LayoutFooter />
    </Layout>
  );
}

export {
  Details,
};
