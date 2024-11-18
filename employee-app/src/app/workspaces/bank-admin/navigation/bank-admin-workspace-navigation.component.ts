/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export the class
 * `BankAdminWorkspaceNavigationComponent`.
 *
 */

import { Component } from '@angular/core';
import { entitlements } from '../bank-admin-workspace-routes.module';

@Component({
  selector: 'app-bank-admin-workspace-navigation',
  templateUrl: './bank-admin-workspace-navigation.component.html',
})
export class BankAdminWorkspaceNavigationComponent {
  readonly entitlements = entitlements;
  readonly configMenuHeaderEntitlements = entitlements.globalLimits;
}
