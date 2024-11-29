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
import { withEntitlements } from '@backbase/foundation-ang/entitlements';
import { ServiceAgreementNameTitleResolver } from '@backbase/employee-web-app-shared-data-service-agreement-mode-context';

export const entitlements = Object.freeze({
  overview: 'ServiceAgreement.ManageServiceAgreements.view',
  approvals:
    'Approvals.ManageApprovalPolicyandLevel.view AND Approvals.AssignApprovalPolicies.view',
  usersAndPermissions: 'User.ManageUsers.view',
  jobRoles: 'Entitlements.ManageFunctionGroups.view',
  accountGroups: 'Entitlements.ManageDataGroups.view',
  payeeGroups: 'Entitlements.ManageDataGroups.view',
  localRestrictions:
    'Entitlements.ManageFunctionGroups.view AND Approvals.ManageApprovalPolicyRestrictions.view',
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
            (m) => m.UserPermissionsJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.usersAndPermissions,
            (_, route: ActivatedRouteSnapshot) =>
              `/admin/service-agreements/${route.params.serviceAgreementId}`
          ),
        ],
        title: $localize`:Page title for the users & permissions journey, within the service agreement mode@@bb-ewa.service-agreement-mode.users-and-permissions.page-title:Users & permissions`,
      },
      {
        path: 'job-roles',
        loadChildren: () =>
          import('./journeys/job-roles-journey-loader.module').then(
            (m) => m.JobRolesJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.jobRoles,
            (_, route: ActivatedRouteSnapshot) =>
              `/admin/service-agreements/${route.params.serviceAgreementId}`
          ),
        ],
        title: $localize`:Page title for the job roles journey, within the service agreement mode@@bb-ewa.service-agreement-mode.job-roles.page-title:Job roles`,
      },
      {
        path: 'account-groups',
        loadChildren: () =>
          import('./journeys/account-groups-journey-loader.module').then(
            (m) => m.AccountGroupsJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.accountGroups,
            (_, route: ActivatedRouteSnapshot) =>
              `/admin/service-agreements/${route.params.serviceAgreementId}`
          ),
        ],
        title: $localize`:Page title for the account groups journey, within the service agreement mode@@bb-ewa.service-agreement-mode.account-groups.page-title:Account groups`,
      },
      {
        path: 'payee-groups',
        loadChildren: () =>
          import('./journeys/payee-groups-journey-loader.module').then(
            (m) => m.PayeeGroupsJourneyBundleModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.payeeGroups,
            (_, route: ActivatedRouteSnapshot) =>
              `/admin/service-agreements/${route.params.serviceAgreementId}`
          ),
        ],
        title: $localize`:Page title for the payee groups journey, within the service agreement mode@@bb-ewa.service-agreement-mode.payee-groups.page-title:Payee groups`,
      },
      {
        path: 'approvals',
        loadChildren: () =>
          import('./journeys/approvals-journey-loader.module').then(
            (m) => m.ApprovalsJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.approvals,
            (_, route: ActivatedRouteSnapshot) =>
              `/admin/service-agreements/${route.params.serviceAgreementId}`
          ),
        ],
        title: $localize`:Page title for the approvals journey, within the service agreement mode@@bb-ewa.service-agreement-mode.approvals.page-title:Approvals`,
      },
      {
        path: 'local-restrictions',
        loadChildren: () =>
          import('./journeys/local-mac-journey-loader.module').then(
            (m) => m.LocalMacJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.localRestrictions,
            (_, route: ActivatedRouteSnapshot) =>
              `/admin/service-agreements/${route.params.serviceAgreementId}`
          ),
        ],
        title: $localize`:Page title for the local restrictions journey, within the service agreement mode@@bb-ewa.service-agreement-mode.local-restrictions.page-title:Local restrictions`,
      },
    ],
    title: ServiceAgreementNameTitleResolver,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(serviceAgreementModeRoutes),
    ServiceAgreementModeFeatureChromeModule,
  ],
})
export class ServiceAgreementModeRoutesModule {}
