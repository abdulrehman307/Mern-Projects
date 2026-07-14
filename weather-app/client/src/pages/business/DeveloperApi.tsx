import { SEO } from '../../components/seo/SEO';

export function DeveloperApi() {
  return (
    <>
      <SEO 
        title="Developer API" 
        description="Access Nimbus weather data programmatically."
        canonicalPath="/developer-api"
      />
      <div className="py-12">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-4">Developer API</h1>
        <p className="text-text-secondary max-w-2xl">
          Coming soon. Programmatic access to our high-fidelity global sensor network.
        </p>
      </div>
    </>
  );
}
