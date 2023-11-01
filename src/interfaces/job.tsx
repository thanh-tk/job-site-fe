export interface JobData {
  id: string;
  title?: string;
  description?: string;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
}
