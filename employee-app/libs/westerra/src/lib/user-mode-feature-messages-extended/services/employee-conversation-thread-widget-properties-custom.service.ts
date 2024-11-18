import { Injectable } from '@angular/core';
import { defaultModelObservable } from '@backbase/messages-shared-util';

const UserConversationThreadProperties = {
  maxAttachmentSize: '10',
  minSearchLength: 1,
  replyMessageMaxLength: 2000,
  viewTypeTitle: 'All',
};
@Injectable({
  providedIn: 'root',
})
export class EmployeeConversationThreadWidgetPropertiesCustomService {
  constructor() {}
  /**
   * Max attachment size
   */
  get maxAttachmentSize() {
    return defaultModelObservable(
      UserConversationThreadProperties.maxAttachmentSize
    );
  }
  /**
   * Min search length
   */
  get minSearchLength() {
    return defaultModelObservable(
      UserConversationThreadProperties.minSearchLength
    );
  }
  /**
   * Reply message max length
   */
  get replyMessageMaxLength() {
    return defaultModelObservable(
      UserConversationThreadProperties.replyMessageMaxLength
    );
  }
  /**
   * View type title
   */
  get viewTypeTitle() {
    return defaultModelObservable(
      UserConversationThreadProperties.viewTypeTitle
    );
  }
}
