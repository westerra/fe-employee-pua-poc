import { Component } from '@angular/core';
import { MessagesComponent } from '@backbase/employee-web-app-user-mode-feature-messages';

@Component({
  selector: 'bb-ewa-user-mode-messages-custom',
  templateUrl: './user-messages-custom.component.html',
})
export class UserMessagesCustomComponent extends MessagesComponent {}
