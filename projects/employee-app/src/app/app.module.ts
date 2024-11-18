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
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeWebAppLayoutModule } from '@backbase/employee-web-app-shared-ui-layout';
import {
  EmployeeWebAppChromeComponent,
  EmployeeWebAppRootModule,
  SelectContextWrapperComponent,
  WorkspaceSwitcherModule,
} from '@backbase/employee-web-app-root-feature-app-shell';
import {
  EmployeeWebAppCoreModule,
  NotificationsModule,
} from '@backbase/employee-web-app-shared-util-core';
import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import {
  AuthGuard,
  AuthModule,
} from '@backbase/employee-web-app-root-util-auth';
import { environment } from '../environments/environment';
import { AppDataModules } from './app-data-modules';
import { appModuleImports } from './app-module-imports';
import { additionalRoutes, workspaceRoutes } from './app-module-routes';
import { AppComponent } from './app.component';
import { ServicePathsModule } from './service-paths.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [
  // To be used for and commented after maintenance
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   redirectTo: 'maintenance',
  // },
  // To be used for and commented after maintenance
  // { path: 'maintenance', component: MaintenanceComponent },

  ...additionalRoutes,
  {
    path: 'select-context',
    component: SelectContextWrapperComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: EmployeeWebAppChromeComponent,
    canActivateChild: [AuthGuard],
    children: [...workspaceRoutes],
  },

  // To be uncommented after maintenance.
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [AppComponent, MaintenanceComponent],
  imports: [
    EmployeeWebAppCoreModule.forRoot(environment),
    AuthModule,
    NotificationsModule.forRoot(environment.notificationsModuleConfig),
    HttpClientModule,
    ServicePathsModule,
    AppDataModules,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      useHash: environment.useHashNavigation,
      paramsInheritanceStrategy: 'always',
      relativeLinkResolution: 'corrected',
    }),
    EmployeeWebAppRootModule,
    EmployeeWebAppLayoutModule,
    WorkspaceSwitcherModule,
    EntitlementsModule,
    ...appModuleImports,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [...(environment.providers || [])],
  bootstrap: [AppComponent],
})
export class AppModule {}
