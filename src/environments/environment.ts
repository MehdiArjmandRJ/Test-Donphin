// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const envPrefix = '';

export const environment = {
  production: false,
  name: '',
  BaseUrl: `https://${envPrefix}idp.nsedna.com`,
};
