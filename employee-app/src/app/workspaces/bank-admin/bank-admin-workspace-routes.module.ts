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
  EntitlementsGuard,
  ResolveEntitlements,
} from '@backbase/foundation-ang/entitlements';

export const entitlements = Object.freeze({
  audit: 'Audit.Audit.view',
  createUser: 'Identities.ManageIdentities.create',
  globalLimits: 'Limits.ManageGlobalLimits.view',
  serviceAgreements: 'ServiceAgreement.ManageServiceAgreements.view',
  topics: 'MessageCenter.ManageTopics.view',
  userEnrollment: 'LegalEntity.ManageLegalEntities.create',
  legalEntities: 'LegalEntity.ManageLegalEntities.view',
  approvalLog: '*.*.approve',
  conversationCategory: 'ConversationHistory.ConversationHistoryConfiguration.view',
});

const auditRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./journeys/audit-journey-loader.module').then(mod => mod.AuditJourneyLoaderModule),
  },
];

const topicManagementRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./journeys/messages-manage-topics-journey-loader.module').then(
      (mod) => mod.MessagesManageTopicsJourneyLoaderModule
    )
  },
];

const routes: Routes = [
  {
    path: '',
    component: WorkspaceContainerComponent,
    data: {
      entitlements: Object.values(entitlements).join(' OR '),
      redirectTo: '/',
    },
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
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.userEnrollment,
          redirectTo: async (resolveEntitlements: ResolveEntitlements) => {
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
            if (await resolveEntitlements(entitlements.conversationCategory)) {
              return '/admin/conversation-category';
            }
            return '/';
          },
        },
      },
      {
        path: 'create-user',
        loadChildren: () =>
          import('./journeys/create-user-journey-loader.module').then(
            (m) => m.CreateUserJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: { entitlements: entitlements.createUser, redirectTo: '/admin' },
      },
      {
        path: 'audit',
        children: auditRoutes,
        canActivate: [EntitlementsGuard],
        data: { entitlements: entitlements.audit, redirectTo: '/admin' },
      },
      {
        path: 'topics',
        children: topicManagementRoutes,
        canActivate: [EntitlementsGuard],
        data: { entitlements: entitlements.topics, redirectTo: '/admin' },
      },
      {
        path: 'service-agreements/search',
        loadChildren: () =>
          import('./journeys/service-agreements-journey-loader.module').then(
            (m) => m.ServiceAgreementsJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.serviceAgreements,
          redirectTo: '/admin',
        },
      },
      {
        path: 'approval-log',
        loadChildren: () =>
          import('./journeys/approval-log-journey-loader.module').then(
            (m) => m.ApprovalLogJourneyLoaderModule
          ),
        data: {
          entitlements: entitlements.approvalLog,
          redirectTo: '/admin',
        },
        canActivate: [EntitlementsGuard],
      },
      {
        path: 'global-limits',
        loadChildren: () =>
          import('./journeys/global-limits-journey-loader.module').then(
            (m) => m.GlobalLimitsJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: { entitlements: entitlements.globalLimits, redirectTo: '/admin' },
      },
      {
        path: 'legal-entities',
        loadChildren: () =>
          import('./journeys/legal-entities-journey-loader.module').then(
            m => m.LegalEntitiesJourneyLoaderModule,
          ),
        canActivate: [EntitlementsGuard],
        data: { entitlements: entitlements.legalEntities, redirectTo: '/admin' },
      },
      {
        path: 'conversation-category',
        loadChildren: () =>
          import('./journeys/conversation-category-journey-loader.module').then(
            m => m.ConversationCategoryJourneyLoaderModule,
          ),
        canActivate: [EntitlementsGuard],
        data: { entitlements: entitlements.conversationCategory, redirectTo: '/admin' },
      },
    ],
    canActivate: [EntitlementsGuard],
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
    canActivate: [EntitlementsGuard],
    data: {
      entitlements: entitlements.serviceAgreements,
      redirectTo: '/admin',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    EmployeeWebAppLayoutModule
  ],
})
export class BankAdminWorkspaceRoutesModule {}
