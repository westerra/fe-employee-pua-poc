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
import { EntitlementsGuard, ResolveEntitlements } from '@backbase/foundation-ang/entitlements';

export const entitlements = Object.freeze({
  userSearch: 'User.ManageUsers.view',
  messageCenter: 'MessageCenter.ManageMessages.view OR MessageCenter.SuperviseMessages.view',
});

const messageCenterRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./journeys/messages-employee-inbox-journey-loader.module').then(
      (m) => m.MessagesEmployeeInboxJourneyLoaderModule
    )
  },
];

const routes: Routes = [
  {
    path: 'users/:userId',
    loadChildren: () =>
      import('./user-mode/user-mode-loader.module').then(
        (mod) => mod.UserModeLoaderModule
      ),
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
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.userSearch,
          redirectTo: async (resolveEntitlements: ResolveEntitlements) => {
            if (await resolveEntitlements(entitlements.messageCenter)) return '/support/messages';
            return '/admin';
          }
        },
      },
      {
        path: 'messages',
        children: messageCenterRoutes,
        canActivate: [EntitlementsGuard],
        data: {
          entitlements: entitlements.messageCenter,
          redirectTo: '/support/users'
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    EmployeeWebAppLayoutModule,
  ],
})
export class CustomerSupportWorkspaceRoutesModule {}
