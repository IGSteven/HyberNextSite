import { InstatusRequest, InstatusRequestNoCache } from './utils';

export interface MaintenanceUpdate {
    id: string;
    message: string;
    status: string;
    notify: boolean;
    started: string;
    ended: string | null;
    duration: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface MaintenanceComponent {
    id: string;
    name: string;
    status: string;
    internalStatus: string;
    order: number;
    showUptime: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Maintenance {
    id: string;
    name: string;
    start: string;
    end: string;
    status: string;
    impact: string;
    createdAt: string;
    updatedAt: string;
    updates: MaintenanceUpdate[];
    components: MaintenanceComponent[];
}

/**
 * Fetches all maintenances from the Instatus API and filters out unnecessary information.
 * @returns {Promise<Maintenance[]>} A promise that resolves to an array of maintenances.
 * @throws {Error} If the API request fails or if the response is not in the expected format.
 */
export async function getMaintenances(): Promise<Maintenance[]> {
    const endpoint = "maintenances";
    const data = {};

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("Fetching all maintenances");
        console.log("Endpoint:", endpoint);
    }

    const response = await InstatusRequest(endpoint, data);

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("API Response:", response);
    }

    const maintenances: Maintenance[] = response.map((maintenance: any) => ({
        id: maintenance.id,
        name: maintenance.name,
        start: maintenance.start,
        end: maintenance.end,
        status: maintenance.status,
        impact: maintenance.impact,
        createdAt: maintenance.createdAt,
        updatedAt: maintenance.updatedAt,
        updates: maintenance.updates.map((update: any) => ({
            id: update.id,
            message: update.message,
            status: update.status,
            notify: update.notify,
            started: update.started,
            ended: update.ended,
            duration: update.duration,
            createdAt: update.createdAt,
            updatedAt: update.updatedAt,
        })),
        components: maintenance.components.map((component: any) => ({
            id: component.id,
            name: component.name,
            status: component.status,
            internalStatus: component.internalStatus,
            order: component.order,
            showUptime: component.showUptime,
            createdAt: component.createdAt,
            updatedAt: component.updatedAt,
        })),
    }));

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("Formatted Maintenances:", maintenances);
    }

    return maintenances;
}

/**
 * Fetches a specific maintenance by its ID from the Instatus API.
 * @param id - The ID of the maintenance to fetch.
 * @returns {Promise<Maintenance | null>} A promise that resolves to the maintenance object if found, or null if not found.
 */
export async function getMaintenanceById(id: string): Promise<Maintenance | null> {
    const endpoint = `maintenances/${id}`;
    const data = {};

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("Fetching maintenance by ID:", id);
        console.log("Endpoint:", endpoint);
    }

    const response = await InstatusRequestNoCache(endpoint, data);

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("API Response:", response);
    }

    if (response && response.id === id) {
        return {
            id: response.id,
            name: response.name,
            start: response.start,
            end: response.end,
            status: response.status,
            impact: response.impact,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
            updates: response.updates.map((update: any) => ({
                id: update.id,
                message: update.message,
                status: update.status,
                notify: update.notify,
                started: update.started,
                ended: update.ended,
                duration: update.duration,
                createdAt: update.createdAt,
                updatedAt: update.updatedAt,
            })),
            components: response.components.map((component: any) => ({
                id: component.id,
                name: component.name,
                status: component.status,
                internalStatus: component.internalStatus,
                order: component.order,
                showUptime: component.showUptime,
                createdAt: component.createdAt,
                updatedAt: component.updatedAt,
            })),
        };
    }

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("Maintenance not found for ID:", id);
    }

    return null; // Return null if no maintenance is found
}