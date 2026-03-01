/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: certifications
 * Interface for Certifications
 */
export interface Certifications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  certificationName?: string;
  /** @wixFieldType text */
  issuer?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
  /** @wixFieldType date */
  expectedCompletionDate?: Date | string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  certificationImage?: string;
  /** @wixFieldType url */
  verificationUrl?: string;
}


/**
 * Collection ID: itsectors
 * Interface for ITSectors
 */
export interface ITSectors {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  sectorName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  sectorImage?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  keywords?: string;
  /** @wixFieldType url */
  learnMoreUrl?: string;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  technologiesUsed?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  projectImage?: string;
  /** @wixFieldType url */
  projectUrl?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
  /** @wixFieldType text */
  keyLearnings?: string;
}
