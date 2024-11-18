import {
  EmployeeWebAppEnvironmentProperties,

} from '@backbase/employee-web-app-shared-util-core';
import { environmentBase } from './environment.base';
import { AuthConfig } from 'angular-oauth2-oidc';
import { DOCUMENT } from '@angular/common';


/*
 * ENVIRONMENT VARIABLE EXPANSION
 *
 * The web-base container image that is used in the Dockerfile will replace any
 * instances of ${SOME_ENV_VAR} with the value of the given environment variable
 * at runtime.
 */

const apiRoot = '${API_ROOT}';



export const environment: EmployeeWebAppEnvironmentProperties = {
  ...environmentBase,
  production: true,
  useHashNavigation: false,
  providers: [
    ...environmentBase.providers,
    { provide: AuthConfig, useFactory: authConfigFactory, deps: [DOCUMENT] },
  ],
  apiRoot,

};

function authConfigFactory(document: Document): AuthConfig {
  return {
    // Url of the Identity Provider
    issuer: '${AUTH_URL}realms/${AUTH_REALM}',

    // URL of the SPA to redirect the user to after login
    redirectUri: document.baseURI + 'select-context',

    // The SPA's id. The SPA is registered with this id at the auth-server
    clientId: '${AUTH_CLIENT_ID}',

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications. (IE: does not support PKCE)
    // dummyClientSecret: 'secret',

    responseType: 'code',

    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    scope: '${AUTH_SCOPE}',

    requireHttps: false,
    showDebugInformation: false,

  
    // useSilentRefresh: true,
    // silentRefreshTimeout: 5000,
    // silentRefreshRedirectUri: concatUrl(window.location.origin, '${BASE_HREF}', locale, 'assets/silent-refresh.htm'),
    
  };
}

export function concatUrl(...items: Array<string>) {
  return items
    .map((item) => (item.trim().endsWith('/') ? item.slice(0, -1) : item))
    .map((item) => (item.trim().startsWith('/') ? item.slice(1) : item))
    .filter((item) => !!item)
    .join('/');
}
