import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: any = null;
  loading = true;
  error = '';
  deleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseService,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'No recipe ID provided.';
      this.loading = false;
      return;
    }
    try {
      this.recipe = await this.supabaseService.getRecipeById(id);
    } catch (err) {
      this.error = 'Failed to load recipe.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async onDelete() {
    if (!confirm(`Delete "${this.recipe.name}"? This cannot be undone.`)) return;
    this.deleting = true;
    try {
      await this.supabaseService.deleteRecipe(this.recipe.id);
      this.toastService.show('Recipe deleted.', 'success');
      this.router.navigate(['/']);
    } catch (err) {
      this.toastService.show('Failed to delete recipe. Please try again.', 'error');
      this.deleting = false;
      console.error(err);
    }
  }
}
