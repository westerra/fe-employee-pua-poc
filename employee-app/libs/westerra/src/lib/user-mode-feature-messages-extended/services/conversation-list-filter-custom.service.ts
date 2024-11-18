import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConversationListFilterService,
  EmployeeConversationListFilterAndPagingParams,
  EmployeeConversationListFilterParams,
  EmployeeConversationListRequestParameters,
} from '@backbase/employee-web-app-shared-feature-message-center';
import {
  TopicsGetEmployeeResponseBody,
  EmployeeHttpService,
} from '@backbase/messages-v5-http-ang';
import {
  GetIdentity,
  IdentityListedItem,
  IdentityManagementService,
} from '@backbase/user-http-ang';
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';

export declare type FilterFields =
  keyof EmployeeConversationListRequestParameters &
    keyof EmployeeConversationListFilterAndPagingParams;

const MAX_TOPICS = 65535;

@Injectable({
  providedIn: 'root',
})
export class ConversationListFilterCustomService {
  readonly filterParameters$: Observable<EmployeeConversationListFilterAndPagingParams>;
  readonly conversationId$: Observable<string | undefined>;
  forceUserId?: string;
  private readonly refresh$;
  readonly searchUsers: (
    text: Observable<string>
  ) => Observable<IdentityListedItem[] | undefined>;

  constructor(
    private readonly identityService: IdentityManagementService,
    private readonly messagesService: EmployeeHttpService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    // super(identityService, messagesService, router, activatedRoute);
    this.conversationId$ = this.activatedRoute.queryParams.pipe(
      map((params) => params.cid)
    );
    /**
     * Trigger to re-emit the last filterParameters$ value.
     */
    this.refresh$ = new BehaviorSubject(undefined);
    this.searchUsers = (text): Observable<IdentityListedItem[] | undefined> => {
      return text.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) => {
          if (!value.length) {
            return EMPTY;
          } else {
            return this.identityService
              .getIdentities({ externalId: value })
              .pipe(
                map((res) => res && res.identities),
                catchError(() => {
                  return EMPTY;
                })
              );
          }
        })
      );
    };
    this.filterParameters$ = combineLatest([
      this.refresh$,
      this.activatedRoute.queryParams.pipe(
        filter((params) => !params.cid),
        map((params) =>
          Object.entries(params).reduce((acc, [key, value]) => {
            acc[key] = Array.isArray(value) ? value[0] : value;
            return acc;
          }, {})
        )
      ),
    ]).pipe(
      map(([_, params]: any) => ({
        from: parseInt(params.from, 10) || 0,
        size: parseInt(params.size, 10) || 10,
        userId: this.forceUserId || params.userId,
        topicId: params.topicId,
        startDate: params.startDate,
        endDate: params.endDate,
      }))
    );
  }

  get filterFields(): FilterFields[] {
    const fields: FilterFields[] = ['topicId', 'startDate', 'endDate'];
    return this.forceUserId ? fields : ['userId', ...fields];
  }

  refresh(): void {
    this.refresh$.next();
  }

  applyFilter(params: EmployeeConversationListFilterParams): Promise<boolean> {
    console.log('params: ', params);
    return this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
    });
  }

  clearFilter(): Promise<boolean> {
    return this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {},
    });
  }

  changePage(page: number): Promise<boolean> {
    return this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { from: page },
      queryParamsHandling: 'merge',
    });
  }

  getUserById(internalId: string): Observable<GetIdentity | null> {
    return this.identityService.getIdentity({ internalId });
  }

  getTopics(): Observable<TopicsGetEmployeeResponseBody[]> {
    return this.messagesService.getTopicsEmployee({
      size: MAX_TOPICS,
      subscribed: true,
    });
  }

  openConversation(id: string): Promise<boolean> {
    return this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { cid: id },
      queryParamsHandling: 'merge',
    });
  }

  closeConversation(): Promise<boolean> {
    return this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { cid: undefined },
      queryParamsHandling: 'merge',
    });
  }
}
