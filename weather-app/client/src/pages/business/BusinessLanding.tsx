import { SEO } from '../../components/seo/SEO';

export function BusinessLanding() {
  return (
    <>
      <SEO 
        title="For Business" 
        description="Premium weather intelligence and data suites designed for enterprise needs."
        canonicalPath="/for-business"
      />
      <div className="py-12">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-4">Nimbus for Business</h1>
        <p className="text-text-secondary max-w-2xl">
          Coming soon. Enterprise-grade weather intelligence, custom APIs, and tailored alert systems for your operations.
        </p>
      </div>
    </>
  );
}
