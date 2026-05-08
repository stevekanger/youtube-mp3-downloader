export interface AiVendor {
  id: string;
  name: string;
  key: string;
  active: boolean;
  model: string;
}

export interface AiVendorModels {
  default: string;
  all: string[];
}
