import { ChangeDetectionStrategy, Component } from '@angular/core';
import { slideInOutFromTop } from '@backbase/employee-web-app-shared-ui-animations';

@Component({
  templateUrl: './reset-password-confirmation-extension.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInOutFromTop],
})
export class ResetPasswordConfirmationExtensionComponent {
  expanded = false;
}
