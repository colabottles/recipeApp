import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];
  loading = true;
  error = '';

  constructor(private supabaseService: SupabaseService) { }

  async ngOnInit() {
    try {
      this.recipes = await this.supabaseService.getRecipes();
    } catch (err) {
      this.error = 'Failed to load recipes.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}
