/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export an array named
 * `mockProviders`.
 *
 *
 */

import { createMocksInterceptor } from '@backbase/foundation-ang/data-http';
import { Provider } from '@angular/core';
import { mockUserContextCookieInterceptorProvider } from '@backbase/employee-web-app-root-util-dev-tools';
import {
  AccountServiceMocksProvider,
  ServiceAgreementsServiceMocksProvider,
  TransactionsServiceMocksProvider,
  CardsServiceMocksProvider,
  SmartInsightsServiceMocksProvider,
} from '@backbase/employee-http-ang';
import {
  DataGroupsHttpServiceMocksProvider,
  FunctionGroupsHttpServiceMocksProvider,
  LegalEntitiesHttpServiceMocksProvider,
  ServiceAgreementHttpServiceMocksProvider,
  ServiceAgreementsHttpServiceMocksProvider,
  UserContextHttpServiceMocksProvider,
  UsersHttpServiceMocksProvider,
} from '@backbase/accesscontrol-http-ang';
import {
  IdentityManagementServiceMocksProvider,
  UserManagementServiceMocksProvider,
  UserProfileManagementServiceMocksProvider as UserProfileMocksProvider
} from '@backbase/user-http-ang';
import {
  ApprovalTypeAssignmentsHttpServiceMocksProvider,
  ApprovalTypesHttpServiceMocksProvider,
  ApprovalsHttpServiceMocksProvider,
  PoliciesHttpServiceMocksProvider,
  PolicyAssignmentsHttpServiceMocksProvider,
} from '@backbase/approval-http-ang';
import {
  ProductSummaryHttpServiceMocksProvider,
  AccountsHttpServiceMocksProvider,
  ArrangementsHttpServiceMocksProvider,
} from '@backbase/arrangement-manager-http-ang';
import { NotificationsHttpServiceMocksProvider } from '@backbase/notifications-http-ang';
import { AuditClientServiceMocksProvider } from '@backbase/audit-http-ang';
import { LimitsHttpServiceMocksProvider } from '@backbase/limit-http-ang';
import { ManageOtherUsersDevicesServiceMocksProvider } from '@backbase/device-http-ang';
import { EmployeeHttpServiceMocksProvider } from '@backbase/messages-v5-http-ang';
import { UserProfileManagementServiceMocksProvider } from '@backbase/user-profile-http-ang';
import { PaymentOrdersHttpServiceMocksProvider } from '@backbase/payment-order-http-ang';
import { CommentsServiceMocksProvider } from '@backbase/comments-v2-client-ang';
import { IdentityImpersonationServiceMocksProvider } from '@backbase/impersonation-v1-client-ang';
import { ContactsHttpServiceMocksProvider } from '@backbase/contact-manager-http-ang';
import { ConversationHistoryServiceMocksProvider } from '@backbase/employee-actions-http-ang';
import {
  DataGroupsHttpServiceMocksProvider as DataGroupsHttpServiceMocksProviderV3,
  FunctionGroupsHttpServiceMocksProvider as FunctionGroupsHttpServiceMocksProviderV3,
  LegalEntitiesHttpServiceMocksProvider as LegalEntitiesHttpServiceMocksProviderV3,
  ServiceAgreementsHttpServiceMocksProvider as ServiceAgreementsHttpServiceMocksProviderV3,
  UserContextHttpServiceMocksProvider as UserContextHttpServiceMocksProviderV3,
  UsersHttpServiceMocksProvider as UsersHttpServiceMocksProviderV3,
} from '@backbase/accesscontrol-v3-http-ang';

/**
 * Mock providers for Backbase services used when running the app in dev mode.
 */
export const mockProviders: Provider[] = [
  mockUserContextCookieInterceptorProvider,
  createMocksInterceptor(),
  AccountServiceMocksProvider,
  ServiceAgreementsServiceMocksProvider,
  TransactionsServiceMocksProvider,
  DataGroupsHttpServiceMocksProvider,
  FunctionGroupsHttpServiceMocksProvider,
  LegalEntitiesHttpServiceMocksProvider,
  ServiceAgreementHttpServiceMocksProvider,
  ServiceAgreementsHttpServiceMocksProvider,
  UserContextHttpServiceMocksProvider,
  UsersHttpServiceMocksProvider,
  IdentityManagementServiceMocksProvider,
  UserManagementServiceMocksProvider,
  ApprovalTypeAssignmentsHttpServiceMocksProvider,
  ApprovalTypesHttpServiceMocksProvider,
  ApprovalsHttpServiceMocksProvider,
  PoliciesHttpServiceMocksProvider,
  PolicyAssignmentsHttpServiceMocksProvider,
  ProductSummaryHttpServiceMocksProvider,
  NotificationsHttpServiceMocksProvider,
  AuditClientServiceMocksProvider,
  LimitsHttpServiceMocksProvider,
  ManageOtherUsersDevicesServiceMocksProvider,
  AccountsHttpServiceMocksProvider,
  EmployeeHttpServiceMocksProvider,
  UserProfileManagementServiceMocksProvider,
  PaymentOrdersHttpServiceMocksProvider,
  CommentsServiceMocksProvider,
  IdentityImpersonationServiceMocksProvider,
  CardsServiceMocksProvider,
  SmartInsightsServiceMocksProvider,
  ArrangementsHttpServiceMocksProvider,
  UserProfileMocksProvider,
  ContactsHttpServiceMocksProvider,
  ConversationHistoryServiceMocksProvider,
  DataGroupsHttpServiceMocksProviderV3,
  FunctionGroupsHttpServiceMocksProviderV3,
  LegalEntitiesHttpServiceMocksProviderV3,
  ServiceAgreementsHttpServiceMocksProviderV3,
  UserContextHttpServiceMocksProviderV3,
  UsersHttpServiceMocksProviderV3,
];
