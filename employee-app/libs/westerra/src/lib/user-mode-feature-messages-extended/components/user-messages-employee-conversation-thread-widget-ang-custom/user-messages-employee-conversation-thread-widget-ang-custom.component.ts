import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesEmployeeConversationThreadWidgetComponent } from '@backbase/messages-employee-inbox-journey-feature';
import {
  AbstractBaseMessagesConversationThreadService,
  EmployeeConversationThreadFeaturePropertiesService,
  MessagesEmployeeConversationThreadFeatureService,
  MessagesManipulationConfirmModalService,
  SharedMethodsService,
} from '@backbase/internal-ewa-messages-shared-data';
import { MessagesUploadAttachmentsService } from '@backbase/internal-ewa-messages-shared-feature';
import { MessagesEncodingService } from '@backbase/internal-ewa-messages-shared-util';
import { UserManagementService } from '@backbase/user-http-ang';
import { LegalEntitiesHttpService } from '@backbase/accesscontrol-v3-http-ang';

@Component({
  selector: 'bb-messages-employee-conversation-thread-widget-ang-custom',
  templateUrl:
    './user-messages-employee-conversation-thread-widget-ang-custom.component.html',
})
export class UserMessagesEmployeeConversationThreadWidgetAngCustomComponent extends MessagesEmployeeConversationThreadWidgetComponent {
  constructor(messagesService: MessagesEmployeeConversationThreadFeatureService, properties: EmployeeConversationThreadFeaturePropertiesService, cd: ChangeDetectorRef, confirmModalService: MessagesManipulationConfirmModalService, encodingService: MessagesEncodingService, uploadService: MessagesUploadAttachmentsService, apiThreadService: AbstractBaseMessagesConversationThreadService, activatedRoute: ActivatedRoute, shared: SharedMethodsService, userService: UserManagementService, legalEntitiesService: LegalEntitiesHttpService) {
  super(
    messagesService,
    properties,
    cd,
    confirmModalService,
    encodingService,
    uploadService,
    apiThreadService,
    activatedRoute,
    shared,
    userService,
    legalEntitiesService
  );
}
}
