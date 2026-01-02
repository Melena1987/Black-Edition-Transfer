
import React from 'react';
import { ArrowLeft, ShieldCheck, Scale, Cookie } from 'lucide-react';

interface LegalProps {
  onBack: () => void;
}

const Legal: React.FC<LegalProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black text-gray-300 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gold hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-xs font-bold">Back to Home</span>
        </button>

        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white serif mb-4">Legal <span className="text-gold italic">Information</span></h1>
          <p className="text-gold tracking-[0.3em] uppercase text-xs font-bold">Black Edition Transfer Marbella</p>
        </header>

        <div className="space-y-20">
          {/* Legal Notice */}
          <section id="notice">
            <div className="flex items-center gap-4 mb-6">
              <Scale className="text-gold" size={32} />
              <h2 className="text-3xl font-bold text-white serif">Legal Notice</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>In compliance with Law 34/2002, of July 11, on Services of the Information Society and Electronic Commerce (LSSI-CE), the user is informed of the identity of the owner of this website:</p>
              <ul className="list-none space-y-2 border-l border-gold/30 pl-6 my-6">
                <li><span className="text-white font-bold uppercase tracking-wider text-[10px] block">Owner:</span> Fernando Juan Franco</li>
                <li><span className="text-white font-bold uppercase tracking-wider text-[10px] block">VAT Number (NIF):</span> X3662854N</li>
                <li><span className="text-white font-bold uppercase tracking-wider text-[10px] block">Address:</span> Marbella, Málaga (Spain)</li>
                <li><span className="text-white font-bold uppercase tracking-wider text-[10px] block">Contact:</span> +34 650 718 410 / agpmarbellatransfers@gmail.com</li>
              </ul>
              <p>Access to and use of this website attributes the status of USER, who accepts, from said access and/or use, the General Conditions of Use reflected here.</p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section id="privacy">
            <div className="flex items-center gap-4 mb-6">
              <ShieldCheck className="text-gold" size={32} />
              <h2 className="text-3xl font-bold text-white serif">Privacy Policy</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>In accordance with the General Data Protection Regulation (EU) 2016/679 (GDPR) and the Organic Law 3/2018 (LOPDGDD), we inform you how we process your personal data.</p>
              <h3 className="text-white font-bold mt-6 uppercase tracking-widest text-xs">1. Data Controller</h3>
              <p>The controller is Fernando Juan Franco, with VAT number X3662854N.</p>
              
              <h3 className="text-white font-bold mt-6 uppercase tracking-widest text-xs">2. Purpose of Processing</h3>
              <p>We collect and process your data via WhatsApp or forms to manage your transfer bookings, respond to inquiries, and provide the requested chauffeur services. We do not use your data for automated decision-making or profiling.</p>
              
              <h3 className="text-white font-bold mt-6 uppercase tracking-widest text-xs">3. Legal Basis</h3>
              <p>The processing is based on the performance of a contract (booking a transfer) or the user's consent when contacting us.</p>
              
              <h3 className="text-white font-bold mt-6 uppercase tracking-widest text-xs">4. Data Retention</h3>
              <p>Personal data will be kept for as long as necessary to fulfill the purpose for which it was collected and to determine possible liabilities that could arise from said purpose and the processing of the data.</p>
              
              <h3 className="text-white font-bold mt-6 uppercase tracking-widest text-xs">5. User Rights</h3>
              <p>You have the right to access, rectify, delete, limit processing, or oppose processing of your data. To exercise these rights, please send an email to agpmarbellatransfers@gmail.com accompanied by a copy of your ID.</p>
            </div>
          </section>

          {/* Cookie Policy */}
          <section id="cookies">
            <div className="flex items-center gap-4 mb-6">
              <Cookie className="text-gold" size={32} />
              <h2 className="text-3xl font-bold text-white serif">Cookie Policy</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>This website uses technical cookies that are strictly necessary for its operation and to store your preferences regarding cookie consent.</p>
              <h3 className="text-white font-bold mt-6 uppercase tracking-widest text-xs">What are cookies?</h3>
              <p>A cookie is a small text file that a website stores on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences over a period of time.</p>
              <h3 className="text-white font-bold mt-6 uppercase tracking-widest text-xs">Types of cookies used</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="text-white font-bold">Technical Cookies:</span> Essential for the user to navigate through the website and use its features.</li>
                <li><span className="text-white font-bold">Preference Cookies:</span> To remember whether you have accepted our cookie policy.</li>
              </ul>
              <p>You can manage or disable cookies through your browser settings, although this may affect the functionality of the website.</p>
            </div>
          </section>
        </div>

        <footer className="mt-24 pt-12 border-t border-white/10 text-center">
          <p className="text-[10px] uppercase tracking-widest text-gray-500">© {new Date().getFullYear()} Black Edition Transfer Marbella | Fernando Juan Franco</p>
        </footer>
      </div>
    </div>
  );
};

export default Legal;
