import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export default function Page() {
  permanentRedirect('/posts');
}

export const metadata: Metadata = {
  title: 'Blog Home',
  description: "Peter Byun's Software Engineering Blog",
};
