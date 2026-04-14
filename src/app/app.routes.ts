import { Routes } from "@angular/router";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { AnalyticsComponent } from "./features/analytics/analytics.component";
import { ContactsComponent } from "./features/contacts/contacts.component";
import { ServerFormComponent } from "./features/server-form/server-form.component";

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    children: [
      {
        path: 'nodes/new',
        component: ServerFormComponent
      }
    ]
  }, 
  { path: 'contacts', component: ContactsComponent },
  { path: '**', redirectTo: 'dashboard' } // Wildcard per gestire i 404
];