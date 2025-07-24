'use client';

import Layout from '../components/Layout';
import SimpleSearchBar from '../components/SearchBar/SimpleSearchBar';
import * as React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <SimpleSearchBar onSearch={() => router.push('/results')} />
    </Layout>
  );
}
