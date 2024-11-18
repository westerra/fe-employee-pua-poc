/*
 *
 *
 *
 *
 *
 *         WARNING: Editing this file may prevent future updates via schematics.
 *                  To maintain easy upgradability, do not edit this file.
 *
 *
 *
 *
 *
 */
import { NgModule } from '@angular/core';
import { UserModeRoutesModule } from './user-mode-routes.module';
import { userModeModuleImports } from './user-mode-module-imports';
import { UserModeNavigationComponent } from './navigation/user-mode-navigation.component';
import { EmployeeWebAppLayoutModule, Sidebar } from '@backbase/employee-web-app-shared-ui-layout';
import { RouterModule } from '@angular/router';
import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import { AbstractCardLimitDescriptionService } from '@backbase/employee-web-app-user-mode-feature-cards';
import { CardLimitDescriptionService } from './services/card-limit-description.service';


export const sidebar = new Sidebar(UserModeNavigationComponent);

@NgModule({
  imports: [
    EntitlementsModule,
    UserModeRoutesModule,
    RouterModule,
    ...userModeModuleImports,
    EmployeeWebAppLayoutModule,
  ],
  declarations: [UserModeNavigationComponent],
  providers: [
    { provide: Sidebar, useValue: sidebar },
    {
      provide: AbstractCardLimitDescriptionService,
      useClass: CardLimitDescriptionService,
    },
  ],
})
export class UserModeLoaderModule {}