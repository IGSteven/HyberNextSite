import { sendWHMCSApiRequest } from './api-utils';

interface TicketParams {
  clientid?: number;
  deptid: number;
  subject: string;
  message: string;
  priority: 'Low' | 'Medium' | 'High';
  name?: string;
  email?: string;
  customfields?: string;
}

interface TicketResponse {
  success: boolean;
  message?: string;
  ticketid?: number;
  tid?: string;
}

// Create a ticket in WHMCS
export async function createWHMCSTicket(params: TicketParams): Promise<TicketResponse> {
  try {
    // Call OpenTicket API action in WHMCS
    const response = await sendWHMCSApiRequest('OpenTicket', {
      ...params,
      markdown: true
    });

    if (response.result === 'success') {
      return {
        success: true,
        ticketid: parseInt(response.ticketid),
        tid: response.tid
      };
    } else {
      console.error('WHMCS Ticket API Error:', response.message);
      return {
        success: false,
        message: response.message || 'Failed to create ticket'
      };
    }
  } catch (error) {
    console.error('Error creating WHMCS ticket:', error);
    return {
      success: false,
      message: (error as Error).message
    };
  }
}