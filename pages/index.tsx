import Layout from '../components/global/Layout';
import { NextPageWithLayout } from '../types/component-types';

export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: '/posts',
    },
  };
};

const Index: NextPageWithLayout = () => {
  return <section></section>;
};

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Index;
