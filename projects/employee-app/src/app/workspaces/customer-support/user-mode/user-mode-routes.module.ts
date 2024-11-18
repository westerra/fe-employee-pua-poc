/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always include an array named
 * `routes` of type `Routes` and should always export an `@NgModule` class named
 * `UserModeRoutesModule`.
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
  UserModeComponent,
  UserModeFeatureChromeModule,
} from '@backbase/employee-web-app-user-mode-feature-chrome';
import {
  MessagesComponent,
  UserModeFeatureMessagesModule,
} from '@backbase/employee-web-app-user-mode-feature-messages';
import {
  ActivityLogComponent,
  UserModeFeatureActivityLogModule,
} from '@backbase/employee-web-app-user-mode-feature-activity-log';
import { AssistAreaContainerComponent } from '@backbase/employee-web-app-shared-ui-layout';
import { EntitlementsGuard } from '@backbase/foundation-ang/entitlements';
import {
  UserMessagesCustomComponent,
  UserModeFeatureMessagesExtendedModule,
} from '@backbase/westerra';

export const entitlements = Object.freeze({
  security: 'Identities.ManageIdentities.edit',
  devices: "Device.ManageOtherUser'sDevices.view",
  products: 'Employee.Emulate.view',
  messages:
    'MessageCenter.ManageMessages.view OR MessageCenter.SuperviseMessages.view',
  audit: 'Audit.Audit.view',
  profile: 'Identities.ManageIdentities.view',
  sessions: 'Identities.ManageIdentities.view',
  comments: 'Comments.ManageEmployeeComments.view',
  cards: 'Employee.Emulate.view',
  overview: 'UserProfiles.ManageUserProfiles.view',
  conversationHistoryView: 'ConversationHistory.ConversationHistory.view',
  conversationHistoryCreate: 'ConversationHistory.ConversationHistory.create',
  paymentOrders: 'Payments.*.view',
});

const assistAreaRoutes: Routes = [
  {
    path: '',
    outlet: 'assist',
    component: AssistAreaContainerComponent,
    data: { reuseKey: 'user-mode-assist' },
    children: [
      {
        path: 'actions',
        loadChildren: () =>
          import(
            './journeys/assist-area-quick-actions-journey-loader.module'
          ).then((m) => m.AssistAreaQuickActionsJourneyLoaderModule),
        data: {
          tabLabel: $localize`:Quick assist tab label|Quick assist tab label on the Customer Mode page@@bb-ewa-user-mode.assist-area.tabs.quick-assist:Quick assist`,
          icon: 'lightbulb-outline',
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'actions',
      },
      {
        path: 'conversation-summary',
        loadChildren: () =>
          import(
            './journeys/assist-area-conversation-summary-journey-loader.module'
          ).then((m) => m.AssistAreaConversationSummaryJourneyLoaderModule),
        data: {
          tabLabel: $localize`:Conversation summary tab label|Conversation summary tab label on the Customer Mode page@@bb-ewa-user-mode.assist-area.tabs.conversation-summary:Conversation summary`,
          entitlements: entitlements.conversationHistoryCreate,
          icon: 'mode-edit',
        },
      },
    ],
  },
];

const routes: Routes = [
  {
    path: 'sa',
    redirectTo: 'sa/-',
  },
  {
    path: 'sa/:serviceAgreementId',
    component: UserModeComponent,
    children: [
      {
        path: 'security',
        loadChildren: () =>
          import(
            './journeys/admin-manage-login-security-journey-loader.module'
          ).then((m) => m.AdminManageLoginSecurityJourneyLoaderModule),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.security,
          redirectTo: (_, route: ActivatedRouteSnapshot) =>
            `/support/users/${route.params.userId}/overview`,
        },
      },
      {
        path: 'devices',
        loadChildren: () =>
          import('./journeys/device-management-journey-loader.module').then(
            (m) => m.DeviceManagementJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.devices,
          redirectTo: (_, route: ActivatedRouteSnapshot) =>
            `/support/users/${route.params.userId}/overview`,
        },
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./journeys/products-journey-loader.module').then(
            (m) => m.ProductsJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.products,
          redirectTo: (_, route: ActivatedRouteSnapshot) =>
            `/support/users/${route.params.userId}/overview`,
        },
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./journeys/payments-journey-loader.module').then(
            (m) => m.PaymentsJourneyLoaderModule
          ),
        data: {
          entitlements: entitlements.paymentOrders,
          redirectTo: (_, route: ActivatedRouteSnapshot) =>
            `/support/users/${route.params.userId}/overview`,
        },
        canActivate: [EntitlementsGuard],
      },
      {
        path: 'messages',
        // component: MessagesComponent,
        component: UserMessagesCustomComponent,
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.messages,
          redirectTo: (_, route: ActivatedRouteSnapshot) =>
            `/support/users/${route.params.userId}/overview`,
        },
      },
      {
        path: 'activity-log',
        component: ActivityLogComponent,
        loadChildren: () =>
          import('./journeys/audit-journey-loader.module').then(
            (m) => m.AuditJourneyLoaderModule
          ),
        canLoad: [EntitlementsGuard],
        data: {
          entitlements: entitlements.audit,
          redirectTo: (_, route: ActivatedRouteSnapshot) =>
            `/support/users/${route.params.userId}/overview`,
        },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./journeys/user-profile-journey-loader.module').then(
            (m) => m.UserProfileJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: { entitlements: entitlements.profile, redirectTo: '/support' },
      },
      {
        path: 'sessions',
        loadChildren: () =>
          import('./journeys/user-sessions-journey-loader.module').then(
            (m) => m.UserSessionsJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.sessions,
          redirectTo: (_, route: ActivatedRouteSnapshot) =>
            `/support/users/${route.params.userId}/overview`,
        },
      },
      {
        path: 'comments',
        loadChildren: () =>
          import('./journeys/user-comments-journey-loader.module').then(
            (m) => m.UserCommentsJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.comments,
          redirectTo: (_, route: ActivatedRouteSnapshot) =>
            `/support/users/${route.params.userId}/overview`,
        },
      },
      {
        path: 'cards',
        loadChildren: () =>
          import('./journeys/cards-journey-loader.module').then(
            (m) => m.CardsJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.cards,
          redirectTo: (_, route: ActivatedRouteSnapshot) =>
            `/support/users/${route.params.userId}/overview`,
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        loadChildren: () =>
          import('./journeys/user-overview-journey-loader.module').then(
            (m) => m.UserOverviewJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.overview,
          redirectTo: (_, route: ActivatedRouteSnapshot) =>
            `/support/users/${route.params.userId}/profile`,
        },
      },
      ...assistAreaRoutes,
      {
        path: 'conversation-history',
        loadChildren: () =>
          import('./journeys/conversation-history-journey-loader.module').then(
            (m) => m.ConversationHistoryJourneyLoaderModule
          ),
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.conversationHistoryView,
          redirectTo: (_, route: ActivatedRouteSnapshot) =>
            `/support/users/${route.params.userId}/overview`,
        },
      },
    ],
  },
  {
    path: '',
    redirectTo: 'sa/-',
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    UserModeFeatureChromeModule,
    // UserModeFeatureMessagesModule,
    UserModeFeatureMessagesExtendedModule,
    UserModeFeatureActivityLogModule,
  ],
})
export class UserModeRoutesModule {}
