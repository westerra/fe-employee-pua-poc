import { NgModule } from '@angular/core';
import { EmployeeProductsJourneyModule } from '@backbase/employee-web-app-user-mode-feature-account-summary';

@NgModule({
  imports: [EmployeeProductsJourneyModule.forRoot()],
})
export class ProductsJourneyLoaderModule {}
