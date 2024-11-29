/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export the class
 * `UserModeNavigationComponent`.
 *
 */

import { Component, inject } from '@angular/core';
import { entitlements } from '../user-mode-routes.module';
import { LayoutService } from '@backbase/employee-web-app-shared-ui-layout';
import { Observable } from 'rxjs';
import { isRtl } from '@backbase/ui-ang/util';

/**
 * If the user satisfies ANY ONE of these entitlements strings, they will see the user support menu header.
 */
const USER_SUPPORT_HEADER_ENTITLEMENTS = [
  entitlements.profile,
  entitlements.security,
  entitlements.devices,
  entitlements.sessions,
];
/**
 * If the user satisfies ANY ONE of these entitlements strings, they will see the customer activity menu header.
 */
const CUSTOMER_ACTIVITY_HEADER_ENTITLEMENTS = [
  entitlements.comments,
  entitlements.audit,
  entitlements.messages,
  entitlements.conversationHistoryCreate,
  entitlements.conversationHistoryView,
];
/**
 * If the user satisfies ANY ONE of these entitlements strings, they will see the product and payment menu header.
 */
const PRODUCT_AND_PAYMENT_HEADER_ENTITLEMENTS = [
  entitlements.products,
  entitlements.cards,
  entitlements.paymentOrders,
  entitlements.pockets,
  entitlements.createPayment,
];

@Component({
  selector: 'app-user-mode-navigation',
  templateUrl: './user-mode-navigation.component.html',
})
export class UserModeNavigationComponent {
  readonly entitlements = entitlements;
  readonly userSupportMenuHeaderEntitlements =
    USER_SUPPORT_HEADER_ENTITLEMENTS.join(' OR ');
  readonly customerActivityHeaderEntitlements =
    CUSTOMER_ACTIVITY_HEADER_ENTITLEMENTS.join(' OR ');
  readonly productAndPaymentHeaderEntitlements =
    PRODUCT_AND_PAYMENT_HEADER_ENTITLEMENTS.join(' OR ');
  private readonly layoutService = inject(LayoutService);
  readonly isOpen$: Observable<boolean> = this.layoutService.navigationPinned$;
  readonly tooltipPlacement = isRtl() ? 'left' : 'right';
  readonly customerOverviewLabel = $localize`:Customer overview menu item|Link text to navigate to the customer overview page@@employee-app.user-mode-nav.customer-overview:Customer overview`;
  readonly profileLabel = $localize`:Profile menu item|Link text to navigate to the profile page@@employee-app.user-mode-nav.profile:Profile`;
  readonly loginAndSecurityLabel = $localize`:Login & security menu item|Link text to navigate to the login & security page@@employee-app.user-mode-nav.security:Login & security`;
  readonly devicesLabel = $localize`:Devices menu item|Link text to navigate to the device details page@@employee-app.user-mode-nav.devices:Devices`;
  readonly sessionsLabel = $localize`:Sessions menu item|Link text to navigate to the sessions page@@employee-app.user-mode-nav.sessions:Sessions`;
  readonly productsLabel = $localize`:Products menu item|Link text to navigate to the products page@@employee-app.user-mode-nav.products:Products`;
  readonly cardsLabel = $localize`:Cards menu item|Link text to navigate to the cards page@@employee-app.user-mode-nav.cards:Cards`;
  readonly moveMoneyLabel = $localize`:Move money menu item|Link text to navigate to the move money page@@employee-app.user-mode-nav.move-money:Move money`;
  readonly paymentOrdersLabel = $localize`:Payment orders menu item|Link text to navigate to the payment orders page@@employee-app.user-mode-nav.payment-orders:Payment orders`;
  readonly pocketsLabel = $localize`:Pockets menu item|Link text to navigate to the pockets page@@employee-app.user-mode-nav.pockets:Pockets`;
  readonly conversationHistoryLabel = $localize`:Conversation history menu item|Link text to navigate to the conversation history page@@employee-app.user-mode-nav.conversation-history:Conversation history`;
  readonly commentsLabel = $localize`:Comments menu item|Link text to navigate to the comments page@@employee-app.user-mode-nav.comments:Comments`;
  readonly activityLogLabel = $localize`:Activity log menu item|Link text to navigate to the activity log page@@employee-app.user-mode-nav.activity-log:Activity log`;
  readonly messagesLabel = $localize`:Messages menu item|Link text to navigate to the messages page in the user mode@@employee-app.user-mode-nav.messages:Messages`;
}
