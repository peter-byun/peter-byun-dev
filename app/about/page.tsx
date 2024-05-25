import { Container } from '../../components/base/Container';
import { A } from '../../components/base/A';

export default function About() {
  return (
    <section className="page-root">
      <Container
        level={2}
        style={{
          top: '25%',
          position: 'absolute',
        }}
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
}
