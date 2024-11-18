import { Injectable } from '@angular/core';
import {
  LegalEntitiesHttpService,
  LegalEntityItem,
} from '@backbase/accesscontrol-http-ang';
import {
  IdentityManagementService,
  UpdateIdentityRequest,
} from '@backbase/user-http-ang';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminUserDetailsCustomService {
  constructor(
    private userData: IdentityManagementService,
    private legalEntityData: LegalEntitiesHttpService
  ) {}

  /** Returns the legal entity for the given ID */
  getLegalEntity(legalEntityId: string): Observable<LegalEntityItem> {
    return this.legalEntityData.getLegalEntityById({ legalEntityId });
  }
  /** Updates the user details for the given user's internal ID */
  updateUserDetails(
    internalId: string,
    updateIdentityRequest: UpdateIdentityRequest
  ): Observable<any> {
    return this.userData.updateIdentity({
      internalId,
      updateIdentityRequest,
    });
  }
}
