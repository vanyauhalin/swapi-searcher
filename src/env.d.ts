/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { [key: string]: string };
  // eslint-disable-next-line import/no-default-export
  export default classes;
}
