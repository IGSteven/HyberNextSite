'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPartnerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const formData = new FormData(event.currentTarget);
    const partnerData = {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      creatorType: formData.get('creatorType') as string,
      profileImageUrl: formData.get('profileImageUrl') as string,
      bannerImageUrl: formData.get('bannerImageUrl') as string,
      description: formData.get('description') as string,
      shortDescription: formData.get('shortDescription') as string,
      testimonial: formData.get('testimonial') as string,
      discount: parseInt(formData.get('discount') as string, 10),
      affiliateId: formData.get('affiliateId') as string,
      featured: formData.get('featured') === 'on',
      audience: formData.get('audience') as string,
      contentFocus: formData.get('contentFocus') as string,
      socialLinks: {
        youtube: formData.get('youtube') as string,
        twitch: formData.get('twitch') as string,
        twitter: formData.get('twitter') as string,
        instagram: formData.get('instagram') as string,
        tiktok: formData.get('tiktok') as string,
        discord: formData.get('discord') as string,
        website: formData.get('website') as string,
      }
    };
    
    try {
      const response = await fetch('/api/admin/partners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partnerData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create partner');
      }
      
      router.push('/admin/partners');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating the partner');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Partner</h1>
        <Link 
          href="/admin/partners" 
          className="bg-muted hover:bg-muted/90 text-muted-foreground px-4 py-2 rounded"
        >
          Back to Partners
        </Link>
      </div>
      
      {error && (
        <div className="bg-destructive/20 border border-destructive text-destructive px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-card border border-border shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-1">
                      Partner Name *
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
                    <label htmlFor="slug" className="block text-sm font-medium text-card-foreground mb-1">
                      Slug * (URL-friendly name)
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      required
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="e.g. techguru, gamingwizard"
                    />
                  </div>
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
                      Content Focus/Niche
                    </label>
                    <input
                      type="text"
                      id="contentFocus"
                      name="contentFocus"
                      placeholder="E.g., Minecraft gameplay, tech reviews, programming tutorials"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              
              {/* Images */}
              <div>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="profileImageUrl" className="block text-sm font-medium text-card-foreground mb-1">
                      Profile Image URL *
                    </label>
                    <input
                      type="url"
                      id="profileImageUrl"
                      name="profileImageUrl"
                      required
                      placeholder="https://example.com/images/profile.jpg"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="bannerImageUrl" className="block text-sm font-medium text-card-foreground mb-1">
                      Banner Image URL (optional)
                    </label>
                    <input
                      type="url"
                      id="bannerImageUrl"
                      name="bannerImageUrl"
                      placeholder="https://example.com/images/banner.jpg"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              
              {/* Descriptions */}
              <div>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Descriptions</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="shortDescription" className="block text-sm font-medium text-card-foreground mb-1">
                      Short Description * (brief intro)
                    </label>
                    <input
                      type="text"
                      id="shortDescription"
                      name="shortDescription"
                      required
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-card-foreground mb-1">
                      Full Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="testimonial" className="block text-sm font-medium text-card-foreground mb-1">
                      Testimonial *
                    </label>
                    <textarea
                      id="testimonial"
                      name="testimonial"
                      rows={3}
                      required
                      placeholder="What the partner has to say about HyberHost"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="audience" className="block text-sm font-medium text-card-foreground mb-1">
                      Audience Description
                    </label>
                    <textarea
                      id="audience"
                      name="audience"
                      rows={2}
                      placeholder="Description of their audience demographics"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="youtube" className="block text-sm font-medium text-card-foreground mb-1">
                      YouTube
                    </label>
                    <input
                      type="url"
                      id="youtube"
                      name="youtube"
                      placeholder="https://youtube.com/c/channel"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="twitch" className="block text-sm font-medium text-card-foreground mb-1">
                      Twitch
                    </label>
                    <input
                      type="url"
                      id="twitch"
                      name="twitch"
                      placeholder="https://twitch.tv/channel"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-card-foreground mb-1">
                      Twitter
                    </label>
                    <input
                      type="url"
                      id="twitter"
                      name="twitter"
                      placeholder="https://twitter.com/username"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-card-foreground mb-1">
                      Instagram
                    </label>
                    <input
                      type="url"
                      id="instagram"
                      name="instagram"
                      placeholder="https://instagram.com/username"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="tiktok" className="block text-sm font-medium text-card-foreground mb-1">
                      TikTok
                    </label>
                    <input
                      type="url"
                      id="tiktok"
                      name="tiktok"
                      placeholder="https://tiktok.com/@username"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="discord" className="block text-sm font-medium text-card-foreground mb-1">
                      Discord
                    </label>
                    <input
                      type="url"
                      id="discord"
                      name="discord"
                      placeholder="https://discord.gg/invite"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-card-foreground mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      placeholder="https://example.com"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              
              {/* Partnership Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">Partnership Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="discount" className="block text-sm font-medium text-card-foreground mb-1">
                      Discount Percentage *
                    </label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      min="0"
                      max="100"
                      required
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="affiliateId" className="block text-sm font-medium text-card-foreground mb-1">
                      Affiliate ID *
                    </label>
                    <input
                      type="text"
                      id="affiliateId"
                      name="affiliateId"
                      required
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      className="h-4 w-4 text-primary focus:ring-primary rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-card-foreground">
                      Featured Partner (will be highlighted on partners page)
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4 flex justify-end space-x-4">
                <Link 
                  href="/admin/partners" 
                  className="px-6 py-2 bg-muted hover:bg-muted/90 text-muted-foreground font-medium rounded-lg transition-colors duration-300"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors duration-300 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Creating...' : 'Create Partner'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}