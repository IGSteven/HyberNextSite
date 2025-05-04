'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updatePartner } from '@/app/actions/partner-actions';

export default function EditPartnerPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [partner, setPartner] = useState<any>(null);
  const [brandColor, setBrandColor] = useState('#3B82F6');
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const colorTextRef = useRef<HTMLInputElement>(null);
  const { slug } = params;
  
  useEffect(() => {
    async function fetchPartnerData() {
      try {
        const response = await fetch(`/api/admin/partners/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch partner data');
        }
        const data = await response.json();
        if (data.success && data.partner) {
          setPartner(data.partner);
          // Set initial brand color state from partner data
          if (data.partner.brandColor) {
            setBrandColor(data.partner.brandColor);
          }
        } else {
          throw new Error(data.error || 'Partner not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching partner data');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPartnerData();
  }, [slug]);

  // Handle color picker change
  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBrandColor(newColor);
    if (colorTextRef.current) {
      colorTextRef.current.value = newColor;
    }
  };

  // Handle color text field change
  const handleColorTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newColor)) {
      setBrandColor(newColor);
      if (colorPickerRef.current) {
        colorPickerRef.current.value = newColor;
      }
    }
  };
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const formData = new FormData(event.currentTarget);
      const result = await updatePartner(slug, formData);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update partner');
      }
      
      router.push('/admin/partners');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating the partner');
      setIsSubmitting(false);
    }
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Partner</h1>
        </div>
        <div className="bg-card border border-border p-12 rounded-lg">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Partner</h1>
          <Link 
            href="/admin/partners" 
            className="bg-muted hover:bg-muted/90 text-muted-foreground px-4 py-2 rounded"
          >
            Back to Partners
          </Link>
        </div>
        <div className="bg-destructive/20 border border-destructive text-destructive p-6 rounded-lg">
          <p className="mb-4">{error}</p>
          <Link 
            href="/admin/partners"
            className="bg-muted hover:bg-muted/90 text-muted-foreground px-4 py-2 rounded"
          >
            Return to Partner List
          </Link>
        </div>
      </div>
    );
  }
  
  if (!partner) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Partner</h1>
          <Link 
            href="/admin/partners" 
            className="bg-muted hover:bg-muted/90 text-muted-foreground px-4 py-2 rounded"
          >
            Back to Partners
          </Link>
        </div>
        <div className="bg-destructive/20 border border-destructive text-destructive p-6 rounded-lg">
          <p className="mb-4">Partner not found</p>
          <Link 
            href="/admin/partners"
            className="bg-muted hover:bg-muted/90 text-muted-foreground px-4 py-2 rounded"
          >
            Return to Partner List
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Partner: {partner.name}</h1>
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
                      defaultValue={partner.name}
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
                      defaultValue={partner.slug}
                      readOnly
                      className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Slug cannot be changed to maintain URL consistency</p>
                  </div>
                  <div>
                    <label htmlFor="creatorType" className="block text-sm font-medium text-card-foreground mb-1">
                      Creator Type *
                    </label>
                    <select
                      id="creatorType"
                      name="creatorType"
                      required
                      defaultValue={partner.creatorType}
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
                      defaultValue={partner.contentFocus || ''}
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
                      defaultValue={partner.profileImageUrl}
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
                      defaultValue={partner.bannerImageUrl || ''}
                      placeholder="https://example.com/images/banner.jpg"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="brandColor" className="block text-sm font-medium text-card-foreground mb-1">
                      Brand Color (optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        id="brandColor"
                        name="brandColor"
                        value={brandColor}
                        className="h-10 w-16 p-0 border border-border rounded cursor-pointer"
                        onChange={handleColorPickerChange}
                        ref={colorPickerRef}
                      />
                      <input
                        type="text"
                        id="brandColorText"
                        name="brandColor"
                        value={brandColor}
                        placeholder="#3B82F6"
                        pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                        className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        onChange={handleColorTextChange}
                        ref={colorTextRef}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Color used for headers and buttons on partner page</p>
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
                      defaultValue={partner.shortDescription}
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
                      defaultValue={partner.description}
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="servicesUsed" className="block text-sm font-medium text-card-foreground mb-1">
                      Services Used (Markdown format) *
                    </label>
                    <textarea
                      id="servicesUsed"
                      name="servicesUsed"
                      rows={6}
                      required
                      defaultValue={typeof partner.servicesUsed === 'string' 
                        ? partner.servicesUsed 
                        : Array.isArray(partner.servicesUsed)
                          ? partner.servicesUsed.map(s => `**${s.name}** - ${s.description}`).join('\n\n')
                          : ''}
                      placeholder="**Service Name** - Service description\n\n**Another Service** - Another description"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    ></textarea>
                    <p className="text-xs text-muted-foreground mt-1">Use markdown format for services. Bold service names with ** (double asterisks) and separate services with blank lines.</p>
                  </div>
                  <div>
                    <label htmlFor="testimonial" className="block text-sm font-medium text-card-foreground mb-1">
                      Testimonial
                    </label>
                    <textarea
                      id="testimonial"
                      name="testimonial"
                      rows={3}
                      defaultValue={partner.testimonial || ''}
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
                      defaultValue={partner.audience || ''}
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
                      defaultValue={partner.socialLinks?.youtube || ''}
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
                      defaultValue={partner.socialLinks?.twitch || ''}
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
                      defaultValue={partner.socialLinks?.twitter || ''}
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
                      defaultValue={partner.socialLinks?.instagram || ''}
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
                      defaultValue={partner.socialLinks?.tiktok || ''}
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
                      defaultValue={partner.socialLinks?.discord || ''}
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
                      defaultValue={partner.socialLinks?.website || ''}
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
                      defaultValue={partner.discount}
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
                      defaultValue={partner.affiliateId}
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
                      defaultChecked={partner.featured}
                      className="h-4 w-4 text-primary focus:ring-primary rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-card-foreground">
                      Featured Partner (will be highlighted on partners page)
                    </label>
                  </div>
                  <div className="flex items-center mt-3">
                    <input
                      type="checkbox"
                      id="isShareholder"
                      name="isShareholder"
                      defaultChecked={partner.isShareholder}
                      className="h-4 w-4 text-primary focus:ring-primary rounded"
                    />
                    <label htmlFor="isShareholder" className="ml-2 block text-sm text-card-foreground">
                      Partner is a shareholder (shows ownership disclosure on partner page)
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
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}