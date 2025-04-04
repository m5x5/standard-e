export interface Template {
  id: string;
  name: string;
  command: string;
  image: string;
  language: string;
  framework: string;
  npmDownloads?: string;
  githubStars?: string;
  lastUpdated?: string;
}

export type FilterType = 'language' | 'framework';

export interface TemplateFormData {
  name: string;
  command: string;
  image: string;
  language: string;
  framework: string;
  npmDownloads?: string;
  githubStars?: string;
  lastUpdated?: string;
}

declare global {
  interface Window {
    __TAURI__: {
      shell: {
        open: (url: string) => Promise<void>;
      };
    };
  }
} 