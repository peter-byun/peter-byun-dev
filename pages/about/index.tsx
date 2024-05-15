import { ReactElement } from 'react';

import Layout from '../../components/global/Layout';
import { Container } from '../../components/base/Container';
import { A } from '../../components/base/A';
import { pageRoot } from '../../styles/mixins';
import { css } from '@emotion/react';

const About = () => {
  return (
    <section css={pageRoot}>
      <Container
        level={2}
        css={css`
          top: 25%;
          position: absolute;
        `}
      >
        Hello! I'm Peter.
        <br /> <br />
        I'm a web developer, and my motto is to create an immersive web
        experience.
        <br /> <br />
        I do whatever it takes to make a better website; this blog is where I
        share things I learned from my experience.
        <br /> <br />
        If you want to talk to me for any reason, you can find me on{' '}
        <A href="https://www.linkedin.com/in/donghyeok-byun-0b719619a/">
          LinkedIn
        </A>{' '}
        or leave a comment.
      </Container>
    </section>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
