import { InstatusRequest, InstatusRequestNoCache } from './utils';


export interface StatusComponent {
    id: string;
    name: string;
    description: string;
    status: string;
    internalStatus: string;
    order: number;
    showUptime: boolean;
    createdAt: string;
    updatedAt: string;
    uniqueEmail: string;
    groupId: string;
    isParent: boolean;
    isCollapsed: boolean;
    startDate: string | null;
    group: StatusComponent | null;
    children: StatusComponent[] | null;
}

/**
 * Fetches all components from the Instatus API and organizes them into a hierarchical structure.
 * @returns {Promise<StatusComponent[]>} A promise that resolves to an array of top-level components, each with their children populated.
 * @throws {Error} If the API request fails or if the response is not in the expected format.
 * @description This function retrieves all components from the Instatus API, filters out archived components, and organizes them into a tree structure based on their parent-child relationships. It also sorts the components by their order property and removes empty children arrays.
 */
export async function getComponents(): Promise<StatusComponent[]> {
    const endpoint = "components";
    const data = {};

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("Fetching all components");
        console.log("Endpoint:", endpoint);
    }

    const response = await InstatusRequest(endpoint, data);

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("API Response:", response);
    }

    const componentsMap: Map<string, StatusComponent> = new Map();
    const topLevelComponents: StatusComponent[] = [];

    for (const component of response) {
        if (component.archivedAt) continue; // Skip archived components

        const formattedComponent: StatusComponent = {
            id: component.id,
            name: component.name,
            status: component.status,
            order: component.order,
            createdAt: new Date(component.createdAt).toISOString(),
            updatedAt: new Date(component.updatedAt).toISOString(),
            groupId: component.groupId,
            isParent: component.isParent,
            isCollapsed: component.isCollapsed, // Retain isCollapsed for future UI use
            children: [],
        };

        componentsMap.set(formattedComponent.id, formattedComponent);

        if (formattedComponent.isParent && !formattedComponent.groupId) {
            // This is a Top Level Component
            topLevelComponents.push(formattedComponent);
        }
    }

    for (const component of componentsMap.values()) {
        if (component.groupId) {
            const parentComponent = componentsMap.get(component.groupId);
            if (parentComponent) {
                parentComponent.children?.push(component);
            }
        }
    }

    // Sort components and their children by order
    const sortComponents = (components: StatusComponent[]) => {
        components.sort((a, b) => a.order - b.order);
        components.forEach(component => {
            if (component.children) {
                sortComponents(component.children);
            }
        });
    };

    sortComponents(topLevelComponents);

    // Remove empty children arrays
    const cleanComponents = (components: StatusComponent[]): StatusComponent[] => {
        return components.map(component => {
            const cleanedComponent = { ...component };
            if (cleanedComponent.children?.length === 0) {
                delete cleanedComponent.children;
            } else if (cleanedComponent.children) {
                cleanedComponent.children = cleanComponents(cleanedComponent.children);
            }
            return cleanedComponent;
        });
    };

    const result = cleanComponents(topLevelComponents);

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("Formatted Components:", result);
    }

    return result;
}

/**
 * Fetches a specific component by its ID from the Instatus API.
 * @param id - The ID of the component to fetch.
 * @returns {Promise<StatusComponent | null>} A promise that resolves to the component object if found, or null if not found.
 */
export async function getComponentById(id: string): Promise<StatusComponent | null> {
    const endpoint = "components/" + id;
    const data = {};

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("Fetching component by ID:", id);
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
            status: response.status,
            order: response.order,
            createdAt: new Date(response.createdAt).toISOString(),
            updatedAt: new Date(response.updatedAt).toISOString(),
            groupId: response.groupId,
            isParent: response.isParent,
            isCollapsed: response.isCollapsed, // Retain isCollapsed for future UI use
            children: [],
        };
    }

    if (process.env.INSTATUS_DEBUG === "true") {
        console.log("Component not found for ID:", id);
    }

    return null; // Return null if no component is found
}