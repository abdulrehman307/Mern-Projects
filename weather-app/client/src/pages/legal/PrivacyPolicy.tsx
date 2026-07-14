import { SEO } from '../../components/seo/SEO';

export function PrivacyPolicy() {
  return (
    <>
      <SEO 
        title="Privacy Policy" 
        description="Learn how Nimbus Weather collects, uses, and protects your data."
        canonicalPath="/privacy-policy"
      />
      <article className="prose dark:prose-invert max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>
          We collect information to provide better weather services to our users. 
          This includes your location data (when granted explicitly) to serve hyper-local forecasts.
        </p>

        {/* TODO: Legal Review Required */}
        <h2>2. How We Use Information</h2>
        <p>
          Your data is used strictly for personalizing the weather dashboard experience. 
          We do not sell your personal location data to third parties.
        </p>
      </article>
    </>
  );
}
