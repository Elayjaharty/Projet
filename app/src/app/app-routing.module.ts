import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuardService } from './_service/auth-guard.service';
import { LoggedGuardService } from './_service/log-guard.service';
import { DgaComponent } from './dga/dga.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { DgpaComponent } from './dgpa/dgpa.component';
import { DgeComponent } from './dge/dge.component';
import { DemandeComponent } from './utilisateur/demande/demande.component';
import { DemandeListeComponent } from './utilisateur/demande-liste/demande-liste.component';
import { DemandeDetailComponent } from './utilisateur/demande-detail/demande-detail.component';
import { DashboardComponent } from './administrateur/dashboard/dashboard.component';
import { DemandesComponent } from './administrateur/demandes/demandes.component';
import { NewprofileComponent } from './administrateur/newprofile/newprofile.component';
import { UtilisateursComponent } from './administrateur/utilisateurs/utilisateurs.component';

const routes: Routes = [
	{
		path: 'welcome',
		component: WelcomeComponent,
		canActivate: [LoggedGuardService]
	},
	{
		path: 'DGA',
		component: DgaComponent,
		canActivate: [AuthGuardService],
		children: [
			{
				path: 'admin',
				component: AdministrateurComponent,
				children: [
					{
						path: 'dashboard',
						component: DashboardComponent,
						pathMatch: 'full'
					},
					{
						path: 'demandes',
						component: DemandesComponent
					},
					{
						path: 'utilisateurs',
						component: UtilisateursComponent
					},
					{
						path: 'newprofile',
						component: NewprofileComponent
					},
					{
						path: 'profile',
						component: ProfileComponent
					}
				]
			},
			{
				path: 'user',
				component: UtilisateurComponent,
				children: [
					{
						path: 'home',
						component: DemandeComponent,
						pathMatch: 'full'
					},
					{
						path: 'demandes',
						component: DemandeListeComponent
					},
					{
						path: 'demande/:default',
						component: DemandeDetailComponent
					},
					{
						path: 'profile',
						component: ProfileComponent,
					}
				]
			}
		]
	},
	{
		path: 'DGPA',
		component: DgpaComponent,
		canActivate: [AuthGuardService],
		children: [
			{
				path: 'admin',
				component: AdministrateurComponent,
				children: [
					{
						path: 'dashboard',
						component: DashboardComponent,
						pathMatch: 'full'
					},
					{
						path: 'demandes',
						component: DemandesComponent
					},
					{
						path: 'utilisateurs',
						component: UtilisateursComponent
					},
					{
						path: 'newprofile',
						component: NewprofileComponent
					},
					{
						path: 'profile',
						component: ProfileComponent
					}
				]
			},
			{
				path: 'user',
				component: UtilisateurComponent,
				children: [
					{
						path: 'home',
						component: DemandeComponent,
						pathMatch: 'full'
					},
					{
						path: 'demandes',
						component: DemandeListeComponent
					},
					{
						path: 'demande',
						component: DemandeDetailComponent
					},
					{
						path: 'profile',
						component: ProfileComponent,
					}
				]
			}
		]
	},
	{
		path: 'DGE',
		component: DgeComponent,
		canActivate: [AuthGuardService],
		children: [
			{
				path: 'admin',
				component: AdministrateurComponent,
				children: [
					{
						path: 'dashboard',
						component: DashboardComponent,
						pathMatch: 'full'
					},
					{
						path: 'demandes',
						component: DemandesComponent
					},
					{
						path: 'utilisateurs',
						component: UtilisateursComponent
					},
					{
						path: 'newprofile',
						component: NewprofileComponent
					},
					{
						path: 'profile',
						component: ProfileComponent
					}
				]
			},
			{
				path: 'user',
				component: UtilisateurComponent,
				children: [
					{
						path: 'home',
						component: DemandeComponent,
						pathMatch: 'full'
					},
					{
						path: 'demandes',
						component: DemandeListeComponent
					},
					{
						path: 'demande',
						component: DemandeDetailComponent
					},
					{
						path: 'profile',
						component: ProfileComponent
					}
				]
			}
		]
	},
	{
		path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
	}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
