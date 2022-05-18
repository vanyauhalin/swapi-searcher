import { Layout, Logo } from 'src/components';
import { Search } from 'src/modules';
import styles from './Home.module.css';

function Home(): JSX.Element {
  return (
    <Layout>
      <Logo className={styles.Logo} />
      <Search />
    </Layout>
  );
}

export {
  Home,
};
