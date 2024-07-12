import { Component } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment/environment';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  supabase: SupabaseClient;
  recipe = {
    name: '',
    ingredients: '',
    directions:'',
    nutrition:'',
    prepTime:'',
    cookTime:''
  };

  constructor(private supabaseService: SupabaseService) {}

  async onSubmit() {
    try {
      const data = await this.supabaseService.addRecipe(this.recipe);
      console.log('Recipe inserted successfully!', data);
    } catch (error) {
      console.error('Error inserting recipe.', error);
    }
  }
}
