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
import { UserModeFeatureActivityLogModule } from '@backbase/employee-web-app-user-mode-feature-activity-log';
import { AssistAreaContainerComponent } from '@backbase/employee-web-app-shared-ui-layout';
import { withEntitlements } from '@backbase/foundation-ang/entitlements';
import {
  UserMessagesCustomComponent,
  UserModeFeatureMessagesExtendedModule,
} from '@backbase/westerra';
import { AssistAreaQuickActionsTabComponent } from '@backbase/employee-web-app-user-mode-feature-assist-area-quick-actions';
import { UsersFullNameTitleResolver } from '@backbase/employee-web-app-shared-data-user-mode-context';
import { MessageTitleResolver } from '@backbase/messages-employee-inbox-journey-ang';
import {
  getServiceAgreementSelectionJourneyWrapperRouteData,
  ServiceAgreementSelectionJourneyWrapperComponent,
} from '@backbase/employee-web-app-user-mode-feature-service-agreement-selector';

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
  createPayment: 'Payments.*.create',
  pockets: 'Employee.Emulate.view',
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
          tabComponent: () => AssistAreaQuickActionsTabComponent,
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
        canActivate: [withEntitlements(entitlements.conversationHistoryCreate)],
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
        canActivate: [
          withEntitlements(
            entitlements.security,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        title: $localize`:Page title for the login & security journey, within the user-mode@@bb-ewa.user-mode.login-and-security.page-title:Login & security`,
      },
      {
        path: 'devices',
        loadChildren: () =>
          import('./journeys/device-management-journey-loader.module').then(
            (m) => m.DeviceManagementJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.devices,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        title: $localize`:Page title for the devices journey, within the user-mode@@bb-ewa.user-mode.devices.page-title:Devices`,
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./journeys/products-journey-loader.module').then(
            (m) => m.ProductsJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.products,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        title: $localize`:Page title for the products journey, within user-mode@@bb-ewa.user-mode.products.page-title:Products`,
      },
      {
        path: 'initiate-payment',
        data: {
          ...getServiceAgreementSelectionJourneyWrapperRouteData({
            header: $localize`:
          The main header on the initiate payment journey in the user mode
          @@bb-ewa.initiate-payment-journey.shell.header:
          Move money`,
            helperText: (serviceAgreementName) => $localize`:
          Helper text indicating the service agreement context on the initiate payments page
          @@bb-ewa.initiate-payment-journey.shell.service-agreement-context-helper:
          Payments for accounts visible to the customer in the service agreement '${serviceAgreementName}'`,
          }),
        },
        component: ServiceAgreementSelectionJourneyWrapperComponent,
        loadChildren: () =>
          import('./journeys/initiate-payment-journey-loader.module').then(
            (m) => m.InitiatePaymentJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.createPayment,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        title: $localize`:Page title for the initiate payment journey, within user-mode@@bb-ewa.user-mode.initiate-payment.page-title:Move money`,
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./journeys/payments-journey-loader.module').then(
            (m) => m.PaymentsJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.paymentOrders,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        title: $localize`:Page title for the payments journey, within user-mode@@bb-ewa.user-mode.payments.page-title:Payment orders`,
      },
      {
        path: 'messages',
        // component: MessagesComponent,
        loadChildren: () =>
          import('./journeys/assist-messaging-journey-loader.module').then(
            (m) => m.AssistMessagingJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.messages,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        data: {
          conversationIdQueryParamName: 'cid',
        },
        title: MessageTitleResolver,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      },
      {
        path: 'activity-log',
        loadChildren: () =>
          import('./journeys/audit-journey-loader.module').then(
            (m) => m.AuditJourneyLoaderModule
          ),
        canMatch: [
          withEntitlements(
            entitlements.audit,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        title: $localize`:Page title for the activity log journey, within user-mode@@bb-ewa.user-mode.activity-log.page-title:Activity log`,
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./journeys/user-profile-journey-loader.module').then(
            (m) => m.UserProfileJourneyLoaderModule
          ),
        canActivate: [withEntitlements(entitlements.profile, '/support')],
        title: $localize`:Page title for the user profile journey, within the user-mode@@bb-ewa.user-mode.user-profile.page-title:Profile`,
      },
      {
        path: 'sessions',
        loadChildren: () =>
          import('./journeys/user-sessions-journey-loader.module').then(
            (m) => m.UserSessionsJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.sessions,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        title: $localize`:Page title for the sessions journey, within the user-mode@@bb-ewa.user-mode.sessions.page-title:Sessions`,
      },
      {
        path: 'comments',
        loadChildren: () =>
          import('./journeys/user-comments-journey-loader.module').then(
            (m) => m.UserCommentsJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.comments,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        title: $localize`:Page title for the comments journey, within the user-mode@@bb-ewa.user-mode.comments.page-title:Comments`,
      },
      {
        path: 'cards',
        loadChildren: () =>
          import('./journeys/cards-journey-loader.module').then(
            (m) => m.CardsJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.cards,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        title: $localize`:Page title for the cards journey, within the user-mode@@bb-ewa.user-mode.cards.page-title:Cards`,
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
        canActivate: [
          withEntitlements(
            entitlements.overview,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/profile`
          ),
        ],
        title: $localize`:Page title for the user overview journey, within user-mode@@bb-ewa.user-mode.user-overview.page-title:User overview`,
      },
      ...assistAreaRoutes,
      {
        path: 'conversation-history',
        loadChildren: () =>
          import('./journeys/conversation-history-journey-loader.module').then(
            (m) => m.ConversationHistoryJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.conversationHistoryView,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        title: $localize`:Page title for the conversation history journey, within the user-mode@@bb-ewa.user-mode.conversation-history.page-title:Conversation history`,
      },
      {
        path: 'pockets',
        loadChildren: () =>
          import('./journeys/pockets-journey-loader.module').then(
            (m) => m.PocketsJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.pockets,
            (_, route: ActivatedRouteSnapshot) =>
              `/support/users/${route.params.userId}/overview`
          ),
        ],
        title: $localize`:Page title for the pockets journey, within user-mode@@bb-ewa.user-mode.pockets.page-title:Pockets`,
      },
    ],
    title: UsersFullNameTitleResolver,
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
