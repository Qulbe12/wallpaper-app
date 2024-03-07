export interface ITokenVerificationReso {
    asset: Asset;
    "current-round": number | null;
  }
  
  export interface Asset {
    "created-at-round": number | null;
    deleted: boolean;
    index: number | null;
    params: Params;
  }
  
  export interface Params {
    clawback: string;
    creator: string;
    decimals: number | null;
    "default-frozen": boolean;
    freeze: string;
    manager: string;
    name: string;
    "name-b64": string;
    reserve: string;
    total: number | null;
    "unit-name": string;
    "unit-name-b64": string;
    url: string;
    "url-b64": string;
  }
  