/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export a CardLimitDescriptionService class
 *
 */
import {
  AbstractCardLimitDescriptionService,
  LimitDescriptions,
  defaultCardLimitDescriptions
} from '@backbase/employee-web-app-user-mode-feature-cards';

export class CardLimitDescriptionService extends AbstractCardLimitDescriptionService {
  descriptions: LimitDescriptions = {
    ...defaultCardLimitDescriptions
  };
}
