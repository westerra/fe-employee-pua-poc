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
  AUDIT_DOWNLOAD_VIEW,
  CONVERSATION_VIEW,
  CONVERSATION_TRENDS_DOWNLOAD_VIEW,
  auditDownloadNotificationRoutingHandler,
  conversationNotificationRoutingHandler,
  conversationTrendsDownloadNotificationRoutingHandler,
  DefaultNotificationsCommunicationService,
} from '@backbase/employee-web-app-shared-util-core';
import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import {
  withAuthentication,
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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ImpersonationModule } from '@backbase/identity-auth/impersonation';
import {
  NavigationActionTiming,
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { NgxMaskModule } from 'ngx-mask';
import { ServiceAgreementSelectorModule } from '@backbase/employee-web-app-user-mode-feature-service-agreement-selector';
import { NotificationsCommunicationService } from '@backbase/notifications-ang';

const routes: Routes = [
  ...additionalRoutes,
  {
    path: 'select-context',
    component: SelectContextWrapperComponent,
    canActivate: [withAuthentication],
  },
  {
    path: '',
    component: EmployeeWebAppChromeComponent,
    canActivateChild: [withAuthentication],
    children: [...workspaceRoutes],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    EmployeeWebAppCoreModule.forRoot(environment),
    AuthModule,
    NotificationsModule.forRoot({
      allowedRoutes: [
        AUDIT_DOWNLOAD_VIEW,
        CONVERSATION_VIEW,
        CONVERSATION_TRENDS_DOWNLOAD_VIEW,
      ],
      routingHandlers: [
        auditDownloadNotificationRoutingHandler(['/admin/audit/download']),
        conversationNotificationRoutingHandler(
          '/support/messages/all/conversation',
          ['/support/messages/all/list']
        ),
        conversationTrendsDownloadNotificationRoutingHandler([
          '/admin/conversation-trends/download',
        ]),
      ],
    }),
    HttpClientModule,
    ServicePathsModule,
    AppDataModules,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      useHash: environment.useHashNavigation,
      paramsInheritanceStrategy: 'always',
      anchorScrolling: 'enabled',
    }),
    EmployeeWebAppRootModule,
    EmployeeWebAppLayoutModule,
    WorkspaceSwitcherModule,
    EntitlementsModule,
    ...appModuleImports,
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ImpersonationModule,
    NgxMaskModule.forRoot(),
    ServiceAgreementSelectorModule.forRoot(),
  ],
  providers: [
    ...(environment.providers || []),
    {
      provide: NotificationsCommunicationService,
      useClass: DefaultNotificationsCommunicationService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
