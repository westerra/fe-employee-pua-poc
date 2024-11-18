import { NgModule } from '@angular/core';
import { EmployeePaymentOrdersJourneyModule } from '@backbase/employee-web-app-user-mode-feature-payments';

@NgModule({
  imports: [EmployeePaymentOrdersJourneyModule.forRoot()],
})
export class PaymentsJourneyLoaderModule {}
