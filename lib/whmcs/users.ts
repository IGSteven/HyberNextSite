/**
 * WHMCS API - Users Module
 * @module lib/whmcs/users
 * 
 * This module provides functions to interact with the WHMCS API for user management.
 */

const { apicall } = require("./index.ts");

// Types
export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    datecreated: string;
    validationdata: string;
    clients: ClientRelationship[];
}

export interface ClientRelationship {
    id: number;
    isOwner: boolean;
}

/**
 * Get a list of users
 * Action: "GetUsers"
 * @param {object} options The options for retrieving users, including required and optional parameters
 * @returns {Promise<User[]>} A promise that resolves to an array of user objects
 * @throws {Error} If the API call fails or if the response is not successful
 */
export async function getUsers(options: { limitstart?: number; limitnum?: number; sorting?: string; search?: string } = {}) {
    const params = {
        action: "GetUsers",
        ...options,
    };

    const request = await apicall(params);
    return request.users;
}

/**
 * Search for a user
 * @param {string} search The search term to filter users by
 * @returns {Promise<User>} The user object if found
 * @throws {Error} If the user is not found
 */
export async function searchUser(search: string) {
    const response = await getUsers({ limitstart: 0, limitnum: 1, sorting: "ASC", search });
    if (response.length === 0) {
        throw new Error("User not found");
    }
    return response[0];
}

/**
 * Create a user
 * Action: "AddUser"
 * @param {object} options The options for creating a user, including required and optional parameters
 * @returns {Promise<number>} The ID of the created user
 * @throws {Error} If the user creation fails
 */
export async function createUser(options: { firstname: string; lastname: string; email: string; password2: string; language?: string }) {
    const params = {
        action: "AddUser",
        language: "english",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        if (process.env.WHMCS_DEBUG) {
            console.log(`Error creating user: ${request.message}`);
        }
        throw new Error(request.message);
    }
    return request.user_id;
}

/**
 * Reset a user's password
 * Action: "ResetPassword"
 * @param {object} options The options for resetting the user's password, including required parameters
 * @returns {Promise<boolean>} True if the password was reset successfully, false otherwise
 * @throws {Error} If the password reset fails
 */
export async function resetUserPassword(options: { id: number; email: string }) {
    const params = {
        action: "ResetPassword",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        if (process.env.WHMCS_DEBUG) {
            console.log(`Error resetting password: ${request.message}`);
        }
        return false;
    }
    return true;
}

/**
 * Send an invite to manage a client
 * Action: "CreateClientInvite"
 * @param {object} options The options for creating a client invite, including required and optional parameters
 * @returns {Promise<boolean>} True if the invite was sent successfully, false otherwise
 * @throws {Error} If the invite creation fails
 */
export async function createClientInvite(options: { client_id: number; email: string; permissions?: string[] }) {
    const params = {
        action: "CreateClientInvite",
        permissions: options.permissions?.join(",") || "view",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        if (process.env.WHMCS_DEBUG) {
            console.log(`Error creating user invite: ${request.message}`);
        }
        return false;
    }
    return true;
}

/**
 * Update the permissions of a user for a client
 * Action: "UpdateUserPermissions"
 * @param {object} options The options for updating user permissions, including required and optional parameters
 * @returns {Promise<boolean>} True if the permissions were updated successfully, false otherwise
 * @throws {Error} If the permissions update fails
 */
export async function updateUserPermissions(options: { user_id: number; client_id: number; permissions?: string[] }) {
    const params = {
        action: "UpdateUserPermissions",
        permissions: options.permissions?.join(",") || "view",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        if (process.env.WHMCS_DEBUG) {
            console.log(`Error updating user permissions: ${request.message}`);
        }
        return false;
    }
    return true;
}

/**
 * Delete the relationship between a user and a client
 * Action: "DeleteUserClient"
 * @param {object} options The options for deleting the user-client relationship, including required parameters
 * @returns {Promise<boolean>} True if the relationship was deleted successfully, false otherwise
 * @throws {Error} If the relationship deletion fails
 */
export async function deleteUserClient(options: { user_id: number; client_id: number }) {
    const params = {
        action: "DeleteUserClient",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        if (process.env.WHMCS_DEBUG) {
            console.log(`Error deleting user-client relationship: ${request.message}`);
        }
        return false;
    }
    return true;
}

/**
 * Get a list of permissions for a user
 * Action: "GetUserPermissions"
 * @param {object} options The options for retrieving user permissions, including required parameters
 * @returns {Promise<any>} The permissions of the user
 * @throws {Error} If the API call fails
 */
export async function getUserPermissions(options: { user_id: number; client_id: number }) {
    const params = {
        action: "GetUserPermissions",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        if (process.env.WHMCS_DEBUG) {
            console.log(`Error getting user permissions: ${request.message}`);
        }
        throw new Error(request.message);
    }
    return request.permissions;
}

/**
 * Update a user
 * Action: "UpdateUser"
 * @param {object} options The options for updating a user, including required and optional parameters
 * @returns {Promise<boolean>} True if the user was updated successfully, false otherwise
 * @throws {Error} If the user update fails
 */
export async function updateUser(options: { user_id: number; firstname: string; lastname: string; email: string; language?: string }) {
    const params = {
        action: "UpdateUser",
        language: "english",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        if (process.env.WHMCS_DEBUG) {
            console.log(`Error updating user: ${request.message}`);
        }
        return false;
    }
    return true;
}
