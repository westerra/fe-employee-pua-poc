export const bankAdminEntitlements = {
  createUser:
    'Identities.ManageIdentities.create AND LegalEntity.ManageLegalEntities.view AND User.ManageUsers.view',
  audit: 'Audit.Audit.view',
  globalLimits: 'Limits.ManageGlobalLimits.view',
  serviceAgreements: 'ServiceAgreement.ManageServiceAgreements.view',
  topics: 'MessageCenter.ManageTopics.view',
  userEnrollment: 'LegalEntity.ManageLegalEntities.create',
  legalEntities: 'LegalEntity.ManageLegalEntities.view',
  approvalLog: '*.*.approve',
  conversationCategory:
    'ConversationHistory.ConversationHistoryConfiguration.view',
  conversationTrends:
    'ConversationHistory.ConversationHistoryInsights.view OR ConversationHistory.ConversationHistoryExport.execute',
  globalRestrictions: 'Approvals.ManageApprovalPolicyGlobalRestrictions.view',
};
