export interface AiVendorMapped {
  id: string;
  name: string;
  key: string;
  lastUsed: Date;
  lastUsedModel: string;
}

export interface AiVendorModels {
  default: string;
  all: string[];
}
