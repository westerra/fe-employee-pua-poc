import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractDetailsFormBaseComponent } from '@backbase/identity-user-profile-journey-ang';

/**
 * `DetailsEmailFormComponent` presents an admin user with a form to edit another user's email address
 */
@Component({
  selector: 'bb-identity-admin-user-details-email-form-custom',
  templateUrl: './details-email-form-custom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsEmailFormCustomComponent  extends AbstractDetailsFormBaseComponent implements OnInit {
  /** The initial value for the form item */
  @Input() emailValue: string | undefined;

  /** @internal */
  constructor(protected readonly formBuilder: FormBuilder) {
    super(formBuilder);
  }

  /** @internal */
  ngOnInit(): void {
    this.formGroup = this.formBuilder.nonNullable.group({
      emailAddress: [this.emailValue, Validators.required],
    });
  }
}
