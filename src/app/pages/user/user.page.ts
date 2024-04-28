import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonButtons, IonButton, IonMenuButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { FirestoreService } from '../../services/firestore.service';
import { User } from '@angular/fire/auth';
import { addIcons } from 'ionicons';
import { logOut} from 'ionicons/icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonList, IonItem, IonLabel, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonButtons, IonButton, IonMenuButton ]
})
export class UserPage implements OnInit {
  router = inject(Router)
  loginServices = inject(LoginService);
  
  users: UserModel[] = [];
  constructor(private fstservices: FirestoreService) { 
      addIcons({
        logOut
      });
  }

  loadusr(){

    this.fstservices.getDataCollection('users').subscribe( data =>{
      if (data){
        this.users = data;
      }
    })



    // const user ={
    //   id: '01',
    //   name: 'Pedro Carruido',
    //   email: 'p@c.com',
    //   user_type: 'Alumno'
    // }
    // const user1 ={
    //   id: '02',
    //   name: 'Maria Lopez',
    //   email: 'm@l.com',
    //   user_type: 'Admin'
    // }
     
    // this.users.push(user,user1)

  }

  ngOnInit() {
    this.loadusr();
  }

  cerrarSession(){
    this.loginServices.logout();
    this.router.navigate(['/login']);
  }

}
