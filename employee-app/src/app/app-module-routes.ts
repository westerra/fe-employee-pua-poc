/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export an array named
 * `workspaceRoutes` and an array named `additionalRoutes`.
 *
 *
 */

import { Routes } from '@angular/router';
import { withUserContextSelected } from '@backbase/employee-web-app-shared-util-core';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { withEntitlements } from '@backbase/foundation-ang/entitlements';
import { redirectToFirstAccessibleWorkspace } from '@backbase/employee-web-app-shared-util-entitlements';
import { bankAdminEntitlements } from './workspaces/bank-admin/entitlements';

/**
 * A map of workspace URL paths to the entitlements required to access them
 */
const workspaceEntitlements = {
  support: 'User.ManageUsers.view',
  admin: Object.values(bankAdminEntitlements).join(' OR '),
};

/**
 * Route definitions in this array are added as child routes of the
 * EmployeeWebAppChromeComponent in app.module.ts.
 */
export const workspaceRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    /*
     * Workaround to avoid Angular error: "Invalid configuration of route ''" when canActivate is used without redirectTo, component, or children.
     * Use redirectTo property with a function for conditional redirection in Angular 18+ instead of empty children array and resolver in canActivate.
     */
    children: [],
    canActivate: [redirectToFirstAccessibleWorkspace(workspaceEntitlements)],
  },
  {
    path: 'support',
    canActivate: [
      withUserContextSelected,
      withEntitlements(workspaceEntitlements.support, '/'),
    ],
    loadChildren: () =>
      import(
        './workspaces/customer-support/customer-support-workspace-loader.module'
      ).then((mod) => mod.CustomerSupportWorkspaceLoaderModule),
    title: $localize`:Page title for the Customer support workspace@@bb-ewa.customer-support.page-title:Customer support`,
  },
  {
    path: 'admin',
    canActivate: [
      withUserContextSelected,
      withEntitlements(workspaceEntitlements.admin, '/'),
    ],
    loadChildren: () =>
      import('./workspaces/bank-admin/bank-admin-workspace-loader.module').then(
        (mod) => mod.BankAdminWorkspaceLoaderModule
      ),
    title: $localize`:Page title for the Bank admin workspace@@bb-ewa.bank-admin.page-title:Bank admin`,
  },
];

/**
 * Route definitions in this array are added to the routes of the root
 * RouterModule defined in app.module.ts.
 */
export const additionalRoutes: Routes = [];
