import Head from 'next/head'
import { Inter } from 'next/font/google'
import Dashboard from '@/containers/Dashboard';
import NavbarComponent from '@/components/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>RecipeHub</title>
        <meta name="description" content="RecipeHub" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavbarComponent />
        <Dashboard />
      </main>
    </>
  );
}
