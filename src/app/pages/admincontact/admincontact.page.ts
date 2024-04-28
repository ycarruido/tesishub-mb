import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOut} from 'ionicons/icons';

@Component({
  selector: 'app-admincontact',
  templateUrl: './admincontact.page.html',
  styleUrls: ['./admincontact.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle]
})
export class AdmincontactPage implements OnInit {
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
