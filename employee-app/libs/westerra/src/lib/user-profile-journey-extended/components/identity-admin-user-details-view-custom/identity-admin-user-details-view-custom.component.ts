import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NotificationService } from '@backbase/ui-ang/notification';
import { AdminUserDetailsCustomService } from '../../services/admin-user-details-custom.service';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { GetIdentity, UserProfile } from '@backbase/user-http-ang';

import {
  IdentityUserProfileJourneyConfigurationService,
  UserDetailsFormState,
  UserWithLegalEntity,
} from '@backbase/internal-identity-user-profile-util';
import { LegalEntityItem } from '@backbase/accesscontrol-v3-http-ang';
import { AbstractDetailsFormBaseComponent, AdminManageProfileService, UserProfileDataService } from '@backbase/identity-user-profile-journey-ang';
@Component({
  selector: 'bb-identity-admin-user-details-view-custom',
  templateUrl: './identity-admin-user-details-view-custom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,


})

export class IdentityAdminUserDetailsViewCustomComponent {
  /** A template reference to the success notification element */
  @ViewChild('notificationUpdateSuccess') notificationUpdateSuccessTemplate:
    | TemplateRef<any>
    | undefined;
  /** A template reference to the failure notification element */
  @ViewChild('notificationFailure') notificationFailureTemplate:
    | TemplateRef<any>
    | undefined;
  /** Details of the user */
  userDetails: GetIdentity | undefined;
  /** The current form state */
  currentState: UserDetailsFormState;
  /** Form states used to determine which part of the user data is being managed */
  formStates: typeof UserDetailsFormState;
  /** Details of the user's legal entity */
  legalEntityDetails: LegalEntityItem | undefined;
  /** A subject used to determine if the form is loading */
  loadingState$$: BehaviorSubject<boolean>;
  /** A subject used to determine if there was an error loading the form */
  loadingErrorState$$: BehaviorSubject<Error | undefined>;
  /** A subject used to determine if the form is being submitted */
  isSubmitting$$: BehaviorSubject<boolean>;
  private readonly userDetails$$;
  private userDetailsSubscription;
  /** An observable that emits details of the the user */
  readonly userDetails$: Observable<UserWithLegalEntity>;

  private readonly onSuccess;
  private readonly onFail;
  private readonly afterUpdate;

  // Fetch Profile data
  @Input() userProfile: any = null;

  constructor(
    private configService: IdentityUserProfileJourneyConfigurationService,
    private adminManageProfileService: AdminManageProfileService,
    private adminUserDetailsService: AdminUserDetailsCustomService,
    private notificationService: NotificationService,
    private userDataService: UserProfileDataService
  ) {
    /** The current form state */
    this.currentState = UserDetailsFormState.None;
    /** Form states used to determine which part of the user data is being managed */
    this.formStates = UserDetailsFormState;
    /** A subject used to determine if the form is loading */
    this.loadingState$$ = new BehaviorSubject(true);
    /** A subject used to determine if there was an error loading the form */
    this.loadingErrorState$$ = new BehaviorSubject(undefined);
    /** A subject used to determine if the form is being submitted */
    this.isSubmitting$$ = new BehaviorSubject(false);
    this.userDetails$$ = new BehaviorSubject(undefined);
    /** An observable that emits details of the the user */
    this.userDetails$ = this.userDetails$$.asObservable().pipe(
      tap(() => this.loadingState$$.next(true)),
      switchMap(() =>
        this.userDataService.getUserProfile(
        )
      ),
      switchMap((userDetails: any) => {
        return this.adminUserDetailsService
          .getLegalEntity(userDetails.legalEntityInternalId)
          .pipe(
            map((legalEntityDetails) => ({ userDetails, legalEntityDetails }))
          );
      }),
      catchError((error) => {
        this.loadingState$$.next(false);
        this.loadingErrorState$$.next(error);
        return of();
      })
    );
    this.onSuccess = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.showNotification(this.notificationUpdateSuccessTemplate);
      this.setManagementState(UserDetailsFormState.None);
      this.userDetails$$.next(undefined);
    };
    this.onFail = (error) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.showNotification(this.notificationFailureTemplate, true, error);
      return of(undefined);
    };
    this.afterUpdate = () => {
      this.isSubmitting$$.next(false);
    };
  }
  /** @internal */
  ngOnInit() {
    this.userDetailsSubscription = this.userDetails$.subscribe((response) => {
      this.loadingState$$.next(false);
      this.userDetails = response.userDetails;
      this.legalEntityDetails = response.legalEntityDetails;
    });
  }
  /** @internal */
  ngOnDestroy() {
    this.userDetailsSubscription?.unsubscribe();
  }
  /**
   * Sets the state of the user details form
   *
   * @param newState the new `UserDetailsFormState` to be set
   */
  setManagementState(newState: UserDetailsFormState): void {
    this.currentState = newState;
  }
  /**
   * Updates the user's details with the new data
   *
   * @param newValue the data which should be saved to the user's profile
   */
  handleSaveRequest(newValue: GetIdentity): void {
    this.isSubmitting$$.next(true);
    this.adminUserDetailsService
      .updateUserDetails(
        this.adminManageProfileService.userId,
        this.modelToIdentityPut(newValue)
      )
      .pipe(
        tap(this.onSuccess.bind(this)),
        catchError((error) => this.onFail(error)),
        tap(this.afterUpdate.bind(this))
      )
      .subscribe();
  }
  /**
   * Compares the given state with `currentState`
   *
   * @param state the state with which to compare currentState
   * @returns true if the current form state matches state
   */
  hasState(state: UserDetailsFormState): boolean {
    return this.currentState === state;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showNotification(template, failed?, error?) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors =
      (Array.isArray(error?.error?.errors) && error?.error?.errors) || [];
    this.notificationService.showNotification({
      message: template,
      messageContext: {
        errorCode: (
          errors.find(
            (err) =>
              err.key === 'user.identity.message.IDENTITY_EMAIL_ALREADY_EXISTS'
          ) || {}
        ).key,
      },
      modifier: failed ? 'error' : 'success',
      ttl: this.configService.notificationDismissTime,
    });
  }
  modelToIdentityPut(model) {
    return { ...this.userDetails, ...model };
  }
}
