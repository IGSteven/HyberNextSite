/**
 * WHMCS API - Orders Module
 * @module lib/whmcs/orders
 *
 * This module provides functions to interact with the WHMCS API for order management.
 */

import { apicall } from "./index";

/**
 * Accept an order
 * Action: "AcceptOrder"
 * @param {object} options The options for accepting the order, including required and optional parameters
 * @returns {Promise<boolean>} True if the order was accepted successfully, false otherwise
 * @throws {Error} If the API call fails
 */
export async function acceptOrder(options: { orderid: number; sendemail?: boolean; serverid?: number }) {
    const params = {
        action: "AcceptOrder",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return true;
}

/**
 * Add a new order
 * Action: "AddOrder"
 * @param {object} orderDetails The details of the order to add, including required and optional parameters
 * @returns {Promise<number>} The ID of the created order
 * @throws {Error} If the API call fails
 */
export async function addOrder(orderDetails: Record<string, any>) {
    const params = {
        action: "AddOrder",
        ...orderDetails,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.orderid;
}

/**
 * Cancel an order
 * Action: "CancelOrder"
 * @param {object} options The options for canceling the order, including required and optional parameters
 * @returns {Promise<boolean>} True if the order was canceled successfully, false otherwise
 * @throws {Error} If the API call fails
 */
export async function cancelOrder(options: { orderid: number; cancelsub?: boolean }) {
    const params = {
        action: "CancelOrder",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return true;
}

/**
 * Delete an order
 * Action: "DeleteOrder"
 * @param {object} options The options for deleting the order, including required and optional parameters
 * @returns {Promise<boolean>} True if the order was deleted successfully, false otherwise
 * @throws {Error} If the API call fails
 */
export async function deleteOrder(options: { orderid: number }) {
    const params = {
        action: "DeleteOrder",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return true;
}

/**
 * Mark an order as fraudulent
 * Action: "FraudOrder"
 * @param {object} options The options for marking the order as fraudulent, including required and optional parameters
 * @returns {Promise<boolean>} True if the order was marked as fraudulent successfully, false otherwise
 * @throws {Error} If the API call fails
 */
export async function fraudOrder(options: { orderid: number }) {
    const params = {
        action: "FraudOrder",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return true;
}

/**
 * Get a list of orders
 * Action: "GetOrders"
 * @param {object} filters Filters to apply to the order list, including required and optional parameters
 * @returns {Promise<any[]>} A list of orders
 * @throws {Error} If the API call fails
 */
export async function getOrders(filters: Record<string, any> = {}) {
    const params = {
        action: "GetOrders",
        ...filters,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.orders;
}

/**
 * Get order statuses
 * Action: "GetOrderStatuses"
 * @returns {Promise<any[]>} A list of order statuses
 * @throws {Error} If the API call fails
 */
export async function getOrderStatuses() {
    const params = {
        action: "GetOrderStatuses",
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.statuses;
}

/**
 * Get a list of products
 * Action: "GetProducts"
 * @param {object} filters Filters to apply to the product list, including required and optional parameters
 * @returns {Promise<any[]>} A list of products
 * @throws {Error} If the API call fails
 */
export async function getProducts(filters: Record<string, any> = {}) {
    const params = {
        action: "GetProducts",
        ...filters,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.products;
}

/**
 * Get a list of promotions
 * Action: "GetPromotions"
 * @returns {Promise<any[]>} A list of promotions
 * @throws {Error} If the API call fails
 */
export async function getPromotions() {
    const params = {
        action: "GetPromotions",
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return request.promotions;
}

/**
 * Perform a fraud check on an order
 * Action: "OrderFraudCheck"
 * @param {object} options The options for performing the fraud check, including required and optional parameters
 * @returns {Promise<boolean>} True if the fraud check was successful, false otherwise
 * @throws {Error} If the API call fails
 */
export async function orderFraudCheck(options: { orderid: number }) {
    const params = {
        action: "OrderFraudCheck",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return true;
}

/**
 * Mark an order as pending
 * Action: "PendingOrder"
 * @param {object} options The options for marking the order as pending, including required and optional parameters
 * @returns {Promise<boolean>} True if the order was marked as pending successfully, false otherwise
 * @throws {Error} If the API call fails
 */
export async function pendingOrder(options: { orderid: number }) {
    const params = {
        action: "PendingOrder",
        ...options,
    };

    const request = await apicall(params);

    if (request.result !== "success") {
        throw new Error(request.message);
    }
    return true;
}