import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from './environments/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  async addRecipe(recipe: any) {
    const { data, error } = await this.supabase
      .from('recipes')
      .insert([recipe]);
    if (error) throw error;
    return data;
  }

  async getRecipes() {
    const { data, error } = await this.supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async getRecipeById(id: string) {
    const { data, error } = await this.supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async updateRecipe(id: string, recipe: any) {
    const { data, error } = await this.supabase
      .from('recipes')
      .update(recipe)
      .eq('id', id);
    if (error) throw error;
    return data;
  }

  async deleteRecipe(id: string) {
    const { error } = await this.supabase
      .from('recipes')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  async uploadImage(file: File): Promise<string> {
  const filePath = `${Date.now()}-${file.name}`;
  const { error } = await this.supabase.storage
    .from('recipe-images')
    .upload(filePath, file);
  if (error) throw error;
  const { data } = this.supabase.storage
    .from('recipe-images')
    .getPublicUrl(filePath);
  return data.publicUrl;
}
}