import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProtocolComponent } from "./pages/protocol/protocol.component";
import { HostsPageComponent } from "./pages/hosts-page/hosts-page.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'protocol', component: ProtocolComponent},
  {path: 'hosts-page', component: HostsPageComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
