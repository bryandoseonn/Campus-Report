export type ReportStatus = 'pending' | 'in_progress' | 'completed';

export type FacilityCategory = 
  | 'classroom' 
  | 'laboratory' 
  | 'library' 
  | 'toilet' 
  | 'sports_facility' 
  | 'canteen' 
  | 'parking' 
  | 'other';

export interface Report {
  id: string;
  title: string;
  description: string;
  category: FacilityCategory;
  location: string;
  photoUrl?: string;
  status: ReportStatus;
  reporterName: string;
  reporterEmail: string;
  createdAt: Date;
  updatedAt: Date;
  adminNote?: string;
}
