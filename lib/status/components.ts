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
    subComponents: StatusComponent[] | null;
}


export async function getComponents(cache = true): Promise<StatusComponent[]> {
    const endpoint = "components";
    const data = {};

    const response = await InstatusRequest(endpoint, data);
    const components: StatusComponent[] = [];

    for (const component of response) {
        if (component.archivedAt) continue; // Skip archived components

        const formattedComponent: StatusComponent = {
            ...component,
            uniqueEmail: "", // FIlter out uniqueEmail for now so its not leaked to client side
            createdAt: new Date(component.createdAt).toISOString(),
            updatedAt: new Date(component.updatedAt).toISOString(),
            startDate: component.startDate ? new Date(component.startDate).toISOString() : null,
        }
        if (component.isParent && component.group == null) {
            // This is a Top Level Component
            

        }

        if (component.isParent && component.group) {
            // This component is both a parent & child component

        }

        if (!component.isParent && component.group) {
            // This is a child component

        } else {
            // This is a standalone component
            components.push(formattedComponent);
        }
    }
    return components;
}