import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonMenuButton, IonButtons, IonButton, IonLabel, IonMenuToggle, IonList, IonMenu, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { logOut} from 'ionicons/icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonMenuButton, IonButtons, IonButton, IonLabel, IonMenuToggle, IonList, IonMenu, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonIcon]
})
export class MainPage implements OnInit {
  router = inject(Router)
  loginServices = inject(LoginService);
  
  constructor() { 
    addIcons({
      logOut
    });
  }

  ngOnInit() {
    
  }

  cerrarSession(){
    this.loginServices.logout();
    this.router.navigate(['/login']);
  }

}
