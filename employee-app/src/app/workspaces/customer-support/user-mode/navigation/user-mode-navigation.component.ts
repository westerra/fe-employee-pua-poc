/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export the class
 * `UserModeNavigationComponent`.
 *
 */

import { Component } from '@angular/core';
import { entitlements } from '../user-mode-routes.module';

@Component({
  selector: 'app-user-mode-navigation',
  templateUrl: './user-mode-navigation.component.html',
})
export class UserModeNavigationComponent {
  readonly entitlements = entitlements;
  readonly userSupportMenuHeaderEntitlements = `${entitlements.profile} OR ${entitlements.security} OR ${entitlements.devices} OR ${entitlements.sessions}`;
  readonly customerActivityHeaderEntitlements = `${entitlements.comments} OR ${entitlements.audit} OR ${entitlements.messages}`;
  readonly productAndPaymentHeaderEntitlements = ` ${entitlements.products} OR ${entitlements.cards} OR ${entitlements.paymentOrders}`;
}
