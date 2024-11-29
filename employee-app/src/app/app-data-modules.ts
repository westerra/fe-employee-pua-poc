/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export an Angular module named
 * `AppDataModules`.
 *
 * The `@backbase/data-ang` collection package is deprecated.  This file will be
 * deleted in a future version of the app when that package is no longer used.
 */

import { NgModule } from '@angular/core';
import { EMPLOYEE_ACTIONS_BASE_PATH } from '@backbase/employee-actions-http-ang';
import { IMPERSONATION_BASE_PATH } from '@backbase/impersonation-v1-client-ang';
import { COMMENTS_BASE_PATH } from '@backbase/comments-v2-client-ang';
import { USER_PROFILE_BASE_PATH } from '@backbase/user-profile-http-ang';
import { PAYMENT_ORDER_BASE_PATH } from '@backbase/payment-order-v3-http-ang';
import { USER_BASE_PATH } from '@backbase/user-http-ang';
import { LIMIT_BASE_PATH } from '@backbase/limit-http-ang';
import { AUDIT_BASE_PATH } from '@backbase/audit-http-ang';
import { ARRANGEMENT_MANAGER_BASE_PATH } from '@backbase/arrangement-manager-http-ang';
import { APPROVAL_BASE_PATH } from '@backbase/approval-http-ang';
import { ACCESS_CONTROL_BASE_PATH } from '@backbase/accesscontrol-v3-http-ang';
import { CONTACT_MANAGER_BASE_PATH } from '@backbase/contact-manager-http-ang';
import { PAYMENT_ORDER_OPTIONS_BASE_PATH } from '@backbase/payment-order-options-http-ang';
import { DEVICE_MANAGEMENT_V2_BASE_PATH } from '@backbase/device-management-v2-client-ang';
import {
  APP_ACCESS_CONTROL_BASE_PATH,
  APP_APPROVAL_BASE_PATH,
  APP_ARRANGEMENT_MANAGER_BASE_PATH,
  APP_AUDIT_BASE_PATH,
  APP_COMMENTS_BASE_PATH,
  APP_CONTACT_MANAGER_BASE_PATH,
  APP_DEVICE_MANAGEMENT_V2_BASE_PATH,
  APP_EMPLOYEE_ACTIONS_BASE_PATH,
  APP_IMPERSONATION_BASE_PATH,
  APP_LIMIT_BASE_PATH,
  APP_PAYMENT_ORDER_BASE_PATH,
  APP_USER_BASE_PATH,
  APP_USER_PROFILE_BASE_PATH,
  APP_PAYMENT_ORDER_OPTIONS_BASE_PATH,
} from './service-paths.module';

/**
 * This module is added to the `imports` array of the AppModule in app.module.ts.
 *
 * Service configuration may be customised by modifying the relevant
 * `*_BASE_PATH` provider token value or by adding a `ModuleWithProvider`
 * as an import to this module by calling `.forRoot` on an API module:
 *
 * ```
 * @NgModule({
 *   providers: [...],
 *   imports: [
 *     AuditApiModule.forRoot(() => new AuditConfiguration({ ... }))
 *   ]
 * })
 * export class AppDataModules {}
 * ```
 */
@NgModule({
  providers: [
    {
      provide: ACCESS_CONTROL_BASE_PATH,
      useExisting: APP_ACCESS_CONTROL_BASE_PATH,
    },
    {
      provide: APPROVAL_BASE_PATH,
      useExisting: APP_APPROVAL_BASE_PATH,
    },
    {
      provide: ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
    {
      provide: AUDIT_BASE_PATH,
      useExisting: APP_AUDIT_BASE_PATH,
    },
    {
      provide: COMMENTS_BASE_PATH,
      useExisting: APP_COMMENTS_BASE_PATH,
    },
    {
      provide: CONTACT_MANAGER_BASE_PATH,
      useExisting: APP_CONTACT_MANAGER_BASE_PATH,
    },
    {
      provide: DEVICE_MANAGEMENT_V2_BASE_PATH,
      useExisting: APP_DEVICE_MANAGEMENT_V2_BASE_PATH,
    },
    {
      provide: EMPLOYEE_ACTIONS_BASE_PATH,
      useExisting: APP_EMPLOYEE_ACTIONS_BASE_PATH,
    },
    {
      provide: IMPERSONATION_BASE_PATH,
      useExisting: APP_IMPERSONATION_BASE_PATH,
    },
    {
      provide: LIMIT_BASE_PATH,
      useExisting: APP_LIMIT_BASE_PATH,
    },
    {
      provide: PAYMENT_ORDER_BASE_PATH,
      useExisting: APP_PAYMENT_ORDER_BASE_PATH,
    },
    {
      provide: PAYMENT_ORDER_OPTIONS_BASE_PATH,
      useExisting: APP_PAYMENT_ORDER_OPTIONS_BASE_PATH,
    },
    {
      provide: USER_BASE_PATH,
      useExisting: APP_USER_BASE_PATH,
    },
    {
      provide: USER_PROFILE_BASE_PATH,
      useExisting: APP_USER_PROFILE_BASE_PATH,
    },
  ],
})
export class AppDataModules {}
