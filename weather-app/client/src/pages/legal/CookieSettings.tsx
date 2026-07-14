import { SEO } from '../../components/seo/SEO';

export function CookieSettings() {
  return (
    <>
      <SEO 
        title="Cookie Settings" 
        description="Manage your cookie preferences for Nimbus Weather."
        canonicalPath="/cookie-settings"
      />
      <article className="prose dark:prose-invert max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <h1>Cookie Settings</h1>
        <p className="lead">
          We use cookies to improve your experience on our site and to analyze performance and traffic.
        </p>

        {/* TODO: Implement actual cookie consent toggles */}
        <h2>Essential Cookies</h2>
        <p>
          These cookies are necessary for the website to function and cannot be switched off in our systems. 
          They are usually only set in response to actions made by you, such as saving your location preferences or theme settings.
        </p>

        <h2>Analytics Cookies</h2>
        <p>
          These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
        </p>
      </article>
    </>
  );
}
