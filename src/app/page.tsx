import { Header, Footer } from '@/components/layouts';
import { Button } from '@/components/ui';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to Flexible Form
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A professional Next.js application built with TypeScript, Tailwind CSS, and best
              practices for scalable development.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="TypeScript"
              description="Fully typed with strict mode enabled for better code quality and developer experience."
            />
            <FeatureCard
              title="Path Aliases"
              description="Clean imports with @ aliases configured for all major directories."
            />
            <FeatureCard
              title="Code Quality"
              description="ESLint, Prettier, and Husky configured for consistent code style."
            />
            <FeatureCard
              title="Professional Structure"
              description="Organized folder structure following industry best practices."
            />
            <FeatureCard
              title="Reusable Components"
              description="Pre-built UI components and custom hooks ready to use."
            />
            <FeatureCard
              title="API Client"
              description="Type-safe API client for easy backend integration."
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}
