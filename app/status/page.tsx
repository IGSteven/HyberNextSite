export const metadata = {
  title: "System Status - Hyber",
  description: "View the current operational status of Hyber's infrastructure and services",
};

import StatusPageClient from './status-client';

export default function StatusPage() {
  return <StatusPageClient />;
}