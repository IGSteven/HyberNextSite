import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPartner, getAllPartnerSlugs, addAffiliateIdToUrl } from '@/lib/partner-utils';
import { Metadata } from 'next';

// Helper function to ensure color has proper contrast for text
function getContrastColor(hexColor: string | undefined): string {
  // Default to blue if no brand color is provided
  if (!hexColor) return '#3B82F6';
  
  // For consistent UX, limit brightness of colors (too bright looks bad)
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Darken if too light for visual appeal
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (brightness > 200) {
    // Return a darker version for buttons and UI
    return `rgb(${Math.max(0, r - 60)}, ${Math.max(0, g - 60)}, ${Math.max(0, b - 60)})`;
  }
  
  return hexColor;
}

// Helper function to get a lighter version of the color for gradients and hover states
function getLighterColor(hexColor: string | undefined): string {
  if (!hexColor) return '#60A5FA'; // Default light blue
  
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Make lighter version (clamp to 255)
  const lighter = `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`;
  return lighter;
}

// Helper to determine if text should be white or black based on background
function getTextColor(hexColor: string | undefined): string {
  if (!hexColor) return 'white';
  
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate brightness using YIQ formula
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  // Return black for bright backgrounds, white for dark
  return (yiq >= 128) ? 'black' : 'white';
}

interface PartnerPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PartnerPageProps): Promise<Metadata> {
  const partner = await getPartner(params.slug);
  
  if (!partner) {
    return {
      title: 'Partner Not Found | HyberHost',
      description: 'This partner page could not be found.',
    };
  }
  
  return {
    title: `${partner.name} recommends HyberHost | Get ${partner.discount}% Off`,
    description: `${partner.name}, ${partner.creatorType}, recommends HyberHost for ${partner.contentFocus || 'hosting services'}. Get an exclusive ${partner.discount}% discount.`,
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPartnerSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function PartnerPage({ params }: PartnerPageProps) {
  const partner = await getPartner(params.slug);
  
  if (!partner) {
    notFound();
  }
  
  // Base URL for client area with affiliate ID
  const clientAreaBaseUrl = `https://clientarea.hyberhost.com`;
  const affiliateUrl = addAffiliateIdToUrl(clientAreaBaseUrl, partner.affiliateId);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Banner */}
      <div className="relative w-full">
        {partner.bannerImageUrl ? (
          <div className="relative h-80 w-full">
            <Image 
              src={partner.bannerImageUrl} 
              alt={`${partner.name}'s banner`}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ) : (
          <div 
            className="h-80 w-full" 
            style={{
              background: partner.brandColor 
                ? `linear-gradient(to right, ${getContrastColor(partner.brandColor)}, ${getLighterColor(partner.brandColor)})`
                : 'linear-gradient(to right, #2563EB, #4F46E5)'
            }}
          ></div>
        )}
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {partner.name} recommends HyberHost
          </h1>
          <p className="text-xl text-white mb-6 max-w-2xl mx-auto drop-shadow-md">
            Join {partner.name}'s community with an exclusive {partner.discount}% discount on our hosting services
          </p>
          <Link 
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: getContrastColor(partner.brandColor),
              color: getTextColor(partner.brandColor) === 'white' ? 'white' : 'black'
            }}
            className="inline-block hover:opacity-90 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg"
          >
            Get {partner.discount}% Off Now
          </Link>
        </div>
      </div>
      
      {/* Creator Profile Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-accent shadow-xl">
              <Image 
                src={partner.profileImageUrl || '/placeholder-user.jpg'} 
                alt={partner.name}
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-center">{partner.name}</h2>
            <p className="text-muted-foreground mb-4 text-center">{partner.creatorType}</p>
            
            <div className="flex justify-center gap-4 mb-6">
              {partner.socialLinks.youtube && (
                <a href={partner.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              )}
              {partner.socialLinks.twitch && (
                <a href={partner.socialLinks.twitch} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.731v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" fillRule="evenodd" clipRule="evenodd"/>
                  </svg>
                </a>
              )}
              {partner.socialLinks.twitter && (
                <a href={partner.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
              )}
              {partner.socialLinks.instagram && (
                <a href={partner.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {partner.socialLinks.tiktok && (
                <a href={partner.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              )}
              {partner.socialLinks.discord && (
                <a href={partner.socialLinks.discord} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </a>
              )}
              {partner.socialLinks.website && (
                <a href={partner.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
                  </svg>
                </a>
              )}
            </div>
            
            {partner.audience && (
              <div className="bg-card border border-border p-4 rounded-lg mb-6 w-full">
                <h3 className="font-semibold mb-2">Audience</h3>
                <p className="text-muted-foreground text-sm">{partner.audience}</p>
              </div>
            )}
            
            {partner.contentFocus && (
              <div className="bg-card border border-border p-4 rounded-lg w-full">
                <h3 className="font-semibold mb-2">Content Focus</h3>
                <p className="text-muted-foreground text-sm">{partner.contentFocus}</p>
              </div>
            )}
          </div>
          
          <div className="md:w-2/3">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">About {partner.name}</h3>
              <p className="text-card-foreground mb-6 leading-relaxed">
                {partner.description}
              </p>
              
              {partner.testimonial && (
                <div className="bg-muted/30 p-6 rounded-lg border border-accent mb-8">
                  <h3 className="text-xl font-bold mb-4 text-primary">Why I Recommend HyberHost</h3>
                  <div className="flex items-start mb-4">
                    <div className="text-primary mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <blockquote className="italic text-card-foreground">
                      "{partner.testimonial}"
                    </blockquote>
                  </div>
                </div>
              )}
            </div>
            
            {/* Services the partner uses */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-4">Services I Use</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {partner.servicesUsed.map(service => (
                  <div key={service.id} className="border border-border rounded-lg p-4 bg-card">
                    <h4 className="font-bold text-lg mb-2">{service.name}</h4>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                    <div className="mt-3 inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                      {service.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Services the partner recommends */}
            <div>
              <h3 className="text-2xl font-bold mb-4">My Recommendations for You</h3>
              <div className="grid grid-cols-1 gap-4">
                {partner.recommendedServices.map(service => (
                  <div 
                    key={service.id} 
                    className={`border border-border ${service.recommended ? 'bg-accent/20' : 'bg-card'} rounded-lg p-5 shadow-sm`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="font-bold text-lg mb-2">{service.name}</h4>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                            {service.type}
                          </span>
                          {service.recommended && (
                            <span className="inline-block bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                              Highly Recommended
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Link 
                          href={service.url ? addAffiliateIdToUrl(service.url, partner.affiliateId) : affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: service.recommended ? getContrastColor(partner.brandColor) : undefined,
                            color: service.recommended && getTextColor(partner.brandColor) === 'white' ? 'white' : undefined
                          }}
                          className={`inline-block ${service.recommended ? 'hover:opacity-90 text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-muted-foreground'} font-semibold py-2 px-6 rounded-lg transition-colors duration-300`}
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to action */}
      <div 
        style={{
          background: partner.brandColor 
            ? `linear-gradient(to right, ${getContrastColor(partner.brandColor)}, ${getLighterColor(partner.brandColor)})`
            : 'linear-gradient(to right, #3B82F6, #4F46E5)'
        }}
        className="py-16 px-4 mt-auto"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join {partner.name} and thousands of others using HyberHost
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Sign up today and get an exclusive {partner.discount}% discount on all our hosting services when you use {partner.name}'s affiliate link.
          </p>
          <Link 
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg"
            style={{
              color: getContrastColor(partner.brandColor)
            }}
          >
            Get {partner.discount}% Off Today
          </Link>
        </div>
      </div>
    </div>
  );
}