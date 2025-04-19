import { InstatusRequest } from './utils';


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


export async function getComponents(cache = true): Promise<StatusComponent[]> {
    const endpoint = "components";
    const data = {};

    const response = await InstatusRequest(endpoint, data);
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

    return cleanComponents(topLevelComponents);
}