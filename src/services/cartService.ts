import supaBaseClient from '@/plugin/supaBaseClient'

export default {
  async getCart(userId: string | undefined) {
    return await supaBaseClient
      .from('carts')
      .select('id, amount, products(id, title, price, currency)')
      .eq('user_id', userId)
      .order('id')
  },
  async removeCartItem(userId: string | undefined, cartItemId: number) {
    await supaBaseClient.from('carts').delete().eq('user_id', userId).eq('id', cartItemId)
  },
  async updateAmount(userId: string | undefined, cartItemId: number, amount: number) {
    await supaBaseClient
      .from('carts')
      .update({
        amount: amount
      })
      .eq('user_id', userId)
      .eq('id', cartItemId)
  },
  async addCartItem(userId: string | undefined, productId: number) {
    await supaBaseClient.from('carts').insert({
      amount: 1,
      product_id: productId,
      user_id: userId
    })
  },
  calculateCartItemSum(cartItems: any[]): number {
    if (!cartItems) return 0

    return cartItems.reduce((a: number, item: any) => {
      a += item.products.price * item.amount

      return a
    }, 0)
  }
}
