import { Routes } from '@angular/router';
// import { AuthGuard } from '@angular/fire/auth-guard';
// import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [


  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.page').then( m => m.MainPage),
    canActivate: [loginGuard]
  },
  {
    path: 'user',
    loadComponent: () => import('./pages/user/user.page').then( m => m.UserPage),
    canActivate: [loginGuard]
  },
  {
    path: 'infor',
    loadComponent: () => import('./pages/infor/infor.page').then( m => m.InforPage),
    canActivate: [loginGuard]
  },
  {
    path: 'zproduct-list',
    loadComponent: () => import('./pages/zproduct-list/zproduct-list.page').then( m => m.ZproductListPage),
    canActivate: [loginGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage),
    canActivate: [loginGuard]
  },
  {
    path: 'project',
    loadComponent: () => import('./pages/project/project.page').then( m => m.ProjectPage),
    canActivate: [loginGuard]
  },
  {
    path: 'leads',
    loadComponent: () => import('./pages/leads/leads.page').then( m => m.LeadsPage),
    canActivate: [loginGuard]
  },
  {
    path: 'managerequests',
    loadComponent: () => import('./pages/managerequests/managerequests.page').then( m => m.ManagerequestsPage),
    canActivate: [loginGuard]
  },
  {
    path: 'invoices',
    loadComponent: () => import('./pages/invoices/invoices.page').then( m => m.InvoicesPage),
    canActivate: [loginGuard]
  },
  {
    path: 'admincontact',
    loadComponent: () => import('./pages/admincontact/admincontact.page').then( m => m.AdmincontactPage),
    canActivate: [loginGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage),
    canActivate: [loginGuard]
  },
  {
    path: 'city',
    loadComponent: () => import('./pages/city/city.page').then( m => m.CityPage),
    canActivate: [loginGuard]
  },
  {
    path: 'role',
    loadComponent: () => import('./pages/role/role.page').then( m => m.RolePage),
    canActivate: [loginGuard]
  },
  {
    path: 'category',
    loadComponent: () => import('./pages/category/category.page').then( m => m.CategoryPage),
    canActivate: [loginGuard]
  },
  {
    path: 'passwd-reset',
    loadComponent: () => import('./pages/passwd-reset/passwd-reset.page').then( m => m.PasswdResetPage)
  },
  {
    path: 'document-upload',
    loadComponent: () => import('./pages/document-upload/document-upload.page').then( m => m.DocumentUploadPage)
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
  }
];
