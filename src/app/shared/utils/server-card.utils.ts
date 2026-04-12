// server-card.utils.ts
export const SERVER_STATUS_STYLES: Record<string, string> = {
  online: 'status-online',
  offline: 'status-offline',
  maintenance: 'status-maintenance'
};

export const getButtonClasses = (status: string): string => {
  const baseClasses = 'inspect-button';
  const variantClass = SERVER_STATUS_STYLES[status] ?? 'status-default';
  return `${baseClasses} ${variantClass}`;
};