import React from 'react';
import { Metadata } from 'next';
import PartnerApplicationForm from '@/components/partner-application-form';

export const metadata: Metadata = {
  title: 'Become a Partner | HyberHost',
  description: 'Join the HyberHost Partner Program. Apply today to become a content creator partner and earn commissions while providing exclusive discounts to your audience.',
};

export default function BecomePartnerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Become a HyberHost Partner</h1>
          <p className="text-lg mb-6 text-muted-foreground">
            Join our content creator program and earn commissions while providing your audience with exclusive hosting discounts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card border border-border p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Exclusive Discounts</h3>
            <p className="text-center text-muted-foreground">
              Offer your audience exclusive discounts on our premium hosting services.
            </p>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Earn Commissions</h3>
            <p className="text-center text-muted-foreground">
              Receive competitive commission rates on all referrals from your audience.
            </p>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Dedicated Support</h3>
            <p className="text-center text-muted-foreground">
              Get direct access to our dedicated partner support team for you and your audience.
            </p>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-16">
          <div className="p-6 md:p-8 bg-muted border-b border-border">
            <h2 className="text-2xl font-bold">Partner Program Benefits</h2>
          </div>
          <div className="p-6 md:p-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Custom Discount Codes</h3>
                  <p className="text-muted-foreground">Provide your audience with personalized discount codes for our services.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Commissions Up to 25%</h3>
                  <p className="text-muted-foreground">Earn up to 25% commission on all initial and recurring payments.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Dedicated Partner Page</h3>
                  <p className="text-muted-foreground">Get your own branded page on our website to share with your audience.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Free Services</h3>
                  <p className="text-muted-foreground">Receive complimentary hosting services based on your partnership tier.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Marketing Support</h3>
                  <p className="text-muted-foreground">Get custom marketing materials and support for your promotions.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 md:p-8 bg-muted border-b border-border">
            <h2 className="text-2xl font-bold">Apply to Become a Partner</h2>
            <p className="text-muted-foreground mt-2">
              Complete the form below to apply for our Content Creator Partner Program.
            </p>
          </div>
          <div className="p-6 md:p-8">
            <PartnerApplicationForm />
          </div>
        </div>
      </div>
    </div>
  );
}