import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: any = {
    name: '',
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
  loading = true;
  error = '';
  id = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseService,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.id) {
      this.error = 'No recipe ID provided.';
      this.loading = false;
      return;
    }
    try {
      const data = await this.supabaseService.getRecipeById(this.id);
      this.recipe = data;
      this.ingredients = data.ingredients ? data.ingredients.split('\n') : [''];
      this.directions = data.directions ? data.directions.split('\n') : [''];
    } catch (err) {
      this.error = 'Failed to load recipe.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

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
      await this.supabaseService.updateRecipe(this.id, this.recipe);
      this.toastService.show('Recipe updated successfully!', 'success');
      this.router.navigate(['/recipe', this.id]);
    } catch (err) {
      this.toastService.show('Failed to update recipe. Please try again.', 'error');
      console.error(err);
    }
  }
}
