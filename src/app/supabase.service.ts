import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

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
}
