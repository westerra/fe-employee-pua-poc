/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export the class
 * `CustomerSupportWorkspaceNavigationComponent`.
 *
 */

import { Component, inject } from '@angular/core';
import { entitlements } from '../customer-support-workspace-routes.module';
import { LayoutService } from '@backbase/employee-web-app-shared-ui-layout';
import { Observable } from 'rxjs';
import { isRtl } from '@backbase/ui-ang/util';

@Component({
  selector: 'app-customer-support-workspace-navigation',
  templateUrl: './customer-support-workspace-navigation.component.html',
})
export class CustomerSupportWorkspaceNavigationComponent {
  readonly entitlements = entitlements;
  private readonly layoutService = inject(LayoutService);
  readonly isOpen$: Observable<boolean> = this.layoutService.navigationPinned$;
  readonly tooltipPlacement = isRtl() ? 'left' : 'right';
  readonly usersLabel = $localize`:User search menu item|Link text to navigate to the user search form@@employee-app.customer-support-nav.user-search:Users`;
  readonly messageCenterLabel = $localize`:Message centre menu item|Link text to navigate to the employee message centre@@employee-app.customer-support-nav.message-centre:Message center`;
}
