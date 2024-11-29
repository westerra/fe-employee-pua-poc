/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always include an array named
 * `routes` of type `Routes` and should always export an `@NgModule` class named
 * `CustomerSupportWorkspaceRoutesModule`.
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

export const entitlements = Object.freeze({
  userSearch: 'User.ManageUsers.view',
  messageCenter:
    'MessageCenter.ManageMessages.view OR MessageCenter.SuperviseMessages.view',
});

const messageCenterRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./journeys/messages-employee-inbox-journey-loader.module').then(
        (m) => m.MessagesEmployeeInboxJourneyLoaderModule
      ),
  },
];

const routes: Routes = [
  {
    path: 'users/:userId',
    loadChildren: () =>
      import('./user-mode/user-mode-loader.module').then(
        (mod) => mod.UserModeLoaderModule
      ),
    title: $localize`:Page title for the user-mode@@bb-ewa.user-mode.page-title:Users`,
  },
  {
    path: '',
    component: WorkspaceContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./journeys/user-search-journey-loader.module').then(
            (m) => m.UserSearchJourneyLoaderModule
          ),
        canActivate: [
          withEntitlements(
            entitlements.userSearch,
            async (resolveEntitlements: ResolveEntitlements) => {
              if (await resolveEntitlements(entitlements.messageCenter))
                return '/support/messages';
              return '/admin';
            }
          ),
        ],
        title: $localize`:Page title for user search in the customer support workspace@@bb-ewa.customer-support.user-search.page-title:Find a user`,
      },
      {
        path: 'messages',
        children: messageCenterRoutes,
        canActivate: [
          withEntitlements(entitlements.messageCenter, '/support/users'),
        ],
        title: $localize`:Page title for message center in the customer support workspace@@bb-ewa.customer-support.message-center.page-title:Message center`,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), EmployeeWebAppLayoutModule],
})
export class CustomerSupportWorkspaceRoutesModule {}
