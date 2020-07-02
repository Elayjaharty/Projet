import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from'./_material/material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DialogComponent } from './dialog/dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthentificationService } from './_service/authentification.service';
import { AuthGuardService } from './_service/auth-guard.service';
import { LoggedGuardService } from './_service/log-guard.service';
import { LoginComponent } from './login/login.component';
//import { RefreshJwtInterceptor } from './_service/jwt-interceptor.sevice';
import { DgaComponent } from './dga/dga.component';
import { DgpaComponent } from './dgpa/dgpa.component';
import { DgeComponent } from './dge/dge.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { DemandeComponent } from './utilisateur/demande/demande.component';
import { DemandeListeComponent } from './utilisateur/demande-liste/demande-liste.component';
import { DemandeDetailComponent } from './utilisateur/demande-detail/demande-detail.component';
import { UtilisateurService } from './_service/uitlisateur/utilisateur.service';
import { DemandeService } from './_service/demande/demande.service';
import { DashboardComponent } from './administrateur/dashboard/dashboard.component';
import { NewprofileComponent } from './administrateur/newprofile/newprofile.component';
import { DemandesComponent } from './administrateur/demandes/demandes.component';
import { UtilisateursComponent } from './administrateur/utilisateurs/utilisateurs.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DialogComponent,
    ProfileComponent,
    LoginComponent,
    DgaComponent,
    DgpaComponent,
    DgeComponent,
    UtilisateurComponent,
    AdministrateurComponent,
    DemandeComponent,
    DemandeListeComponent,
    DemandeDetailComponent,
    DashboardComponent,
    NewprofileComponent,
    DemandesComponent,
    UtilisateursComponent
  ],
  entryComponents:[
  	DialogComponent
  	],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthentificationService,
    AuthGuardService,
    LoggedGuardService,
    //provide: HTTP_INTERCEPTORS,
      //useClass: RefreshJwtInterceptor,
      //multi: true
    //},
    UtilisateurService,
    DemandeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
