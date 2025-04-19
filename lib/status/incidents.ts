import { InstatusRequest, InstatusRequestNoCache } from './utils';

export interface IncidentUpdate {
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

export interface IncidentComponent {
    id: string;
    name: string;
    status: string;
    internalStatus: string;
    order: number;
    showUptime: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Incident {
    id: string;
    name: string;
    started: string;
    resolved: string | null;
    status: string;
    impact: string;
    createdAt: string;
    updatedAt: string;
    updates: IncidentUpdate[];
    components: IncidentComponent[];
}

/**
 * Fetches all incidents from the Instatus API and filters out unnecessary information.
 * @returns {Promise<Incident[]>} A promise that resolves to an array of incidents.
 * @throws {Error} If the API request fails or if the response is not in the expected format.
 */
export async function getIncidents(): Promise<Incident[]> {
    const endpoint = "incidents";
    const data = {};

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("Fetching all incidents");
        console.log("Endpoint:", endpoint);
    }

    const response = await InstatusRequest(endpoint, data);

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("API Response:", response);
    }

    const incidents: Incident[] = response.map((incident: any) => ({
        id: incident.id,
        name: incident.name,
        started: incident.started,
        resolved: incident.resolved,
        status: incident.status,
        impact: incident.impact,
        createdAt: incident.createdAt,
        updatedAt: incident.updatedAt,
        updates: incident.updates.map((update: any) => ({
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
        components: incident.components.map((component: any) => ({
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
        console.log("Formatted Incidents:", incidents);
    }

    return incidents;
}

/**
 * Fetches a specific incident by its ID from the Instatus API.
 * @param id - The ID of the incident to fetch.
 * @returns {Promise<Incident | null>} A promise that resolves to the incident object if found, or null if not found.
 */
export async function getIncidentById(id: string): Promise<Incident | null> {
    const endpoint = `incidents/${id}`;
    const data = {};

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("Fetching incident by ID:", id);
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
            started: response.started,
            resolved: response.resolved,
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
        console.log("Incident not found for ID:", id);
    }

    return null; // Return null if no incident is found
}