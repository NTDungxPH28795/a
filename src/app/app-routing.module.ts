import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './pages/admin/dashboard-page/dashboard-page.component';
import { ProductManagerPageComponent } from './pages/admin/product-manager-page/product-manager-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

const routes: Routes = [
  { path: "", component: BaseLayoutComponent, children: [
    {path: "", component: HomePageComponent},
    {path: "product", component: ProductPageComponent},
    {path: "about", component: AboutPageComponent},
  ]},
  {path: "admin", component: AdminLayoutComponent, children: [
    {path: "", redirectTo: "dashboard", pathMatch: "full"},
    {path: "dashboard", component: DashboardPageComponent},
    {path: "product", component: ProductManagerPageComponent},
    {path: "product/add", component: ProductFormComponent},
    {path: "product/:id/edit", component: ProductFormComponent},
  ]},
  { path: "**", component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
