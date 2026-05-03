import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'add', component: RecipeFormComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'recipe/:id/edit', component: RecipeEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }