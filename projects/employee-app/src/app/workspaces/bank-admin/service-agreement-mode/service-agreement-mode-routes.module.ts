/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always include an array named
 * `routes` of type `Routes` and should always export an `@NgModule` class named
 * `ServiceAgreementModeRoutesModule`.
 *
 * You may freely alter the routes defined in this file, but please be aware that
 * doing so may prevent some future updates being automatically applied by
 * migration schematics.  In such cases, the schematic will log a warning and
 * manual steps may be required to adopt any new features or fix breaking changes.
 *
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot } from '@angular/router';
import {
  ServiceAgreementModeComponent,
  ServiceAgreementModeFeatureChromeModule,
} from '@backbase/employee-web-app-service-agreement-mode-feature-chrome';
import { EntitlementsGuard } from '@backbase/foundation-ang/entitlements';

export const entitlements = Object.freeze({
  overview: 'ServiceAgreement.ManageServiceAgreements.view',
  approvals: 'Approvals.ManageApprovalPolicyandLevel.view AND Approvals.AssignApprovalPolicies.view',
  usersAndPermissions: 'User.ManageUsers.view',
  jobRoles: 'Entitlements.ManageFunctionGroups.view',
  accountGroups: 'Entitlements.ManageDataGroups.view',
  payeeGroups: 'Entitlements.ManageDataGroups.view',
});

const serviceAgreementModeRoutes: Routes = [
  {
    path: ':serviceAgreementId',
    component: ServiceAgreementModeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users-and-permissions',
      },
      {
        path: 'users-and-permissions',
        loadChildren: () =>
          import('./journeys/user-permissions-journey-loader.module').then(
            (m) =>
              m.UserPermissionsJourneyLoaderModule
            ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.usersAndPermissions,
          redirectTo: (_, route: ActivatedRouteSnapshot) => `/admin/service-agreements/${route.params.serviceAgreementId}`,
        },
      },
      {
        path: 'job-roles',
        loadChildren: () =>
          import('./journeys/job-roles-journey-loader.module').then(
            (m) => m.JobRolesJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.jobRoles,
          redirectTo: (_, route: ActivatedRouteSnapshot) => `/admin/service-agreements/${route.params.serviceAgreementId}`,
        },
      },
      {
        path: 'account-groups',
        loadChildren: () =>
          import('./journeys/account-groups-journey-loader.module').then(
            (m) => m.AccountGroupsJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.accountGroups,
          redirectTo: (_, route: ActivatedRouteSnapshot) => `/admin/service-agreements/${route.params.serviceAgreementId}`,
        },
      },
      {
        path: 'payee-groups',
        loadChildren: () => import('./journeys/payee-groups-journey-loader.module').then((m) => m.PayeeGroupsJourneyBundleModule),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.payeeGroups,
          redirectTo: (_, route: ActivatedRouteSnapshot) => `/admin/service-agreements/${route.params.serviceAgreementId}`,
        },
      },
      {
        path: 'approvals',
        loadChildren: () =>
          import('./journeys/approvals-journey-loader.module').then(
            (m) => m.ApprovalsJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.approvals,
          redirectTo: (_, route: ActivatedRouteSnapshot) => `/admin/service-agreements/${route.params.serviceAgreementId}`,
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(serviceAgreementModeRoutes),
    ServiceAgreementModeFeatureChromeModule,
  ],
})
export class ServiceAgreementModeRoutesModule {}
