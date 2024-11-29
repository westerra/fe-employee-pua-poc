/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always include an array named
 * `routes` of type `Routes` and should always export an `@NgModule` class named
 * `BankAdminWorkspaceRoutesModule`.
 *
 * You may freely alter the routes defined in this file, but please be aware that
 * doing so may prevent some future updates being automatically applied by
 * migration schematics.  In such cases, the schematic will log a warning and
 * manual steps may be required to adopt any new features or fix breaking changes.
 *
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EmployeeWebAppLayoutModule,
  WorkspaceContainerComponent,
} from '@backbase/employee-web-app-shared-ui-layout';
import {
  withEntitlements,
  ResolveEntitlements,
} from '@backbase/foundation-ang/entitlements';
import { bankAdminEntitlements as entitlements } from './entitlements';

const auditRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./journeys/audit-journey-loader.module').then(
        (mod) => mod.AuditJourneyLoaderModule
      ),
  },
];

const topicManagementRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./journeys/messages-manage-topics-journey-loader.module').then(
        (mod) => mod.MessagesManageTopicsJourneyLoaderModule
      ),
  },
];

const routes: Routes = [
  {
    path: '',
    component: WorkspaceContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user-enrollment',
      },
      {
        path: 'user-enrollment',
        loadChildren: () =>
          import('./journeys/user-enrollment-journey-loader.module').then(
            (m) => m.UserEnrollmentJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.userEnrollment,
            async (resolveEntitlements: ResolveEntitlements) => {
              if (await resolveEntitlements(entitlements.approvalLog)) {
                return '/admin/approval-log';
              }
              if (await resolveEntitlements(entitlements.audit)) {
                return '/admin/audit';
              }
              if (await resolveEntitlements(entitlements.createUser)) {
                return '/admin/create-user';
              }
              if (await resolveEntitlements(entitlements.globalLimits)) {
                return '/admin/global-limits';
              }
              if (await resolveEntitlements(entitlements.serviceAgreements)) {
                return '/admin/service-agreements/search';
              }
              if (await resolveEntitlements(entitlements.topics)) {
                return '/admin/topics';
              }
              if (await resolveEntitlements(entitlements.legalEntities)) {
                return '/admin/legal-entities';
              }
              if (
                await resolveEntitlements(entitlements.conversationCategory)
              ) {
                return '/admin/conversation-category';
              }
              return '/';
            }
          ),
        ],
        title: $localize`:Page title for the user enrollment journey, within bank-admin@@bb-ewa.bank-admin.user-enrollment.page-title:User enrollment`,
      },
      {
        path: 'create-user',
        loadChildren: () =>
          import('./journeys/create-user-journey-loader.module').then(
            (m) => m.CreateUserJourneyLoaderModule
          ),
        canActivate: [withEntitlements(entitlements.createUser, '/admin')],
        title: $localize`:Page title for the create user journey, within bank-admin@@bb-ewa.bank-admin.create-user.page-title:Create user`,
      },
      {
        path: 'audit',
        children: auditRoutes,
        canActivate: [withEntitlements(entitlements.audit, '/admin')],
        title: $localize`:Page title for the audit journey, within bank-admin@@bb-ewa.bank-admin.audit.page-title:Audit`,
      },
      {
        path: 'topics',
        children: topicManagementRoutes,
        canActivate: [withEntitlements(entitlements.topics, '/admin')],
        title: $localize`:Page title for the topic management journey, within bank-admin@@bb-ewa.bank-admin.top-management.page-title:Topic management`,
      },
      {
        path: 'service-agreements/search',
        loadChildren: () =>
          import('./journeys/service-agreements-journey-loader.module').then(
            (m) => m.ServiceAgreementsJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(entitlements.serviceAgreements, '/admin'),
        ],
        title: $localize`:Page title for the search view of the service agreements journey, within bank-admin@@bb-ewa.bank-admin.service-agreements.search.page-title:Service agreements`,
      },
      {
        path: 'approval-log',
        loadChildren: () =>
          import('./journeys/approval-log-journey-loader.module').then(
            (m) => m.ApprovalLogJourneyLoaderModule
          ),
        canActivate: [withEntitlements(entitlements.approvalLog, '/admin')],
        title: $localize`:Page title for the approval log journey, within bank-admin@@bb-ewa.bank-admin.approval-log.page-title:Approval log`,
      },
      {
        path: 'global-limits',
        loadChildren: () =>
          import('./journeys/global-limits-journey-loader.module').then(
            (m) => m.GlobalLimitsJourneyLoaderModule
          ),
        canActivate: [withEntitlements(entitlements.globalLimits, '/admin')],
        title: $localize`:Page title for the global limits journey, within bank-admin@@bb-ewa.bank-admin.global-limits.page-title:Global limits`,
      },
      {
        path: 'legal-entities',
        loadChildren: () =>
          import('./journeys/legal-entities-journey-loader.module').then(
            (m) => m.LegalEntitiesJourneyLoaderModule
          ),
        canActivate: [withEntitlements(entitlements.legalEntities, '/admin')],
        title: $localize`:Page title for the legal entities journey, within bank-admin@@bb-ewa.bank-admin.legal-entities.page-title:Legal entities`,
      },
      {
        path: 'conversation-category',
        loadChildren: () =>
          import('./journeys/conversation-category-journey-loader.module').then(
            (m) => m.ConversationCategoryJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(entitlements.conversationCategory, '/admin'),
        ],
        title: $localize`:Page title for the conversation category journey, within bank-admin@@bb-ewa.bank-admin.conversation-category.page-title:Conversation category`,
      },
      {
        path: 'global-restrictions',
        loadChildren: () =>
          import('./journeys/global-mac-journey-loader.module').then(
            (m) => m.GlobalMacJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(entitlements.globalRestrictions, '/admin'),
        ],
        title: $localize`:Page title for the global restrictions journey, within bank-admin@@bb-ewa.bank-admin.global-restrictions.page-title:Global restrictions`,
      },
    ],
    canActivate: [
      withEntitlements(Object.values(entitlements).join(' OR '), '/'),
    ],
  },
  {
    path: 'service-agreements',
    pathMatch: 'full',
    redirectTo: 'service-agreements/search',
  },
  {
    path: 'service-agreements',
    loadChildren: () =>
      import(
        './service-agreement-mode/service-agreement-mode-loader.module'
      ).then((mod) => mod.ServiceAgreementModeLoaderModule),
    canActivate: [withEntitlements(entitlements.serviceAgreements, '/admin')],
    title: $localize`:Page title for the service agreements journey, within bank-admin@@bb-ewa.bank-admin.service-agreements.page-title:Service agreements`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), EmployeeWebAppLayoutModule],
})
export class BankAdminWorkspaceRoutesModule {}
