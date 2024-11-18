import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MessagesManipulationConfirmModalService,
  SharedMethodsService,
  BaseConversationsListPropertiesService,
  SharedMethodsModule,
  EmployeeConversationThreadWidgetPropertiesService,
  MessagesEmployeeConversationThreadWidgetService,
  AbstractBaseMessagesConversationThreadService,
} from '@backbase/messages-shared-data-access';

import { MessagesEncodingService } from '@backbase/messages-shared-util';

import {
  MessagesUploadAttachmentsService,
  BaseConversationsListWidgetModule,
  BaseCreateMessageModalPropertiesService,
  BaseUploadAttachmentsService,
  MessagesEmployeeUploadAttachmentsService,
} from '@backbase/messages-shared-feature';
import { BadgeModule } from '@backbase/ui-ang/badge';
import { ButtonModule } from '@backbase/ui-ang/button';
import { CheckboxGroupModule } from '@backbase/ui-ang/checkbox-group';
import { DropdownMenuModule } from '@backbase/ui-ang/dropdown-menu';
import { EmptyStateModule } from '@backbase/ui-ang/empty-state';
import { IconModule } from '@backbase/ui-ang/icon';
import { InputCheckboxModule } from '@backbase/ui-ang/input-checkbox';
import { LoadButtonModule } from '@backbase/ui-ang/load-button';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { ModalModule } from '@backbase/ui-ang/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PreventBubbleDownModule,
  MessagesRequestErrorModule,
  MessagesConversationMessageModule,
} from '@backbase/messages-shared-ui';
import {
  EmployeeHttpService,
  MessagecenterHttpService,
} from '@backbase/messages-v5-http-ang';
import { KeyboardClickModule } from '@backbase/ui-ang/keyboard-click-directive';
import { TooltipModule } from '@backbase/ui-ang/tooltip-directive';

import { UserModeFeatureMessagesModule } from '@backbase/employee-web-app-user-mode-feature-messages';
import { UserMessagesCustomComponent } from './components/user-messages-custom/user-messages-custom.component';

import {
  MessagesEmployeeConversationThreadWidgetModule,
  MessagesEmployeeConversationsListWidgetModule,
  MessagesEmployeeCreateMessageModalWidgetModule,
} from '@backbase/messages-employee-inbox-journey-feature';
import {
  MessagesHeadingModule,
  MessagesTabsModule,
} from '@backbase/messages-shared-ui';
import {
  ConversationListFilterService,
  ConversationListService,
  EmployeeConversationListModule,
} from '@backbase/employee-web-app-shared-feature-message-center';
import { BaseCreateMessageModalPropertiesCustomService } from './services/base-create-message-modal-properties-custom.service';
import { MessagesCreateMessageModalWidgetAngCustomComponent } from './components/messages-create-message-modal-widget-ang-custom/messages-create-message-modal-widget-ang-custom.component';
import { UserConversationListCustomComponent } from './components/user-conversation-list-custom/user-conversation-list-custom.component';

import { ErrorCommonStateModule } from '@backbase/ui-ang/common-error-state';
import { DropdownSingleSelectModule } from '@backbase/ui-ang/dropdown-single-select';
import { InputDatepickerModule } from '@backbase/ui-ang/input-datepicker';
import { PaginationModule } from '@backbase/ui-ang/pagination';
import { SearchBoxModule } from '@backbase/ui-ang/search-box';
import { UserConversationListLayoutCustomComponent } from './components/user-conversation-list-layout-custom/user-conversation-list-layout-custom.component';
import { EmployeeConversationThreadWidgetPropertiesCustomService } from './services/employee-conversation-thread-widget-properties-custom.service';
import { UserConversationListTableCustomComponent } from './components/user-conversation-list-table-custom/user-conversation-list-table-custom.component';
import { UserConversationListFilterPanelCustomComponent } from './components/user-conversation-list-filter-panel-custom/user-conversation-list-filter-panel-custom.component';
import { UserConversationThreadWidgetWrapperCustomComponent } from './components/user-conversation-thread-widget-wrapper-custom/user-conversation-thread-widget-wrapper-custom.component';
import { ConversationListFilterCustomService } from './services/conversation-list-filter-custom.service';
import { IdentityManagementService } from '@backbase/user-http-ang';

import { UserMessagesEmployeeConversationThreadWidgetAngCustomComponent } from './components/user-messages-employee-conversation-thread-widget-ang-custom/user-messages-employee-conversation-thread-widget-ang-custom.component';

const uiModules = [
  BadgeModule,
  ButtonModule,
  CheckboxGroupModule,
  DropdownMenuModule,
  ModalModule,
  IconModule,
  InputCheckboxModule,
  LoadButtonModule,
  EmptyStateModule,
  LoadingIndicatorModule,
  TooltipModule,
  KeyboardClickModule,
  PaginationModule,
  DropdownSingleSelectModule,
  InputDatepickerModule,
  SearchBoxModule,
  ErrorCommonStateModule,
];

const innerModules = [
  MessagesRequestErrorModule,
  PreventBubbleDownModule,
  MessagesConversationMessageModule,
  SharedMethodsModule,
  MessagesHeadingModule,
  MessagesTabsModule,

  UserModeFeatureMessagesModule,
  BaseConversationsListWidgetModule,
  MessagesEmployeeCreateMessageModalWidgetModule,
  MessagesEmployeeConversationsListWidgetModule,
  MessagesEmployeeConversationThreadWidgetModule,
  EmployeeConversationListModule,
];

const basicModules = [
  RouterModule,
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
];

const uiComponents = [
  UserMessagesCustomComponent,
  MessagesCreateMessageModalWidgetAngCustomComponent,
  UserConversationListCustomComponent,
  UserConversationListLayoutCustomComponent,
  UserConversationListTableCustomComponent,
  UserConversationListFilterPanelCustomComponent,
  UserConversationThreadWidgetWrapperCustomComponent,
  UserMessagesEmployeeConversationThreadWidgetAngCustomComponent,
];

const serviceDependencies = [
  SharedMethodsService,
  MessagesEncodingService,
  MessagesManipulationConfirmModalService,
  MessagesUploadAttachmentsService,
  BaseConversationsListPropertiesService,
  MessagecenterHttpService,
  ConversationListService,
  EmployeeHttpService,
  IdentityManagementService,
  MessagesEmployeeConversationThreadWidgetService,
];

@NgModule({
  declarations: [...uiComponents],
  imports: [...basicModules, ...uiModules, ...innerModules],
  exports: [...uiComponents],
  providers: [
    ...serviceDependencies,
    {
      provide: BaseCreateMessageModalPropertiesService,
      useClass: BaseCreateMessageModalPropertiesCustomService,
    },
    {
      provide: EmployeeConversationThreadWidgetPropertiesService,
      useClass: EmployeeConversationThreadWidgetPropertiesCustomService,
    },
    {
      provide: ConversationListFilterService,
      useClass: ConversationListFilterCustomService,
    },
    {
      provide: BaseUploadAttachmentsService,
      useClass: MessagesEmployeeUploadAttachmentsService,
    },
    {
      provide: AbstractBaseMessagesConversationThreadService,
      useClass: MessagesEmployeeConversationThreadWidgetService,
    },
  ],
})
export class UserModeFeatureMessagesExtendedModule {
  // static forRoot(
  //   data: { routes: Routes; [key: string]: any } = {
  //     routes: internalMessageJourneyRoutes,
  //   }
  // ): ModuleWithProviders<UserModeFeatureMessagesExtendedModule> {
  //   return {
  //     ngModule: UserModeFeatureMessagesExtendedModule,
  //     providers: [provideRoutes(data.routes)],
  //   };
  // }
}
