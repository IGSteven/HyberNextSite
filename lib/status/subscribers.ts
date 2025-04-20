// Utility functions for handling status subscribers
import { InstatusRequestPost } from './utils';

export interface Contact {
    id?: string;
    email?: string;
    all?: boolean;
    webhook?: string;
    discord?: string;
    discordTeam?: string;
    slack?: string;
    slackTeam?: string;
    microsoftTeamsWebhook?: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Subscribe to the status page with the provided contact information and components
 * @param contact Contact information for subscription
 * @param components Array of component IDs to subscribe to, or ['ALL'] to subscribe to all
 * @returns API response from Instatus
 */
export async function subscribeToStatusPage(contact: Partial<Contact> = {}, components: string[] = []) {
    const endpoint = 'subscribers';
    const data: Partial<Contact> & { components?: string[] } = {
        ...contact,
        all: components.includes('ALL'),
    };

    if (!data.all && components.length > 0) {
        data.all = false;
        data.components = components;
    }

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("Subscribing to status page:", data);
        console.log("Endpoint:", endpoint);
    }

    const response = await InstatusRequestPost(endpoint, data);
    return response;
}
