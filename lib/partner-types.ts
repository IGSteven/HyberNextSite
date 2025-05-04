export interface PartnerService {
  id: string;
  name: string;
  description: string;
  recommended: boolean;
  type: string; // E.g., "minecraft", "web", "vps", etc.
  url?: string; // Optional link to specific service
}

export interface Partner {
  id: string;
  slug: string;
  name: string;
  creatorType: string; // E.g., "YouTuber", "Twitch Streamer", "Content Creator"
  profileImageUrl: string; // Profile picture
  bannerImageUrl?: string; // Optional banner image
  brandColor?: string; // Optional brand color in hex format (e.g., #FF5500)
  socialLinks: {
    youtube?: string;
    twitch?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    discord?: string;
    website?: string;
  };
  description: string; // Full bio
  shortDescription: string; // Short intro
  testimonial: string; // Creator's testimonial about HyberHost
  servicesUsed: PartnerService[]; // Services they actually use
  recommendedServices: PartnerService[]; // Services they recommend to audience
  discount: number; // Percentage discount (e.g., 10 for 10%)
  affiliateId: string; // WHMCS affiliate ID
  featured: boolean;
  audience?: string; // Description of their audience
  contentFocus?: string; // What kind of content they make
}

export interface PartnerListResponse {
  partners: Partner[];
  total: number;
}