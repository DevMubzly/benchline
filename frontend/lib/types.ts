export interface GeographyFeature {
  name: string;
  type: 'ocean' | 'sea' | 'mountain' | 'continent' | 'other';
  lat: number;
  lng: number;
}

export interface MapData {
  countries: any[];
  interiors: any;
  land: any;
}

export interface Customer {
  id: string;
  name: string;
  location: { lat: number, lng: number };
  revenue: string;
  status: 'active' | 'churned' | 'new';
  plan: 'basic' | 'pro' | 'enterprise';
  avatarUrl?: string; // Optional URL for image, we'll mock the shape
}
