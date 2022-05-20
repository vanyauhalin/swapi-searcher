import {
  Layout,
  LayoutFooter,
  LayoutMain,
  Logo,
} from 'src/components';
import { Search } from 'src/modules';
import styles from './Home.module.css';

function Home(): JSX.Element {
  return (
    <Layout className={styles.HomeLayout}>
      <LayoutMain className={styles.HomeLayoutMain}>
        <Logo size="large" />
        <Search />
      </LayoutMain>
      <LayoutFooter />
    </Layout>
  );
}

export {
  Home,
};
