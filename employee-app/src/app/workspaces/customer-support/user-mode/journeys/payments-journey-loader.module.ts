import { NgModule } from '@angular/core';
import { EmployeePaymentOrdersJourneyModule } from '@backbase/employee-payment-orders-journey-ang';

@NgModule({
  imports: [EmployeePaymentOrdersJourneyModule.forRoot()],
})
export class PaymentsJourneyLoaderModule {}
