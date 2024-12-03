import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { TodoComponent } from "./todo/todo/todo.component";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { ColorComponent } from "./components/color/color.component";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import { PreloadingStrategyStrategy } from "./preloading-strategy.strategy";

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "rh", component: RhComponent },
  {
    path: "cv",
    loadChildren: () => 
      import('./cv/cv.module').then((m) => m.CvModule),
    data : { preload : true }
    //component: CvComponent,
  },
  //{ path: "cv/add", component: AddCvComponent, canActivate: [AuthGuard] },
  //{ path: "cv/:id", component: DetailsCvComponent },
  {
    path: "",
    component: FrontComponent,
    children: [
      { path: "todo", component: TodoComponent,
        loadChildren: () =>
          import('./todo/todo.module').then((m) => m.TodoModule),
       },
      { path: "word", component: MiniWordComponent },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [{ path: "color", component: ColorComponent }],
  },
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadingStrategyStrategy})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
