import { NgModule } from '@angular/core';
import { PaymentCommunicationService } from '@backbase/employee-web-app-payments-shared-feature-communication';
import {
  INITIATE_PAYMENT_CONFIG,
  INITIATE_PAYMENT_JOURNEY_ACCESS_CONTROL_BASE_PATH,
  INITIATE_PAYMENT_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
  INITIATE_PAYMENT_JOURNEY_CONTACT_MANAGER_BASE_PATH,
  INITIATE_PAYMENT_JOURNEY_PAYMENT_ORDER_BASE_PATH,
  INITIATE_PAYMENT_JOURNEY_PAYMENT_ORDER_OPTIONS_BASE_PATH,
  InitiatePaymentJourneyModule,
  PayordOmniPaymentConfigProvider,
} from '@backbase/initiate-payment-journey-ang';
import { SEPA } from './initiate-payment/sepa';
import {
  APP_ACCESS_CONTROL_BASE_PATH,
  APP_ARRANGEMENT_MANAGER_BASE_PATH,
  APP_CONTACT_MANAGER_BASE_PATH,
  APP_PAYMENT_ORDER_BASE_PATH,
  APP_PAYMENT_ORDER_OPTIONS_BASE_PATH,
} from '../../../../service-paths.module';

@NgModule({
  imports: [InitiatePaymentJourneyModule.forRoot()],
  providers: [
    PayordOmniPaymentConfigProvider,
    {
      provide: INITIATE_PAYMENT_JOURNEY_PAYMENT_ORDER_BASE_PATH,
      useExisting: APP_PAYMENT_ORDER_BASE_PATH,
    },
    {
      provide: INITIATE_PAYMENT_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
    {
      provide: INITIATE_PAYMENT_JOURNEY_CONTACT_MANAGER_BASE_PATH,
      useExisting: APP_CONTACT_MANAGER_BASE_PATH,
    },
    {
      provide: INITIATE_PAYMENT_JOURNEY_PAYMENT_ORDER_OPTIONS_BASE_PATH,
      useExisting: APP_PAYMENT_ORDER_OPTIONS_BASE_PATH,
    },
    {
      provide: INITIATE_PAYMENT_JOURNEY_ACCESS_CONTROL_BASE_PATH,
      useExisting: APP_ACCESS_CONTROL_BASE_PATH,
    },
    {
      provide: INITIATE_PAYMENT_CONFIG,
      useValue: {
        paymentTypes: [SEPA],
        businessFunctions: [SEPA.businessFunction],
        options: {
          header: () => '',
          isModalView: false,
          enablePaymentTemplateSelector: false,
          enableSavePaymentAsTemplate: false,
          enableNewPaymentButton: true,
        },
      },
    },
    {
      provide: INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
      useExisting: PaymentCommunicationService,
    },
  ],
})
export class InitiatePaymentJourneyLoaderModule {}
