import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';

export const routes: Routes = [
  {
    path: '', // URL vuoto (es. localhost:4200/)
    component: DashboardComponent
  },
  {
    path: 'dashboard', // Facoltativo: localhost:4200/dashboard
    component: DashboardComponent
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  }
];