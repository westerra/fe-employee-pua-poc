import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, provideRoutes } from '@angular/router';

import { AddEmailViewComponent, EditEmailViewComponent, AddPhoneViewComponent, EditPhoneViewComponent} from '@backbase/internal-identity-user-profile-ui';

import {
  AddAddressViewComponent,
  IdentityUserProfileJourneyComponent,
  UserProfileFeaturesModule,
  IdentityUserProfileJourneyModule,
  AdminDetailsFormModule,
  EditAddressViewComponent,
} from '@backbase/identity-user-profile-journey-ang';
import { IdentityUserProfileJourneyConfigurationService } from '@backbase/internal-identity-user-profile-util';
import { ViewUserProfileViewCustomComponent } from './components/view-user-profile-view-custom/view-user-profile-view-custom.component';
import { IdentityAdminUserDetailsViewCustomComponent } from './components/identity-admin-user-details-view-custom/identity-admin-user-details-view-custom.component';
import { AdminUserDetailsCustomService } from './services/admin-user-details-custom.service';
import { DetailsMobileFormCustomComponent } from './components/admin-details-mobile-form-custom/details-mobile-form-custom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsEmailFormCustomComponent } from './components/admin-details-email-form-custom/details-email-form-custom.component';
import { DetailsFullNameFormCustomComponent } from './components/admin-details-full-name-form-custom/details-full-name-form-custom.component';
const defaultUserProfileJourneyRoutes = {
  path: '',
  component: IdentityUserProfileJourneyComponent,
  children: [
    {
      path: '',
      // component: ViewUserProfileViewComponent,
      component: ViewUserProfileViewCustomComponent,
    },
    {
      path: 'email/add',
      component: AddEmailViewComponent,
    },
    {
      path: 'email/:emailAddressKey/edit',
      component: EditEmailViewComponent,
    },
    {
      path: 'phone/add',
      component: AddPhoneViewComponent,
    },
    {
      path: 'phone/:phoneAddressKey/edit',
      component: EditPhoneViewComponent,
    },
    {
      path: 'address/add',
      component: AddAddressViewComponent,
    },
    {
      path: 'address/:postalAddressKey/edit',
      component: EditAddressViewComponent,
    },
    { path: '**', redirectTo: '' },
  ],
};

const uiComponents = [
  ViewUserProfileViewCustomComponent,
  IdentityAdminUserDetailsViewCustomComponent,
  DetailsEmailFormCustomComponent,
  DetailsFullNameFormCustomComponent,
  DetailsMobileFormCustomComponent
  
];

const basicModules = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];
const innerModules = [ UserProfileFeaturesModule, AdminDetailsFormModule];
const serviceDependencies = [
  IdentityUserProfileJourneyConfigurationService,
  AdminUserDetailsCustomService,
];

@NgModule({
  declarations: [...uiComponents],
  imports: [...basicModules, ...innerModules],
  exports: [...uiComponents],
  providers: [...serviceDependencies],
})
export class UserProfileJourneyExtendedModule {
  static forRoot({ route } = { route: defaultUserProfileJourneyRoutes }) {
    return {
      ngModule: UserProfileJourneyExtendedModule,
      providers: [provideRoutes([route])],
    };
  }
}
