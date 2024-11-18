import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, provideRoutes } from '@angular/router';

import {
  AddAddressViewComponent,
  AddEmailViewComponent,
  AddPhoneViewComponent,
  EditAddressViewComponent,
  EditEmailViewComponent,
  EditPhoneViewComponent,
  IdentityUserProfileJourneyComponent,
  UserProfileFeaturesModule,
  ViewUserProfileViewComponent,
  AdminDetailsFormModule,
} from '@backbase/identity-user-profile-features';
import { IdentityUserProfileJourneyConfigurationService } from '@backbase/identity-user-profile-util';
import { ViewUserProfileViewCustomComponent } from './components/view-user-profile-view-custom/view-user-profile-view-custom.component';
import { IdentityAdminUserDetailsViewCustomComponent } from './components/identity-admin-user-details-view-custom/identity-admin-user-details-view-custom.component';
import { AdminUserDetailsCustomService } from './services/admin-user-details-custom.service';
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
];
const basicModules = [CommonModule, RouterModule];
const innerModules = [UserProfileFeaturesModule, AdminDetailsFormModule];
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
