import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ConversationListFilterService,
  EmployeeConversationListFilterParams,
} from '@backbase/employee-web-app-shared-feature-message-center';
import { TopicsGetResponseBody } from '@backbase/messages-v5-http-ang';
import { IdentityListedItem } from '@backbase/user-http-ang';
import { Observable } from 'rxjs';

@Component({
  selector: 'bb-ewa-conversation-list-filter-panel-custom',
  templateUrl: './user-conversation-list-filter-panel-custom.component.html',
})
export class UserConversationListFilterPanelCustomComponent implements OnInit {
  topics: TopicsGetResponseBody[];
  @Input() applied: boolean;
  @Input() visible: boolean;
  private _filterParams;
  @Input('filterParams')
  set filterParams(params: EmployeeConversationListFilterParams) {
    this.initialValues = params || {};
    this._filterParams = this.initialValues;
    this.setControlValues(this.initialValues);
  }
  @Output() readonly dismiss: EventEmitter<void>;
  readonly filterForm: FormGroup;
  readonly typeaheadOptions: {
    ngbTypeahead: (
      text: Observable<string>
    ) => Observable<IdentityListedItem[] | undefined>;
    resultFormatter: (item: IdentityListedItem) => string;
    inputFormatter: (item: IdentityListedItem) => string;
  };

  private initialValues;
  private readonly dateFormat = 'yyyy-MM-dd';

  /** @internal */
  constructor(
    private fb: FormBuilder,
    private filterService: ConversationListFilterService,
    private datePipe: DatePipe
  ) {
    this.applied = false;
    this.visible = false;
    this.initialValues = {};
    this.dismiss = new EventEmitter();
    this.typeaheadOptions = {
      ngbTypeahead: this.filterService.searchUsers,
      resultFormatter: (item) => item.fullName,
      inputFormatter: (item) => item.fullName,
    };
    // this.submit = () => {
    //   const filter = {
    //     topicId: this.filterForm.value.topic
    //       ? this.filterForm.value.topic.id
    //       : undefined,
    //     userId: this.filterForm.value.user
    //       ? this.filterForm.value.user.id
    //       : undefined,
    //     ...this.formatDates(this.filterForm.value.date),
    //   };
    //   this.filterService.applyFilter(filter);
    //   this.dismiss.emit();
    // };
    this.filterForm = this.fb.group({
      date: [''],
      topic: [''],
      user: [''],
    });
  }

  /** @internal */
  ngOnInit() {
    this.filterService.getTopics().subscribe((topics) => {
      this.topics = topics;
      this.setSelectedTopic(this.initialValues.topicId);
    });
  }

  setSelectedTopic(id) {
    if (this.topics && id) {
      const selectedTopic = this.topics.find((topic) => topic.id === id);
      if (selectedTopic) {
        this.filterForm.controls.topic.setValue(selectedTopic);
      }
    } else {
      this.filterForm.controls.topic.setValue(undefined);
    }
  }

  clear(): void {
    this.setControlValues({});
  }

  resetAndClose(): void {
    this.setControlValues(this.initialValues);
    this.dismiss.emit();
  }

  setControlValues(params) {
    this.setDateRange(params.startDate, params.endDate);
    this.setSelectedTopic(params.topicId);
    this.setSelectedUser(params.userId);
  }

  setDateRange(startDate, endDate) {
    if (startDate || endDate) {
      this.filterForm.controls.date.setValue({
        from: startDate ? new Date(startDate).toISOString() : undefined,
        to: endDate ? new Date(endDate).toISOString() : undefined,
      });
    } else {
      this.filterForm.controls.date.setValue('');
    }
  }

  setSelectedUser(userId) {
    if (userId) {
      this.filterService.getUserById(userId).subscribe(
        (user) =>
          user &&
          this.filterForm.controls['user'].setValue({
            ...user,
            id: userId,
          })
      );
    } else {
      this.filterForm.controls.user.setValue('');
    }
  }

  formatDates(date) {
    return date
      ? {
          startDate: this.formatDate(
            date.from,
            // UserConversationListFilterPanelCustomComponent.dateFormat
            this.dateFormat
          ),
          endDate: this.formatDate(
            date.to,
            // UserConversationListFilterPanelCustomComponent.dateFormat
            this.dateFormat
          ),
        }
      : {
          startDate: undefined,
          endDate: undefined,
        };
  }

  formatDate(date, format) {
    if (date) {
      return this.datePipe.transform(date, format) ?? undefined;
    }
    return undefined;
  }

  submit() {
    const filter = {
      topicId: this.filterForm.value.topic
        ? this.filterForm.value.topic.id
        : undefined,
      userId: this.filterForm.value.user
        ? this.filterForm.value.user.id
        : undefined,
      ...this.formatDates(this.filterForm.value.date),
    };
    this.filterService.applyFilter(filter);
    this.dismiss.emit();
  }
}
