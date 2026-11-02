export type Commodity = {
  id: string
  name: string
  nameTl?: string
  category: string
  price: number
  low?: number
  high?: number
  unit?: string
  updatedAt?: string
}

export type BasketLine = { commodity: Commodity; quantity: number; checked: boolean }
