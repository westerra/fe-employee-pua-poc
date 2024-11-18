import { Injectable } from '@angular/core';
import { defaultModelObservable } from '@backbase/messages-shared-util';
export const DefaultMessageWidgetProperties = {
  debounceTime: 500,
  maxAttachmentSize: '10',
  maxMailoutNameLength: 255,
  maxSubjectLength: 1000,
  maxMessageLength: 2000,
  minSearchLength: 1,
  modalHeader: 'New message',
  hideComposeButton: false,
  createMessageOpenEventName: 'bb.event.messages.create.message.open',
  createMessageClosedEventName: 'bb.event.messages.create.message.close',
  senderDisplayName: 'Backbase',
  shouldPreDefineUser: false,
  isPreDefinedUserReadonly: false,
};
@Injectable({
  providedIn: 'root',
})
export class BaseCreateMessageModalPropertiesCustomService {
  constructor() {}
  /**
   * Max attachment size
   */
  get maxAttachmentSize() {
    return defaultModelObservable(
      DefaultMessageWidgetProperties.maxAttachmentSize
    );
  }
  /**
   * Max message length
   */
  get maxMessageLength() {
    return defaultModelObservable(
      DefaultMessageWidgetProperties.maxMessageLength
    );
  }
  /**
   * Max mailout name length
   */
  get maxMailoutNameLength() {
    return defaultModelObservable(
      DefaultMessageWidgetProperties.maxMailoutNameLength
    );
  }
  /**
   * Max subject length
   */
  get maxSubjectLength() {
    return defaultModelObservable(
      DefaultMessageWidgetProperties.maxSubjectLength
    );
  }
  /**
   * Modal header
   */
  get modalHeader() {
    return defaultModelObservable(DefaultMessageWidgetProperties.modalHeader);
  }
  /**
   * Debounce time
   */
  get debounceTime() {
    return defaultModelObservable(DefaultMessageWidgetProperties.debounceTime);
  }
  /**
   * Min search length
   */
  get minSearchLength() {
    return defaultModelObservable(
      DefaultMessageWidgetProperties.minSearchLength
    );
  }
  /**
   * Flag to hide or show compose button
   */
  get hideComposeButton() {
    return defaultModelObservable(
      DefaultMessageWidgetProperties.hideComposeButton
    );
  }
  /**
   * Open event for create message modal
   */
  get createMessageOpenEventName() {
    return defaultModelObservable(
      DefaultMessageWidgetProperties.createMessageOpenEventName
    );
  }
  /**
   * Close event for create message modal
   */
  get createMessageClosedEventName() {
    return defaultModelObservable(
      DefaultMessageWidgetProperties.createMessageClosedEventName
    );
  }
  /**
   * Flag to show or hide sender name
   */
  get senderDisplayName() {
    return defaultModelObservable(
      DefaultMessageWidgetProperties.senderDisplayName
    );
  }
  /**
   * Flag to predefine or not user input
   */
  get shouldPreDefineUser() {
    return defaultModelObservable(
      DefaultMessageWidgetProperties.shouldPreDefineUser
    );
  }
  /**
   * Flag to disable predefined user input
   */
  get isPreDefinedUserReadonly() {
    return defaultModelObservable(
      DefaultMessageWidgetProperties.isPreDefinedUserReadonly
    );
  }
}
