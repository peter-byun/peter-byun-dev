import { Container } from '../../ui/Container';
import { A } from '../../ui/A';
import Image from 'next/image';

import profilePic from './profile.jpg';

export default function About() {
  return (
    <section
      className="page-root"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 10rem)',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          marginBottom: '1rem',
        }}
      >
        <Image
          src={profilePic.src}
          width={50}
          height={37.5}
          style={{
            height: 'auto',
            borderRadius: '100%',
            border: '1.1px solid rgb(187 187 187 / 50%)',
          }}
          alt="profile picture"
        />
      </div>
      <Container
        level={2}
        style={{
          top: '25%',
          padding: '24px',
        }}
      >
        Hi! I'm Peter.
        <br /> <br />
        I'm a web developer specializing in building frontend applications with
        <strong>
          {' '}
          low-latency, high availability, fault tolerance, and observability.
        </strong>
        <br /> <br />
        And this is where I share my experiences of striving to build{' '}
        <strong> better products.</strong>
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
