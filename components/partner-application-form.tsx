'use client';

import React, { useState } from 'react';
import { submitPartnerApplication } from '@/app/actions/partner-actions';

export default function PartnerApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    ticketNumber?: string;
    error?: string;
  }>({});
  
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    
    try {
      const result = await submitPartnerApplication(formData);
      
      if (result.success) {
        setResult({
          success: true,
          ticketNumber: result.ticketNumber
        });
        // Reset form
        (document.getElementById('partner-application-form') as HTMLFormElement).reset();
      } else {
        setResult({
          success: false,
          error: result.error || 'Failed to submit application. Please try again.'
        });
      }
    } catch (error) {
      setResult({
        success: false,
        error: (error as Error).message
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  if (result.success) {
    return (
      <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg border border-border">
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 mb-6">
            <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
          <p className="text-lg mb-6 text-card-foreground">
            Thank you for your interest in our Partner Program. Your application has been received and our partnerships team will review it soon.
          </p>
          {result.ticketNumber && (
            <p className="text-md mb-6">
              Your application reference number is: <span className="font-semibold">{result.ticketNumber}</span>
            </p>
          )}
          <p className="text-muted-foreground mb-6">
            We'll be in touch via email within 2-3 business days to discuss your application and next steps.
          </p>
          <button
            onClick={() => setResult({})}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg border border-border">
      <h2 className="text-2xl font-bold mb-6">Partner Program Application</h2>
      
      {result.error && (
        <div className="bg-destructive/20 border border-destructive text-destructive px-4 py-3 rounded mb-6">
          {result.error}
        </div>
      )}
      
      <form id="partner-application-form" action={handleSubmit}>
        <div className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>
          
          {/* Content Creator Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Content Creator Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="creatorType" className="block text-sm font-medium text-card-foreground mb-1">
                  Creator Type *
                </label>
                <select
                  id="creatorType"
                  name="creatorType"
                  required
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select creator type</option>
                  <option value="YouTuber">YouTuber</option>
                  <option value="Twitch Streamer">Twitch Streamer</option>
                  <option value="Gaming Content Creator">Gaming Content Creator</option>
                  <option value="Tech Content Creator">Tech Content Creator</option>
                  <option value="Educational Content Creator">Educational Content Creator</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="contentFocus" className="block text-sm font-medium text-card-foreground mb-1">
                  Content Focus/Niche *
                </label>
                <input
                  type="text"
                  id="contentFocus"
                  name="contentFocus"
                  required
                  placeholder="E.g., Minecraft gameplay, tech reviews, programming tutorials"
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>
          
          {/* Audience Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Audience Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="audienceSize" className="block text-sm font-medium text-card-foreground mb-1">
                  Audience Size *
                </label>
                <select
                  id="audienceSize"
                  name="audienceSize"
                  required
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select audience size</option>
                  <option value="Under 5,000">Under 5,000 followers/subscribers</option>
                  <option value="5,000-10,000">5,000-10,000 followers/subscribers</option>
                  <option value="10,000-50,000">10,000-50,000 followers/subscribers</option>
                  <option value="50,000-100,000">50,000-100,000 followers/subscribers</option>
                  <option value="100,000-500,000">100,000-500,000 followers/subscribers</option>
                  <option value="Over 500,000">Over 500,000 followers/subscribers</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="audienceDemo" className="block text-sm font-medium text-card-foreground mb-1">
                  Audience Demographics
                </label>
                <textarea
                  id="audienceDemo"
                  name="audienceDemo"
                  rows={3}
                  placeholder="Please describe your audience demographics (age range, interests, geographic regions, etc.)"
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Social Media Channels */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Social Media Channels</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="youtubeChannel" className="block text-sm font-medium text-card-foreground mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  id="youtubeChannel"
                  name="youtubeChannel"
                  placeholder="https://youtube.com/c/yourchannel"
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="twitchChannel" className="block text-sm font-medium text-card-foreground mb-1">
                  Twitch Channel URL
                </label>
                <input
                  type="url"
                  id="twitchChannel"
                  name="twitchChannel"
                  placeholder="https://twitch.tv/yourchannel"
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="otherSocial" className="block text-sm font-medium text-card-foreground mb-1">
                  Other Social Media Links
                </label>
                <textarea
                  id="otherSocial"
                  name="otherSocial"
                  rows={2}
                  placeholder="Additional social media platforms (Twitter, Instagram, Discord, etc.)"
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Hosting Requirements */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Hosting Requirements</h3>
            <div>
              <label htmlFor="hostingNeeds" className="block text-sm font-medium text-card-foreground mb-1">
                What are you looking for in a hosting provider? *
              </label>
              <textarea
                id="hostingNeeds"
                name="hostingNeeds"
                rows={4}
                required
                placeholder="Please describe your hosting needs (e.g., game servers, web hosting, VPS, etc.) and any specific requirements"
                className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              ></textarea>
            </div>
          </div>
          
          {/* Additional Information */}
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-card-foreground mb-1">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              rows={3}
              placeholder="Anything else you'd like to share about your content or partnership goals"
              className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-colors duration-300 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}