// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {
  auxiliaryRouteUrlFixerInitializerProvider,
  EmployeeWebAppEnvironmentProperties,
  auditDownloadNotificationRoutingHandler,
  AUDIT_DOWNLOAD_VIEW,
  CONVERSATION_VIEW,
  conversationNotificationRoutingHandler,
} from '@backbase/employee-web-app-shared-util-core';
import {
  ACTIVITY_MONITOR_CONFIG,
  ActivityMonitorConfig,
} from '@backbase/identity-auth';

const activityMonitorConfig: ActivityMonitorConfig = {
  maxInactivityDuration: 3600,
  countdownDuration: 60,
};

export const environmentBase: Partial<EmployeeWebAppEnvironmentProperties> = {
  providers: [
    auxiliaryRouteUrlFixerInitializerProvider(['assist']),
    {
      provide: ACTIVITY_MONITOR_CONFIG,
      useValue: activityMonitorConfig,
    },
  ],
  notificationsModuleConfig: {
    allowedRoutes: [AUDIT_DOWNLOAD_VIEW, CONVERSATION_VIEW],
    routingHandlers: [
      auditDownloadNotificationRoutingHandler(['/admin/audit/download']),
      conversationNotificationRoutingHandler(
        '/support/messages/all/conversation',
        ['/support/messages/all/list']
      ),
    ],
  },
};
