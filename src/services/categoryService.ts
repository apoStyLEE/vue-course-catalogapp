import supaBaseClient from '@/plugin/supaBaseClient'

export default {
  async getCategories() {
    return await supaBaseClient.from('categories').select()
  },
  async getCategory(id: any) {
    return await supaBaseClient.from('categories').select().eq('id', id).single()
  }
}
