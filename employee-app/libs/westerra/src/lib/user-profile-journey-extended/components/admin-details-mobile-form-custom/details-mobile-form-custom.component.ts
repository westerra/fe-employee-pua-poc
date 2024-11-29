import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AbstractDetailsFormBaseComponent } from '@backbase/identity-user-profile-journey-ang';
import { CountryCode, PhoneNumberPipe } from '@backbase/ui-ang/phone-number-format-pipe';
import { isRtl } from '@backbase/ui-ang/util';
import { Observable, Subscription } from 'rxjs';
import { validFormatValidatorPattern } from '../admin-details-full-name-form-custom/details-full-name-form-custom.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ValueSet } from '@backbase/ui-ang/input-phone';

export const subscribePhoneNumberControlFormatting = (
  numberControl: AbstractControl,
  debounceTimeValue: number,
  countryCode: CountryCode,
  phoneNumberFormatter: PhoneNumberPipe,
) =>
  numberControl.valueChanges
    .pipe(distinctUntilChanged(), debounceTime(debounceTimeValue || 0))
    .subscribe((value: string) => {
      numberControl.setValue(phoneNumberFormatter.transform(value, countryCode, true));
    });




/** `DetailsMobileFormComponent` presents an admin user with a form to edit another user's mobile number */
@Component({
  selector: 'bb-identity-admin-user-details-mobile-form-custom',
  templateUrl: './details-mobile-form-custom.component.html',
  styles: ['.bb-force-ltr{ direction:ltr; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsMobileFormCustomComponent extends AbstractDetailsFormBaseComponent implements OnInit, OnDestroy {
  /**
   * The configured phone number country code
   * @deprecated and will be removed as part of the `2024.04` release
   */
  @Input({ required: true }) phoneNumberCountryCode!: CountryCode;
  /**
   * The configured debounce time when entering a phone number
   * @deprecated and will be removed as part of the `2024.04` release
   */
  @Input({ required: true }) phoneNumberDebounceTime!: number;
  /**
   * Flag to determine if the phone number formatter is enabled
   * @deprecated and will be removed as part of the `2024.04` release
   */
  @Input({ required: true }) enablePhoneNumberFormatter!: boolean;
  /**
   * The initial value for the form item
   */
  @Input()
  set mobileValue(value: string) {
    this.form.patchValue({
      mobileNumber: value,
    });
  }

  /** Determines whether the app is in RTL mode */
  readonly isRtl = isRtl();

  /** The form to edit the user's mobile number */
  formGroup = this.formBuilder.nonNullable.group({
    countryCode: '',
    mobileNumber: [this.mobileValue, [Validators.required, Validators.pattern(validFormatValidatorPattern)]],
  });

  /**
   * An observable that emits when the phone number invalid error should be displayed
   * @deprecated and will be removed as part of the `2024.04` release
   */
  showPhoneNumberInvalidError$: Observable<boolean> | undefined;

  /** Determines whether the form has been submitted */
  formSubmitted = false;

  private phoneNumberFormatterSubscription: Subscription | undefined;

  /** @internal */
  constructor(protected readonly formBuilder: FormBuilder, private readonly phoneNumberPipe: PhoneNumberPipe) {
    super(formBuilder);
  }

  /** @internal */
  ngOnInit() {
    if (this.enablePhoneNumberFormatter) {
      if (!this.phoneNumberCountryCode) {
        throw Error('phoneNumberCountryCode input must be set to use formatting');
      }
      this.phoneNumberFormatterSubscription = subscribePhoneNumberControlFormatting(
        this.form.get('mobileNumber') as AbstractControl,
        this.phoneNumberDebounceTime,
        this.phoneNumberCountryCode,
        this.phoneNumberPipe,
      );
      // Trigger the formatter on init to ensure the mobileNumber is properly formatted
      this.form.controls.mobileNumber.setValue(
        this.phoneNumberPipe.transform(this.form.controls.mobileNumber.value, this.phoneNumberCountryCode, true),
        { emitEvent: false },
      );
    }

    this.showPhoneNumberInvalidError$ = this.setupAdminInvalidFormFieldValidationMessage(
      this.form.controls.mobileNumber,
      validFormatValidatorPattern,
    );
  }

  /** @internal */
  ngOnDestroy() {
    this.phoneNumberFormatterSubscription?.unsubscribe();
  }

  /**
   * Updates the form value when the input changes
   *
   * @param data the value emitted by the `InputPhoneComponent`
   */
  onValueChange(data: ValueSet): void {
    if (this.formSubmitted) {
      this.formSubmitted = false;
    }

    const mobileNumber = data.number.trim() === data.countryCode ? '' : data.number;
    this.form?.patchValue({ countryCode: data.countryCode, mobileNumber });
  }

  /**
   * Submits the form data
   */
  onSubmit() {
    this.formSubmitted = true;
    this.submit();
  }
}
