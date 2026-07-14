import { SEO } from '../../components/seo/SEO';

export function TermsOfService() {
  return (
    <>
      <SEO 
        title="Terms of Service" 
        description="Terms and conditions for using the Nimbus Weather platform."
        canonicalPath="/terms-of-service"
      />
      <article className="prose dark:prose-invert max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <h1>Terms of Service</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Nimbus Weather, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        {/* TODO: Legal Review Required */}
        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily use the materials on Nimbus Weather's website for personal, non-commercial transitory viewing only.
        </p>

        <h2>3. Disclaimer</h2>
        <p>
          The materials on Nimbus Weather's website are provided on an 'as is' basis. Nimbus makes no warranties, expressed or implied, regarding the accuracy of weather data.
        </p>
      </article>
    </>
  );
}
