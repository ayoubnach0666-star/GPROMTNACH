
export interface AIPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  shortPreview: string;
  imageUrl: string;
  category: PromptCategory;
  author: string;
  date: string;
  tips?: string[];
}

export enum PromptCategory {
  LOGO = 'Logo',
  FASHION = 'Fashion',
  PRODUCT = 'Product',
  PORTRAIT = 'Portrait',
  POSTER = 'Poster',
  SOCIAL_MEDIA = 'Social Media',
  PHOTOGRAPHS = 'Photographs',
  ALL = 'All'
}
