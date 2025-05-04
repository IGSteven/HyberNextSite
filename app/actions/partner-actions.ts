'use server';

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/mongodb';
import { Partner } from '@/lib/partner-types';
import { getPartnersFilePath } from '@/lib/partner-utils';
import { redirect } from 'next/navigation';
import fs from 'fs';
import { ObjectId } from 'mongodb';
import { createWHMCSTicket } from '@/lib/whmcs/ticket-api';

// Create a new partner
export async function createPartner(formData: FormData) {
  try {
    // Check if socialLinks is passed as a string or as individual fields
    let socialLinks;
    const socialLinksString = formData.get('socialLinks');
    
    if (socialLinksString) {
      // If it's a JSON string, parse it
      try {
        socialLinks = JSON.parse(socialLinksString as string);
      } catch (e) {
        socialLinks = {};
      }
    } else {
      // If it's not a string, build from individual fields
      const youtube = formData.get('youtube') as string;
      const twitch = formData.get('twitch') as string;
      const twitter = formData.get('twitter') as string;
      const instagram = formData.get('instagram') as string;
      const tiktok = formData.get('tiktok') as string;
      const discord = formData.get('discord') as string;
      const website = formData.get('website') as string;
      
      socialLinks = {
        youtube: youtube || '',
        twitch: twitch || '',
        twitter: twitter || '',
        instagram: instagram || '',
        tiktok: tiktok || '',
        discord: discord || '',
        website: website || '',
      };
    }

    // Handle servicesUsed and recommendedServices safely
    let servicesUsed = [];
    let recommendedServices = [];
    
    try {
      const servicesUsedString = formData.get('servicesUsed');
      if (servicesUsedString) {
        servicesUsed = JSON.parse(servicesUsedString as string);
      }
    } catch (e) {
      console.warn('Error parsing servicesUsed, using default empty array');
    }
    
    try {
      const recommendedServicesString = formData.get('recommendedServices');
      if (recommendedServicesString) {
        recommendedServices = JSON.parse(recommendedServicesString as string);
      }
    } catch (e) {
      console.warn('Error parsing recommendedServices, using default empty array');
    }

    const partner: Partial<Partner> = {
      id: new ObjectId().toString(),
      slug: formData.get('slug') as string,
      name: formData.get('name') as string,
      creatorType: formData.get('creatorType') as string,
      profileImageUrl: formData.get('profileImageUrl') as string,
      bannerImageUrl: formData.get('bannerImageUrl') as string || undefined,
      brandColor: formData.get('brandColor') as string || undefined,
      description: formData.get('description') as string,
      shortDescription: formData.get('shortDescription') as string,
      testimonial: formData.get('testimonial') as string || undefined,
      discount: Number(formData.get('discount')) || 0,
      affiliateId: formData.get('affiliateId') as string,
      servicesUsed: servicesUsed,
      recommendedServices: recommendedServices,
      featured: formData.get('featured') === 'on',
      audience: formData.get('audience') as string || undefined,
      contentFocus: formData.get('contentFocus') as string || undefined,
      socialLinks: socialLinks,
    };

    if (process.env.STORAGE_DRIVE === 'FILE') {
      // File-based storage
      const filePath = getPartnersFilePath();
      let partners: Partner[] = [];
      
      try {
        if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath, 'utf8');
          partners = JSON.parse(fileData);
        }
      } catch (error) {
        console.error('Error reading partners file:', error);
      }
      
      partners.push(partner as Partner);
      fs.writeFileSync(filePath, JSON.stringify(partners, null, 2));
    } else {
      // MongoDB storage
      const { db } = await connectToDatabase();
      const collection = db.collection(process.env.COLLECTION_PARTNERS || 'partners');
      await collection.insertOne(partner);
    }

    revalidatePath('/partners');
    revalidatePath('/admin/partners');
    return { success: true };
  } catch (error) {
    console.error('Error creating partner:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Update an existing partner
export async function updatePartner(slug: string, formData: FormData) {
  try {
    // Check if socialLinks is passed as a string or as individual fields
    let socialLinks;
    const socialLinksString = formData.get('socialLinks');
    
    if (socialLinksString) {
      // If it's a JSON string, parse it
      try {
        socialLinks = JSON.parse(socialLinksString as string);
      } catch (e) {
        socialLinks = {};
      }
    } else {
      // If it's not a string, build from individual fields
      const youtube = formData.get('youtube') as string;
      const twitch = formData.get('twitch') as string;
      const twitter = formData.get('twitter') as string;
      const instagram = formData.get('instagram') as string;
      const tiktok = formData.get('tiktok') as string;
      const discord = formData.get('discord') as string;
      const website = formData.get('website') as string;
      
      socialLinks = {
        youtube: youtube || '',
        twitch: twitch || '',
        twitter: twitter || '',
        instagram: instagram || '',
        tiktok: tiktok || '',
        discord: discord || '',
        website: website || '',
      };
    }

    // Handle servicesUsed and recommendedServices safely
    let servicesUsed = [];
    let recommendedServices = [];
    
    try {
      const servicesUsedString = formData.get('servicesUsed');
      if (servicesUsedString) {
        servicesUsed = JSON.parse(servicesUsedString as string);
      }
    } catch (e) {
      console.warn('Error parsing servicesUsed, using default empty array');
    }
    
    try {
      const recommendedServicesString = formData.get('recommendedServices');
      if (recommendedServicesString) {
        recommendedServices = JSON.parse(recommendedServicesString as string);
      }
    } catch (e) {
      console.warn('Error parsing recommendedServices, using default empty array');
    }

    const partnerUpdate: Partial<Partner> = {
      slug: formData.get('slug') as string,
      name: formData.get('name') as string,
      creatorType: formData.get('creatorType') as string,
      profileImageUrl: formData.get('profileImageUrl') as string,
      bannerImageUrl: formData.get('bannerImageUrl') as string || undefined,
      brandColor: formData.get('brandColor') as string || undefined,
      description: formData.get('description') as string,
      shortDescription: formData.get('shortDescription') as string,
      testimonial: formData.get('testimonial') as string || undefined,
      discount: Number(formData.get('discount')) || 0,
      affiliateId: formData.get('affiliateId') as string,
      servicesUsed: servicesUsed,
      recommendedServices: recommendedServices,
      featured: formData.get('featured') === 'on',
      audience: formData.get('audience') as string || undefined,
      contentFocus: formData.get('contentFocus') as string || undefined,
      socialLinks: socialLinks,
    };

    if (process.env.STORAGE_DRIVE === 'FILE') {
      // File-based storage
      const filePath = getPartnersFilePath();
      let partners: Partner[] = [];
      
      try {
        if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath, 'utf8');
          partners = JSON.parse(fileData);
        }
      } catch (error) {
        console.error('Error reading partners file:', error);
      }
      
      const index = partners.findIndex(p => p.slug === slug);
      if (index !== -1) {
        partners[index] = { ...partners[index], ...partnerUpdate };
        fs.writeFileSync(filePath, JSON.stringify(partners, null, 2));
      } else {
        return { success: false, error: 'Partner not found' };
      }
    } else {
      // MongoDB storage
      const { db } = await connectToDatabase();
      const collection = db.collection(process.env.COLLECTION_PARTNERS || 'partners');
      await collection.updateOne(
        { slug },
        { $set: partnerUpdate }
      );
    }

    revalidatePath('/partners');
    revalidatePath(`/partners/${partnerUpdate.slug}`);
    revalidatePath('/admin/partners');
    return { success: true };
  } catch (error) {
    console.error('Error updating partner:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Delete a partner
export async function deletePartner(slug: string) {
  try {
    if (process.env.STORAGE_DRIVE === 'FILE') {
      // File-based storage
      const filePath = getPartnersFilePath();
      let partners: Partner[] = [];
      
      try {
        if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath, 'utf8');
          partners = JSON.parse(fileData);
        }
      } catch (error) {
        console.error('Error reading partners file:', error);
      }
      
      const filteredPartners = partners.filter(p => p.slug !== slug);
      fs.writeFileSync(filePath, JSON.stringify(filteredPartners, null, 2));
    } else {
      // MongoDB storage
      const { db } = await connectToDatabase();
      const collection = db.collection(process.env.COLLECTION_PARTNERS || 'partners');
      await collection.deleteOne({ slug });
    }

    revalidatePath('/partners');
    revalidatePath('/admin/partners');
    return { success: true };
  } catch (error) {
    console.error('Error deleting partner:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Function to submit a partner application as a WHMCS ticket
export async function submitPartnerApplication(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const creatorType = formData.get('creatorType') as string;
    const contentFocus = formData.get('contentFocus') as string;
    const audienceSize = formData.get('audienceSize') as string;
    const audienceDemo = formData.get('audienceDemo') as string;
    const youtubeChannel = formData.get('youtubeChannel') as string;
    const twitchChannel = formData.get('twitchChannel') as string;
    const otherSocial = formData.get('otherSocial') as string;
    const hostingNeeds = formData.get('hostingNeeds') as string;
    const additionalInfo = formData.get('additionalInfo') as string;

    // Format the ticket message
    const ticketMessage = `
New Content Partner Application

Name: ${name}
Email: ${email}
Creator Type: ${creatorType}
Content Focus: ${contentFocus}

Audience Information:
- Size: ${audienceSize}
- Demographics: ${audienceDemo}

Social Channels:
- YouTube: ${youtubeChannel || 'N/A'}
- Twitch: ${twitchChannel || 'N/A'}
- Other: ${otherSocial || 'N/A'}

Hosting Requirements:
${hostingNeeds}

Additional Information:
${additionalInfo || 'None provided'}
    `.trim();

    // Create WHMCS ticket
    const ticketResult = await createWHMCSTicket({
      clientid: 0, // 0 for guest ticket
      deptid: 2, // Department ID for partnerships (adjust to your WHMCS department ID)
      subject: `Partner Program Application - ${name}`,
      message: ticketMessage,
      priority: 'Medium',
      name,
      email,
      customfields: JSON.stringify({
        "creatorType": creatorType,
        "audienceSize": audienceSize
      })
    });

    if (!ticketResult.success) {
      throw new Error(ticketResult.message || 'Failed to create support ticket');
    }

    return { 
      success: true, 
      ticketId: ticketResult.ticketid, 
      ticketNumber: ticketResult.tid 
    };
  } catch (error) {
    console.error('Error submitting partner application:', error);
    return { 
      success: false, 
      error: (error as Error).message 
    };
  }
}