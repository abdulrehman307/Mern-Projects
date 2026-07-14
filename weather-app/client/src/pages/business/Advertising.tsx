import { SEO } from '../../components/seo/SEO';
import { Mail, Phone, Target, Users, Layout } from 'lucide-react';

export function Advertising() {
  return (
    <>
      <SEO 
        title="Advertise with Nimbus" 
        description="Reach a highly engaged audience with hyper-local targeting and premium ad placements on Nimbus Weather."
        canonicalPath="/advertising"
      />
      
      <div className="py-10 max-w-5xl mx-auto space-y-16 px-4 sm:px-6">
        
        {/* Header Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-text-primary">
            Connect with High-Intent Audiences
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Leverage Nimbus's precision weather data to deliver contextual, highly relevant advertising when users are making critical daily decisions.
          </p>
        </section>

        {/* Benefits Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-bg-surface border border-border p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Hyper-Local Targeting</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Target campaigns by zip code, specific weather conditions (e.g., rain, high UV), and temperature thresholds.
            </p>
          </div>

          <div className="bg-bg-surface border border-border p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">High-Intent Audience</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Reach users actively planning travel, outdoor activities, agriculture, and daily commutes.
            </p>
          </div>

          <div className="bg-bg-surface border border-border p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Premium Placements</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Non-intrusive native dashboard integration that respects the user experience while driving high CTRs.
            </p>
          </div>
        </section>

        {/* Policies Section */}
        <section className="bg-bg-elevated/50 border border-border rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Ad Policies & Guidelines</h2>
          <div className="prose dark:prose-invert max-w-none text-sm text-text-secondary">
            <ul>
              <li><strong>No Intrusive Formats:</strong> Pop-ups, auto-playing audio, and screen takeovers are strictly prohibited.</li>
              <li><strong>Contextual Relevance:</strong> We favor campaigns that align with weather context (e.g., umbrella sales during rain, HVAC services during heatwaves).</li>
              <li><strong>Privacy First:</strong> We do not sell personally identifiable information (PII). All targeting is aggregated and anonymized.</li>
            </ul>
          </div>
        </section>

        {/* Contact Card */}
        <section className="flex justify-center">
          <div className="bg-gradient-to-br from-bg-surface to-bg-base border border-border p-8 rounded-3xl shadow-lg w-full max-w-md text-center space-y-6">
            <h3 className="text-xl font-bold text-text-primary">Ready to Launch?</h3>
            <p className="text-sm text-text-secondary">
              Contact our partnerships team for media kits, custom integrations, and pricing.
            </p>
            
            <div className="space-y-3 pt-4">
              <a 
                href="mailto:abdulrehman0056922@gmail.com"
                className="flex items-center justify-center gap-3 w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 rounded-xl font-semibold transition-colors shadow-md shadow-accent/20"
              >
                <Mail className="w-5 h-5" />
                Email Partnerships
              </a>
              <a 
                href="tel:+92360056922"
                className="flex items-center justify-center gap-3 w-full bg-bg-elevated hover:bg-bg-elevated/80 border border-border text-text-primary py-3 rounded-xl font-medium transition-colors"
              >
                <Phone className="w-5 h-5" />
                +92 360 056922
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
