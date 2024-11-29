/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export the class
 * `ServiceAgreementModeNavigationComponent`.
 *
 */

import { Component, inject } from '@angular/core';
import { entitlements } from '../service-agreement-mode-routes.module';
import { LayoutService } from '@backbase/employee-web-app-shared-ui-layout';
import { Observable } from 'rxjs';
import { isRtl } from '@backbase/ui-ang/util';

@Component({
  selector: 'app-service-agreement-mode-navigation',
  templateUrl: './service-agreement-mode-navigation.component.html',
})
export class ServiceAgreementModeNavigationComponent {
  readonly entitlements = entitlements;
  private readonly layoutService = inject(LayoutService);
  readonly isOpen$: Observable<boolean> = this.layoutService.navigationPinned$;
  readonly tooltipPlacement = isRtl() ? 'left' : 'right';
  readonly usersAndPermissionsLabel = $localize`:users and permissions menu item|Link text to navigate to the users and permissions page@@employee-app.service-agreement-mode-nav.users-and-permissions:Users and permissions`;
  readonly jobRolesLabel = $localize`:job roles menu item|Link text to navigate to the job roles page@@employee-app.service-agreement-mode-nav.job-roles:Job roles`;
  readonly accountGroupsLabel = $localize`:account groups menu item|Link text to navigate to the account groups page@@employee-app.service-agreement-mode-nav.account-groups:Account groups`;
  readonly payeeGroupsLabel = $localize`:payee groups menu item|Link text to navigate to the payee groups page@@employee-app.service-agreement-mode-nav.payee-groups:Payee groups`;
  readonly approvalsLabel = $localize`:Approvals menu item|Link text to navigate to the Approvals page@@bb-ewa.service-agreement-mode.navigation.menu-item.approvals:Approvals`;
  readonly localRestrictionsLabel = $localize`:Local restrictions menu item|Link text to navigate to the Local restrictions page@@bb-ewa.service-agreement-mode.navigation.menu-item.local-minimum-approver-count:Local restrictions`;
}
