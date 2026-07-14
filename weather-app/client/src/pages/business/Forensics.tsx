import { SEO } from '../../components/seo/SEO';

export function Forensics() {
  return (
    <>
      <SEO 
        title="Weather Forensics" 
        description="Post-event meteorological analysis and historical weather investigations."
        canonicalPath="/for-business/forensics"
      />
      <div className="py-12">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-4">Weather Forensics</h1>
        <p className="text-text-secondary max-w-2xl">
          Coming soon. Detailed post-event analysis for insurance, agriculture, and logistics.
        </p>
      </div>
    </>
  );
}
