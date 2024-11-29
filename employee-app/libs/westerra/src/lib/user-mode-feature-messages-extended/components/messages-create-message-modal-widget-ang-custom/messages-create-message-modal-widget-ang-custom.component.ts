import { Component } from '@angular/core';
import { MessagesEmployeeCreateMessageModalWidgetComponent } from '@backbase/messages-employee-inbox-journey-feature';
import { SharedMethodsService } from '@backbase/internal-ewa-messages-shared-data';
import { BaseCreateMessageModalPropertiesService } from '@backbase/internal-ewa-messages-shared-feature';

@Component({
  selector: 'bb-messages-create-message-modal-widget-ang-custom',
  templateUrl:
    './messages-create-message-modal-widget-ang-custom.component.html',
})
export class MessagesCreateMessageModalWidgetAngCustomComponent extends MessagesEmployeeCreateMessageModalWidgetComponent {
  constructor(
    readonly modalProperties: BaseCreateMessageModalPropertiesService,
    readonly sharedService: SharedMethodsService
  ) {
    super(modalProperties, sharedService);
  }

  ngOnInit(): void {}
}
