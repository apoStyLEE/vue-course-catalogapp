import type { IProduct } from '@/models/Product'
import supaBaseClient from '@/plugin/supaBaseClient'

export default {
  async getProducts(categoryId: any): Promise<IProduct[] | null> {
    const { data } = await supaBaseClient
      .from('products')
      .select()
      .eq('category_id', categoryId)
      .returns<IProduct[]>()

    return data
  },
  async getAllProducts(): Promise<IProduct[] | null> {
    const { data } = await supaBaseClient.from('products').select().returns<IProduct[]>()

    return data
  }
}
