import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  recipe = {
    name: '',
    ingredients: '',
    directions: '',
    nutrition: '',
    prep_time: '',
    cook_time: '',
    servings: null,
    category: '',
    cuisine: '',
    difficulty: '',
    notes: '',
    image_url: ''
  };

  ingredients: string[] = [''];
  directions: string[] = [''];

  categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Appetizer', 'Drink'];
  cuisines = ['American', 'Chinese', 'French', 'Greek', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Thai'];
  difficulties = ['Easy', 'Medium', 'Hard'];
  selectedFile: File | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private toastService: ToastService
  ) {}

  addIngredient() { this.ingredients.push(''); }
  removeIngredient(index: number) { this.ingredients.splice(index, 1); }
  addDirection() { this.directions.push(''); }
  removeDirection(index: number) { this.directions.splice(index, 1); }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async onSubmit() {
    try {
      if (this.selectedFile) {
        this.recipe.image_url = await this.supabaseService.uploadImage(this.selectedFile);
      }
      this.recipe.ingredients = this.ingredients.filter(i => i.trim()).join('\n');
      this.recipe.directions = this.directions.filter(d => d.trim()).join('\n');
      await this.supabaseService.addRecipe(this.recipe);
      this.toastService.show('Recipe added successfully!', 'success');
      this.router.navigate(['/']);
    } catch (error) {
      this.toastService.show('Failed to add recipe. Please try again.', 'error');
      console.error(error);
    }
  }
}