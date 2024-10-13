import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/Aprendices/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'asignaturas1',
    loadChildren: () => import('./pages/Tutor/asignaturas1/asignaturas.module').then( m => m.AsignaturasPageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./pages/Aprendices/nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/Aprendices/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./pages/Aprendices/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./pages/recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'publicar',
    loadChildren: () => import('./pages/Aprendices/publicar/publicar.module').then( m => m.PublicarPageModule)
  },
  {
    path: 'publicar1',
    loadChildren: () => import('./pages/Tutor/publicar1/publicar1.module').then( m => m.PublicarPageModule)
  },
  {
    path: 'tutores',
    loadChildren: () => import('./pages/Aprendices/tutores/tutores.module').then( m => m.TutoresPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/Aprendices/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./pages/Aprendices/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'menu-asignatura',
    loadChildren: () => import('./pages/Aprendices/menu-asignatura/menu-asignatura.module').then( m => m.MenuAsignaturaPageModule)
  },
  
  {
    path: 'perfil-agregar-amigos',
    loadChildren: () => import('./pages/Aprendices/perfil-agregar-amigos/perfil-agregar-amigos.module').then( m => m.PerfilAgregarAmigosPageModule)
  },
  {
    path: 'aprendiz',
    loadChildren: () => import('./pages/Tutor/aprendiz/aprendiz.module').then( m => m.AprendizPageModule)
  },  {
    path: 'curso',
    loadChildren: () => import('./pages/Tutor/curso/curso.module').then( m => m.CursoPageModule)
  },
  {
    path: 'mi-publicacion',
    loadChildren: () => import('./pages/mi-publicacion/mi-publicacion.module').then( m => m.MiPublicacionPageModule)
  },
  {
    path: 'editar-publicacion',
    loadChildren: () => import('./pages/editar-publicacion/editar-publicacion.module').then( m => m.EditarPublicacionPageModule)
  },
  {
    path: 'editar-curso',
    loadChildren: () => import('./pages/editar-curso/editar-curso.module').then( m => m.EditarCursoPageModule)
  },
  {
    path: 'lista',
    loadChildren: () => import('./pages/lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/Aprendices/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
