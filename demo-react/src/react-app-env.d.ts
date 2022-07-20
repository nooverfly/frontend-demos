/// <reference types="react-scripts" />
interface Window {
  __MICRO_APP_BASE_ROUTE__?: string;
}

declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}
