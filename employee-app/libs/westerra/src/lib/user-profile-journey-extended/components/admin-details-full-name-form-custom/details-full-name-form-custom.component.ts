import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractDetailsFormBaseComponent } from '@backbase/identity-user-profile-journey-ang';
import { Observable } from 'rxjs';

export const validFormatValidatorPattern = /\S/;

/** `DetailsFullNameFormComponent` presents an admin user with a form to another user's full name */
@Component({
  selector: 'bb-identity-admin-user-details-full-name-form-custom',
  templateUrl: './details-full-name-form-custom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsFullNameFormCustomComponent extends AbstractDetailsFormBaseComponent implements OnInit {
    /** The initial value for the given name item */
    @Input({ required: true }) givenName!: string;
    /** The initial value for the family name item */
    @Input({ required: true }) familyName!: string;
  
    /**
     * Observable that emits if the given name invalid error should be displayed
     * @deprecated and will be removed as part of the `2024.04` release
     */
    showGivenNameInvalidError$: Observable<boolean> | undefined;
    /**
     * Observable that emits if the family name invalid error should be displayed
     * @deprecated and will be removed as part of the `2024.04` release
     */
    showFamilyNameInvalidError$: Observable<boolean> | undefined;
  
    /** @internal */
    constructor(protected readonly formBuilder: FormBuilder) {
      super(formBuilder);
    }
  
    /** @internal */
    ngOnInit(): void {
      this.formGroup = this.formBuilder.nonNullable.group({
        givenName: [this.givenName, [Validators.required, Validators.pattern(validFormatValidatorPattern)]],
        familyName: [this.familyName, [Validators.required, Validators.pattern(validFormatValidatorPattern)]],
      });
  
      this.showGivenNameInvalidError$ = this.setupAdminInvalidFormFieldValidationMessage(
        this.formGroup.controls.givenName,
        validFormatValidatorPattern,
      );
      this.showFamilyNameInvalidError$ = this.setupAdminInvalidFormFieldValidationMessage(
        this.formGroup.controls.familyName,
        validFormatValidatorPattern,
      );
    }
  }
  