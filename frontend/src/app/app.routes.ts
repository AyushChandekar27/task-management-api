import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'tasks',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/task-list/task-list.component').then(m => m.TaskListComponent)
    },
    {
        path: 'tasks/new',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent)
    },
    {
        path: 'tasks/edit/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent)
    },
    { path: '**', redirectTo: 'tasks' }
];