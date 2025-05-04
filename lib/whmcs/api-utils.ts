import crypto from 'crypto';

// Send API request to WHMCS
export async function sendWHMCSApiRequest(action: string, params: Record<string, any> = {}) {
  const apiUrl = process.env.WHMCS_API_URL;
  const apiIdentifier = process.env.WHMCS_API_IDENTIFIER;
  const apiSecret = process.env.WHMCS_API_SECRET;

  if (!apiUrl || !apiIdentifier || !apiSecret) {
    throw new Error('WHMCS API credentials not configured');
  }

  // Prepare request parameters
  const requestParams = new URLSearchParams();
  requestParams.append('identifier', apiIdentifier);
  requestParams.append('action', action);

  // Add all passed parameters
  for (const [key, value] of Object.entries(params)) {
    requestParams.append(key, String(value));
  }

  // Calculate request hash
  const hash = crypto
    .createHash('md5')
    .update(`${apiIdentifier}${apiSecret}`)
    .digest('hex');
  requestParams.append('accesskey', hash);
  requestParams.append('responsetype', 'json');

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestParams.toString(),
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`WHMCS API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending WHMCS API request:', error);
    throw error;
  }
}