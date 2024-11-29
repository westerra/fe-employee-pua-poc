import {
  auxiliaryRouteUrlFixerInitializerProvider,
  EmployeeWebAppEnvironmentProperties,
  AppVersion,
  AUDIT_DOWNLOAD_VIEW,
  CONVERSATION_VIEW,
  auditDownloadNotificationRoutingHandler,
  conversationNotificationRoutingHandler,
} from '@backbase/employee-web-app-shared-util-core';
import {
  ACTIVITY_MONITOR_CONFIG,
  ActivityMonitorConfig,
} from '@backbase/identity-auth';
import {
  INPUT_EMAIL_CONFIG_TOKEN,
  InputEmailConfig,
} from '@backbase/ui-ang/input-email';
import {
  COUNTRY_CODE_FORMAT_CONFIG_TOKEN,
  CountryCodeFormatConfigMap,
  INPUT_PHONE_CONFIG_TOKEN,
  InputPhoneConfig,
} from '@backbase/ui-ang/input-phone';
import { TitleStrategy } from '@angular/router';
import countryList from './country-list';
import {
  BreadcrumbTitleStrategy,
  APPLICATION_NAME,
} from '@backbase/foundation-ang/core';
import {
  TOOLTIP_CONFIG_TOKEN,
  TooltipConfig,
} from '@backbase/ui-ang/tooltip-directive';

const tooltipConfig: TooltipConfig = {
  triggers: 'hover focus',
  closeDelay: 400,
};

const activityMonitorConfig: ActivityMonitorConfig = {
  maxInactivityDuration: 300,
  countdownDuration: 60,
};

const inputEmailConfig: InputEmailConfig = {
  maxLength: 255,
  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const inputPhoneConfig: InputPhoneConfig = {
  countryList,
  defaultCountryIsoCode: 'US',
  hideSelectedCountryFlag: true,
  enableCountryCode: true,
};

const countryCodeFormatConfig: CountryCodeFormatConfigMap = {
  '+1': {
    mask: '+0 (000) 000-0000',
    minLength: 10,
    maxLength: 10,
  },
};

const version: AppVersion = {
  calver: '2024.03.2-LTS',
  semver: '7.7.2',
  logToConsole: true,
  showInContextMenu: false,
};

export const environmentBase: Partial<EmployeeWebAppEnvironmentProperties> = {
  providers: [
    auxiliaryRouteUrlFixerInitializerProvider(['assist']),
    {
      provide: ACTIVITY_MONITOR_CONFIG,
      useValue: activityMonitorConfig,
    },
    {
      provide: INPUT_EMAIL_CONFIG_TOKEN,
      useValue: inputEmailConfig,
    },
    {
      provide: INPUT_PHONE_CONFIG_TOKEN,
      useValue: inputPhoneConfig,
    },
    {
      provide: COUNTRY_CODE_FORMAT_CONFIG_TOKEN,
      useValue: countryCodeFormatConfig,
    },
    {
      provide: TitleStrategy,
      useClass: BreadcrumbTitleStrategy,
    },
    {
      provide: APPLICATION_NAME,
      useValue: $localize`:The name of the application@@bb-ewa.application-name:Digital Assist`,
    },
    { provide: TOOLTIP_CONFIG_TOKEN, useValue: tooltipConfig },
  ],
  userSearchPath: ['essentials', 'users'],
  serviceAgreementPath: ['essentials', 'service-agreements'],
  version,
  applicationName: $localize`:The name of the application@@bb-ewa.application-name:Digital Assist`,
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
