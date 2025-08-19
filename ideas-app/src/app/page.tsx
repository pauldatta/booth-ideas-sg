import CodeGeniusClient from '@/components/home/CodeGeniusClient';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <CodeGeniusClient />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>built with ❤️ on firebase studio</p>
      </footer>
    </div>
  );
}
