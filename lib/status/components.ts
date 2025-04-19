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
            description: component.description,
            status: component.status,
            internalStatus: component.internalStatus,
            order: component.order,
            showUptime: component.showUptime,
            createdAt: new Date(component.createdAt).toISOString(),
            updatedAt: new Date(component.updatedAt).toISOString(),
            uniqueEmail: "filtered@hyberhost.com", // Filter out uniqueEmail for now so it's not leaked to client side
            groupId: component.groupId,
            isParent: component.isParent,
            isCollapsed: component.isCollapsed,
            startDate: component.startDate ? new Date(component.startDate).toISOString() : null,
            group: component.group ? { id: component.group.id } : null,
            children: [],
        };

        componentsMap.set(formattedComponent.id, formattedComponent);

        if (formattedComponent.isParent && !formattedComponent.group) {
            // This is a Top Level Component
            topLevelComponents.push(formattedComponent);
        }
    }

    for (const component of componentsMap.values()) {
        if (component.group?.id) {
            const parentComponent = componentsMap.get(component.group.id);
            if (parentComponent) {
                parentComponent.children?.push(component);
            }
        }
    }

    return topLevelComponents;
}