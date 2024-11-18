/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export the class
 * `CustomerSupportWorkspaceNavigationComponent`.
 *
 */

import { Component } from '@angular/core';
import { entitlements } from '../customer-support-workspace-routes.module';

@Component({
  selector: 'app-customer-support-workspace-navigation',
  templateUrl: './customer-support-workspace-navigation.component.html',
})
export class CustomerSupportWorkspaceNavigationComponent {
  readonly entitlements = entitlements;
}
