import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ConversationListFilterService,
  ConversationsLoadingEvent,
  EmployeeConversationListFilterAndPagingParams,
} from '@backbase/employee-web-app-shared-feature-message-center';

@Component({
  selector: 'bb-ewa-conversation-list-layout-custom',
  templateUrl: './user-conversation-list-layout-custom.component.html',
})
export class UserConversationListLayoutCustomComponent {
  @Input() showFilters: boolean;
  @Input() loadingEvent: ConversationsLoadingEvent;
  @Input() totalItems: number | undefined;
  private _filterParams;
  @Input('filterParams')
  set filterParams(
    params: EmployeeConversationListFilterAndPagingParams | undefined
  ) {
    this._filterParams = params;
    this.filterApplied =
      !!params && this.filterService.filterFields.some((key) => !!params[key]);
  }

  get filterParams():
    | EmployeeConversationListFilterAndPagingParams
    | undefined {
    return this._filterParams;
  }
  @Output() readonly pageChange: EventEmitter<number>;
  showFilterPanel: boolean;
  filterApplied: boolean;

  constructor(private filterService: ConversationListFilterService) {
    this.showFilters = false;
    this.pageChange = new EventEmitter();
    this.showFilterPanel = false;
    this.filterApplied = false;
  }

  refresh(): void {
    this.filterService.refresh();
  }
  reset(): void {
    this.filterService.clearFilter();
  }
}
