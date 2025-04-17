/**
 * WHMCS API - Clients Module
 * @module lib/whmcs/clients
 *
 * This module provides functions to interact with the WHMCS API for client management.
 */

const { apicall } = require("./index.ts");

// Types
export interface Client {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    companyname?: string;
    datecreated: string;
    groupid: number;
    status: string;
}

/**
 * Get a list of clients
 * Action: "GetClients"
 * @param {number} limitstart The starting point for the list of clients (default: 0)
 * @param {number} limitnum The number of clients to return (default: 25)
 * @param {string} search The search term to filter clients by (default: "")
 * @returns {Promise<Client[]>} A promise that resolves to an array of client objects
 * @throws {Error} If the API call fails or if the response is not successful
 */
export async function getClients(limitstart = 0, limitnum = 25, search = "") {
    const params = {
        action: "GetClients",
        limitstart,
        limitnum,
        search,
    };

    const request = await apicall(params);
    return request.clients;
}

/**
 * Add a new client
 * Action: "AddClient"
 * @param {string} firstname The first name of the client
 * @param {string} lastname The last name of the client
 * @param {string} email The email address of the client
 * @param {string} password2 The password for the client
 * @param {string} companyname The company name of the client (optional)
 * @returns {Promise<number>} The ID of the created client
 * @throws {Error} If the client creation fails
 */
export async function addClient(firstname: string, lastname: string, email: string, password2: string, companyname = "") {
    const params = {
        action: "AddClient",
        firstname,
        lastname,
        email,
        password2,
        companyname,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        if (process.env.WHMCS_DEBUG) {
            console.log(`Error adding client: ${request.message}`);
        }
        throw new Error(request.message);
    }
    return request.clientid;
}

/**
 * Update an existing client
 * Action: "UpdateClient"
 * @param {number} clientid The ID of the client to update
 * @param {object} updates An object containing the fields to update
 * @returns {Promise<boolean>} True if the client was updated successfully, false otherwise
 * @throws {Error} If the client update fails
 */
export async function updateClient(clientid: number, updates: Record<string, any>) {
    const params = {
        action: "UpdateClient",
        clientid,
        ...updates,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        if (process.env.WHMCS_DEBUG) {
            console.log(`Error updating client: ${request.message}`);
        }
        return false;
    }
    return true;
}

/**
 * Delete a client
 * Action: "DeleteClient"
 * @param {number} clientid The ID of the client to delete
 * @returns {Promise<boolean>} True if the client was deleted successfully, false otherwise
 * @throws {Error} If the client deletion fails
 */
export async function deleteClient(clientid: number) {
    const params = {
        action: "DeleteClient",
        clientid,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        if (process.env.WHMCS_DEBUG) {
            console.log(`Error deleting client: ${request.message}`);
        }
        return false;
    }
    return true;
}

/**
 * Add a contact
 * Action: "AddContact"
 * @param {object} contactDetails The details of the contact to add
 * @returns {Promise<number>} The ID of the created contact
 * @throws {Error} If the contact creation fails
 */
export async function addContact(contactDetails: Record<string, any>) {
    const params = {
        action: "AddContact",
        ...contactDetails,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.contactid;
}

/**
 * Close a client
 * Action: "CloseClient"
 * @param {number} clientid The ID of the client to close
 * @returns {Promise<boolean>} True if the client was closed successfully, false otherwise
 * @throws {Error} If the client closure fails
 */
export async function closeClient(clientid: number) {
    const params = {
        action: "CloseClient",
        clientid,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return true;
}

/**
 * Delete a contact
 * Action: "DeleteContact"
 * @param {number} contactid The ID of the contact to delete
 * @returns {Promise<boolean>} True if the contact was deleted successfully, false otherwise
 * @throws {Error} If the contact deletion fails
 */
export async function deleteContact(contactid: number) {
    const params = {
        action: "DeleteContact",
        contactid,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return true;
}

/**
 * Get cancelled packages
 * Action: "GetCancelledPackages"
 * @returns {Promise<any[]>} A list of cancelled packages
 * @throws {Error} If the API call fails
 */
export async function getCancelledPackages() {
    const params = {
        action: "GetCancelledPackages",
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.packages;
}

/**
 * Get client groups
 * Action: "GetClientGroups"
 * @returns {Promise<any[]>} A list of client groups
 * @throws {Error} If the API call fails
 */
export async function getClientGroups() {
    const params = {
        action: "GetClientGroups",
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.clientgroups;
}

/**
 * Get client password
 * Action: "GetClientPassword"
 * @param {number} clientid The ID of the client
 * @returns {Promise<string>} The password of the client
 * @throws {Error} If the API call fails
 */
export async function getClientPassword(clientid: number) {
    const params = {
        action: "GetClientPassword",
        clientid,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.password;
}

/**
 * Get client addons
 * Action: "GetClientsAddons"
 * @param {number} clientid The ID of the client
 * @returns {Promise<any[]>} A list of client addons
 * @throws {Error} If the API call fails
 */
export async function getClientsAddons(clientid: number) {
    const params = {
        action: "GetClientsAddons",
        clientid,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.addons;
}

/**
 * Get client details
 * Action: "GetClientsDetails"
 * @param {number} clientid The ID of the client
 * @returns {Promise<any>} The details of the client
 * @throws {Error} If the API call fails
 */
export async function getClientsDetails(clientid: number) {
    const params = {
        action: "GetClientsDetails",
        clientid,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.client;
}

/**
 * Get client domains
 * Action: "GetClientsDomains"
 * @param {number} clientid The ID of the client
 * @returns {Promise<any[]>} A list of client domains
 * @throws {Error} If the API call fails
 */
export async function getClientsDomains(clientid: number) {
    const params = {
        action: "GetClientsDomains",
        clientid,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.domains;
}

/**
 * Get client products
 * Action: "GetClientsProducts"
 * @param {number} clientid The ID of the client
 * @returns {Promise<any[]>} A list of client products
 * @throws {Error} If the API call fails
 */
export async function getClientsProducts(clientid: number) {
    const params = {
        action: "GetClientsProducts",
        clientid,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.products;
}

/**
 * Get contacts
 * Action: "GetContacts"
 * @param {number} clientid The ID of the client
 * @returns {Promise<any[]>} A list of contacts
 * @throws {Error} If the API call fails
 */
export async function getContacts(clientid: number) {
    const params = {
        action: "GetContacts",
        clientid,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.contacts;
}

/**
 * Get emails
 * Action: "GetEmails"
 * @param {number} clientid The ID of the client
 * @returns {Promise<any[]>} A list of emails
 * @throws {Error} If the API call fails
 */
export async function getEmails(clientid: number) {
    const params = {
        action: "GetEmails",
        clientid,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.emails;
}

/**
 * Update a contact
 * Action: "UpdateContact"
 * @param {number} contactid The ID of the contact to update
 * @param {object} updates An object containing the fields to update
 * @returns {Promise<boolean>} True if the contact was updated successfully, false otherwise
 * @throws {Error} If the contact update fails
 */
export async function updateContact(contactid: number, updates: Record<string, any>) {
    const params = {
        action: "UpdateContact",
        contactid,
        ...updates,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return true;
}