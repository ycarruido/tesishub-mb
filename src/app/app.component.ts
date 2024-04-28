import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { IonCardContent, IonCardTitle, IonCardHeader, IonMenuButton, IonButtons, IonLabel, IonMenuToggle, IonList, IonMenu, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { home,informationCircle, people, shirt, speedometer, barChart, funnel, mail, documentText, chatbox, ellipsisHorizontal } from 'ionicons/icons';
import { LoginService } from './services/login.service';
import { FirestoreService } from './services/firestore.service';
import { UserModel } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [CommonModule,IonRouterOutlet, RouterLink, IonCardContent, IonCardTitle, IonCardHeader, IonMenuButton, IonButtons,IonLabel, IonMenuToggle, IonList, IonMenu, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonIcon],
})
export class AppComponent {
  login: boolean = false;
  loginUserService = inject(LoginService);
  FSservices = inject(FirestoreService);
  tipoUsr?: string = ''; //'Admin' | 'Cliente' | 'Profesor' | 'Asistente' = undefined;

  constructor() {
    addIcons({
      home, informationCircle, people, shirt, speedometer, barChart, funnel, mail, documentText, chatbox, ellipsisHorizontal //icono "home"
    });

    this.loginUserService.checkAuthState.subscribe(res=>{
      if (res){
        console.log("Esta logeado");
        this.getUserData(res.uid)

        
        this.login = true;
      }else{
        console.log("No esta logeado");
        this.login = false;
      }
    })
  }

  getUserData(uid:string){
    const path ="users";
    const id = uid;

    this.FSservices.getData<UserModel>(path,id).subscribe(res=>{
      if (res){
          this.tipoUsr = res.user_type;
          //console.log("Rol => ", this.tipoUsr);
      }
    })
  }


}
