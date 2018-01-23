import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { AuthGuard } from './shared/services/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: "system", loadChildren: "./system/system.module#SystemModule" },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
