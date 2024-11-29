/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export an Angular module named
 * `ServicePathsModule`.
 *
 *
 */
import { InjectionToken, NgModule } from '@angular/core';
import { EmployeeWebAppEnvironment } from '@backbase/employee-web-app-shared-util-core';
import { NOTIFICATIONS_BADGE_NOTIFICATIONS_BASE_PATH } from '@backbase/notifications-ang';
import { EMPLOYEE_BASE_PATH } from '@backbase/employee-http-ang';
import { MESSAGES_BASE_PATH } from '@backbase/messages-v5-http-ang';

export const APP_ACCESS_CONTROL_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_ACCESS_CONTROL_BASE_PATH'
);
export const APP_APPROVAL_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_APPROVAL_BASE_PATH'
);
export const APP_ARRANGEMENT_MANAGER_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_ARRANGEMENT_MANAGER_BASE_PATH'
);
export const APP_AUDIT_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_AUDIT_BASE_PATH'
);
export const APP_COMMENTS_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_COMMENTS_BASE_PATH'
);
export const APP_CONTACT_MANAGER_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_CONTACT_MANAGER_BASE_PATH'
);
export const APP_DEVICE_MANAGEMENT_V2_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_DEVICE_MANAGEMENT_V2_BASE_PATH'
);
export const APP_EMPLOYEE_ACTIONS_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_EMPLOYEE_ACTIONS_BASE_PATH'
);
export const APP_EMPLOYEE_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_EMPLOYEE_BASE_PATH'
);
export const APP_IMPERSONATION_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_IMPERSONATION_BASE_PATH'
);
export const APP_LIMIT_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_LIMIT_BASE_PATH'
);
export const APP_MESSAGES_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_MESSAGES_BASE_PATH'
);
export const APP_NOTIFICATIONS_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_NOTIFICATIONS_BASE_PATH'
);
export const APP_PAYMENT_ORDER_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_PAYMENT_ORDER_BASE_PATH'
);
export const APP_PAYMENT_ORDER_OPTIONS_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_PAYMENT_ORDER_OPTIONS_BASE_PATH'
);
export const APP_USER_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_USER_BASE_PATH'
);
export const APP_USER_PROFILE_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_USER_PROFILE_BASE_PATH'
);

/**
 * Service paths for the individual data modules.
 *
 * The values provided here are mapped to FactoryProviders in the AppDataModules
 * module below, using the servicePathFactory function above to create the
 * factory for each injection token.
 *
 * If for some reason you do not want to use the servicePathFactory to provide
 * the base path for a service, remove it from this array and add a separate
 * provider for it to the AppDataModules module, below.
 *
 * The entries in this array may be edited, added or removed as required, but
 * deleting or renaming the array itself may prevent future upgrades being
 * correctly applied.
 */
const dataModulePaths: [InjectionToken<string>, string][] = [
  [APP_ACCESS_CONTROL_BASE_PATH, '/access-control'],
  [APP_APPROVAL_BASE_PATH, '/approval-service'],
  [APP_ARRANGEMENT_MANAGER_BASE_PATH, '/arrangement-manager'],
  [APP_AUDIT_BASE_PATH, '/audit-service'],
  [APP_COMMENTS_BASE_PATH, '/comments'],
  [APP_CONTACT_MANAGER_BASE_PATH, '/contact-manager'],
  [APP_DEVICE_MANAGEMENT_V2_BASE_PATH, '/device-management-service'],
  [APP_EMPLOYEE_ACTIONS_BASE_PATH, '/employee-actions'],
  [APP_EMPLOYEE_BASE_PATH, '/employee'],
  [APP_IMPERSONATION_BASE_PATH, '/orchestration'],
  [APP_LIMIT_BASE_PATH, '/limit'],
  [APP_MESSAGES_BASE_PATH, '/messages-service'],
  [APP_NOTIFICATIONS_BASE_PATH, '/notifications-service'],
  [APP_PAYMENT_ORDER_BASE_PATH, '/payment-order-service'],
  [APP_PAYMENT_ORDER_OPTIONS_BASE_PATH, '/payment-order-options'],
  [APP_USER_BASE_PATH, '/user-manager'],
  [APP_USER_PROFILE_BASE_PATH, '/user-profile-manager'],
];

/**
 * Returns a provider factory function for the given servicePath which will
 * prepend the global apiRoot prefix provided by EmployeeWebAppEnvironment to
 * the given service path.
 *
 * The apiRoot prefix can be configured explicitly in environment.ts.  If not
 * set, it will fall back to a default value as determined by the
 * EmployeeWebAppEnvironment class.
 *
 * WARNING:  Deleting or editing this function may prevent future upgrades
 * being correctly applied.
 */
export function servicePathFactory(
  servicePath: string
): (env: EmployeeWebAppEnvironment) => string {
  return (env: EmployeeWebAppEnvironment) => `${env.apiRoot}${servicePath}`;
}

@NgModule({
  providers: [
    ...dataModulePaths.map(([token, servicePath]) => ({
      provide: token,
      useFactory: servicePathFactory(servicePath),
      deps: [EmployeeWebAppEnvironment],
    })),
    {
      provide: NOTIFICATIONS_BADGE_NOTIFICATIONS_BASE_PATH,
      useExisting: APP_NOTIFICATIONS_BASE_PATH,
    },
    {
      provide: EMPLOYEE_BASE_PATH,
      useExisting: APP_EMPLOYEE_BASE_PATH,
    },
    {
      provide: MESSAGES_BASE_PATH,
      useExisting: APP_MESSAGES_BASE_PATH,
    },
  ],
})
export class ServicePathsModule {}
