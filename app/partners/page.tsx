import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPartners } from '@/lib/partner-utils';
import { Partner } from '@/lib/partner-types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Creator Partners | HyberHost',
  description: 'Discover HyberHost\'s content creator partners and get exclusive discounts on hosting services recommended by your favorite streamers and YouTubers.',
};

export default async function PartnersPage() {
  const { partners } = await getPartners();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">Our Content Creator Partners</h1>
      
      <div className="mb-10 max-w-3xl mx-auto text-center">
        <p className="text-lg mb-4">
          HyberHost partners with amazing content creators who trust our services for their hosting needs. 
          Explore their recommended configurations and enjoy exclusive discounts when you sign up through their links.
        </p>
      </div>
      
      {/* Featured partners */}
      {partners.some(p => p.featured) && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.filter(p => p.featured).map((partner: Partner) => (
              <div key={partner.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {partner.bannerImageUrl && (
                  <div className="h-48 w-full relative">
                    <Image 
                      src={partner.bannerImageUrl} 
                      alt={`${partner.name}'s banner`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-accent shadow-md relative -mt-16 bg-muted">
                    <Image 
                      src={partner.profileImageUrl || '/placeholder-user.jpg'} 
                      alt={partner.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-1 text-center">{partner.name}</h3>
                  <p className="text-muted-foreground mb-3 text-center">{partner.creatorType}</p>
                  <p className="text-card-foreground mb-5 text-center">{partner.shortDescription}</p>
                  
                  <div className="flex justify-center gap-3 mb-5">
                    {partner.socialLinks.youtube && (
                      <a href={partner.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                      </a>
                    )}
                    {partner.socialLinks.twitch && (
                      <a href={partner.socialLinks.twitch} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.731v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" fillRule="evenodd" clipRule="evenodd"/>
                        </svg>
                      </a>
                    )}
                    {partner.socialLinks.twitter && (
                      <a href={partner.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                    )}
                    {partner.socialLinks.discord && (
                      <a href={partner.socialLinks.discord} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  
                  {partner.discount > 0 && (
                    <div className="bg-accent/20 text-primary font-semibold px-4 py-2 rounded-full mb-5">
                      {partner.discount}% discount with code
                    </div>
                  )}
                  
                  <Link 
                    href={`/partners/${partner.slug}`}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-center"
                  >
                    View {partner.name}'s Page
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* All partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {partners.filter(p => !p.featured).map((partner: Partner) => (
          <div key={partner.id} className="bg-card border border-border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300">
            <div className="p-5 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-accent">
                <Image 
                  src={partner.profileImageUrl || '/placeholder-user.jpg'} 
                  alt={partner.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-1 text-center">{partner.name}</h3>
              <p className="text-muted-foreground mb-2 text-center text-sm">{partner.creatorType}</p>
              <p className="text-card-foreground mb-4 text-center text-sm line-clamp-2">{partner.shortDescription}</p>
              
              {partner.discount > 0 && (
                <div className="text-sm bg-accent/20 text-primary font-medium px-3 py-1 rounded-full mb-3">
                  {partner.discount}% discount
                </div>
              )}
              
              <Link 
                href={`/partners/${partner.slug}`}
                className="w-full bg-muted hover:bg-muted/80 text-muted-foreground font-medium py-2 px-3 rounded transition-colors duration-300 text-center text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {partners.length === 0 && (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-lg text-muted-foreground">No partners found. Check back soon for updates.</p>
        </div>
      )}
      
      {/* Become a partner CTA */}
      <div className="mt-16 bg-muted border border-border rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Are You a Content Creator?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-card-foreground">
          Join our partner program and provide your audience with exclusive discounts while earning commission on every referral.
        </p>
        <Link 
          href="/partners/become-partner"
          className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Become a Partner
        </Link>
      </div>
    </div>
  );
}