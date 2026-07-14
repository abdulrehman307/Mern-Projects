import { SEO } from '../../components/seo/SEO';

export function SupportCenter() {
  return (
    <>
      <SEO 
        title="Support Center" 
        description="Get help with Nimbus Weather, check system status, and read FAQs."
        canonicalPath="/support"
      />
      <article className="prose dark:prose-invert max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <h1>Support Center</h1>
        <p className="lead">How can we help you today?</p>
        
        <h2>Frequently Asked Questions</h2>
        
        <h3>How often is the weather data updated?</h3>
        <p>
          Our data is sourced from WeatherAPI.com and updates in real-time, typically refreshing every 10 to 15 minutes.
        </p>

        <h3>Can I save multiple locations?</h3>
        <p>
          Yes, you can search for a location and then pin it to your favorites sidebar for quick access.
        </p>

        <h3>Is there a mobile app?</h3>
        <p>
          Nimbus is a Progressive Web App (PWA). You can "Add to Home Screen" on your mobile device for an app-like experience.
        </p>

        <h2>Contact Support</h2>
        <p>
          If you need further assistance, please contact us at <a href="mailto:support@nimbusweather.example">support@nimbusweather.example</a>.
        </p>
      </article>
    </>
  );
}
