import { NgModule } from '@angular/core';
import { CommentsJourneyModule } from '@backbase/employee-comments-journey-ang';

@NgModule({
  imports: [CommentsJourneyModule.forRoot()],
})
export class UserCommentsJourneyLoaderModule {}
