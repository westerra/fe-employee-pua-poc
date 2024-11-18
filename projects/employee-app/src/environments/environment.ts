// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {
  EmployeeWebAppEnvironmentProperties,

} from '@backbase/employee-web-app-shared-util-core';
import { mockProviders } from './mockProviders';
import { environmentBase } from './environment.base';
import { DevAuthService } from '@backbase/employee-web-app-root-util-dev-tools';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';



export const environment: EmployeeWebAppEnvironmentProperties = {
  ...environmentBase,
  production: false,
  useHashNavigation: false,
  providers: [
    ...environmentBase.providers,
    ...mockProviders,
    {
      provide: OAuthService,
      useClass: DevAuthService,
    },
    {
      provide: AuthConfig,
      useValue: {},
    },
  ],
  identityAdminHref: '',
  paymentAdminHref: '',
  apiRoot: '/gateway/api',
featureFlags: {
    'rtc-voice': true,
    'rtc-video': true,
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.