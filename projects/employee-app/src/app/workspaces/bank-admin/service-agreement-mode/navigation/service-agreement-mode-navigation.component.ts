/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export the class
 * `ServiceAgreementModeNavigationComponent`.
 *
 */

import { Component } from '@angular/core';
import { entitlements } from '../service-agreement-mode-routes.module';

@Component({
  selector: 'app-service-agreement-mode-navigation',
  templateUrl: './service-agreement-mode-navigation.component.html',
})
export class ServiceAgreementModeNavigationComponent {
   readonly entitlements = entitlements;
   readonly manageServiceAgreementMenuHeaderEntitlements = `${entitlements.usersAndPermissions} OR ${entitlements.jobRoles} OR ${entitlements.accountGroups} OR ${entitlements.payeeGroups} OR ${entitlements.approvals}`;
}
