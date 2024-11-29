import { NgModule } from '@angular/core';
import { ProductsJourneyModule } from '@backbase/employee-products-journey-ang';

@NgModule({
  imports: [ProductsJourneyModule.forRoot()],
})
export class ProductsJourneyLoaderModule {}
