/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export the class
 * `BankAdminWorkspaceNavigationComponent`.
 *
 */

import { Component, inject } from '@angular/core';
import { bankAdminEntitlements as entitlements } from '../entitlements';
import { LayoutService } from '@backbase/employee-web-app-shared-ui-layout';
import { Observable } from 'rxjs';
import { isRtl } from '@backbase/ui-ang/util';

/**
 * If the user satisfies ANY ONE of these entitlements strings, they will see the configuration menu header.
 */
const CONFIGURATION_HEADER_ENTITLEMENTS = [
  entitlements.globalRestrictions,
  entitlements.globalLimits,
];

@Component({
  selector: 'app-bank-admin-workspace-navigation',
  templateUrl: './bank-admin-workspace-navigation.component.html',
})
export class BankAdminWorkspaceNavigationComponent {
  readonly entitlements = entitlements;
  readonly configMenuHeaderEntitlements =
    CONFIGURATION_HEADER_ENTITLEMENTS.join(' OR ');
  private readonly layoutService = inject(LayoutService);
  readonly isOpen$: Observable<boolean> = this.layoutService.navigationPinned$;
  readonly tooltipPlacement = isRtl() ? 'left' : 'right';
  readonly userEnrollmentLabel = $localize`:User enrollment menu item|Link text to navigate to the User enrollment admin page@@employee-app.bank-admin-nav.user-enrollment:User enrollment`;
  readonly createUserLabel = $localize`:Create user menu item|Link text to navigate to the create user admin page@@employee-app.bank-admin-nav.create-user:Create user`;
  readonly legalEntitiesLabel = $localize`:Legal entities menu item|Link text to navigate to the Legal entities admin page@@employee-app.bank-admin-nav.legal-entities:Legal entities`;
  readonly serviceAgreementsLabel = $localize`:Service Agreements menu item|Link text to navigate to the Service Agreements admin page@@employee-app.bank-admin-nav.service-agreements:Service agreements`;
  readonly approvalLogLabel = $localize`:Approval log menu item|Link text to navigate to the Approval log page@@employee-app.bank-admin-nav.approval-log:Approval log`;
  readonly auditLabel = $localize`:Audit menu item|Link text to navigate to the Audit page in the Bank admin workspace@@employee-app.bank-admin-nav.audit:Audit`;
  readonly topicManagementLabel = $localize`:Topic management menu item|Link text to navigate to the Topic management page@@employee-app.bank-admin-nav.topic-management:Topic management`;
  readonly conversationCategoryLabel = $localize`:Conversation category menu item|Link text to navigate to the conversation category page@@employee-app.bank-admin-nav.conversation-category:Conversation category`;
  readonly globalLimitsLabel = $localize`:Global limits menu item|Link text to navigate to the Global Limits page@@employee-app.bank-admin-nav.global-limits:Global limits`;
  readonly globalRestrictionsLabel = $localize`:Global restrictions menu item|Link text to navigate to the Global restrictions page@@employee-app.bank-admin-nav.global-minimum-approver-count:Global restrictions`;
}
