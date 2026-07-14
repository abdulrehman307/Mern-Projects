import { SEO } from '../../components/seo/SEO';

export function Warnings() {
  return (
    <>
      <SEO 
        title="Severe Weather Warnings" 
        description="Advance severe weather alerts and risk mitigation tools for businesses."
        canonicalPath="/for-business/warnings"
      />
      <div className="py-12">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-4">Severe Weather Warnings</h1>
        <p className="text-text-secondary max-w-2xl">
          Coming soon. Proactive risk management and hyper-local alerts for extreme weather events.
        </p>
      </div>
    </>
  );
}
