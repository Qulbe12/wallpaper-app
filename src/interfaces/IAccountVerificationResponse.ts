export interface IAccountVerificationResponse {
    assets: Asset[]
    "current-round": number
    "next-token": string
  }
  
  export interface Asset {
    amount: number
    "asset-id": number
    deleted: boolean
    "is-frozen": boolean
    "opted-in-at-round": number
    "opted-out-at-round"?: number
  }