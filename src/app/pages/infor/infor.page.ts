import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonNote, IonLabel, IonItem, IonList, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOut} from 'ionicons/icons';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-infor',
  templateUrl: './infor.page.html',
  styleUrls: ['./infor.page.scss'],
  standalone: true,
  imports: [IonNote, IonLabel, IonItem, IonList, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonMenuButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle]
})


export class InforPage implements OnInit {
  router = inject(Router)
  loginService = inject(LoginService);
  FSservices = inject(FirestoreService);
  tipoUsr?: string = ''; //'Admin' | 'Cliente' | 'Profesor' | 'Asistente' = undefined;
  userDataList: { label: string; value: string | undefined; }[] | undefined;

  constructor() { 
    addIcons({
      logOut
    });

    this.loginService.checkAuthState.subscribe(res=>{
      if (res){
        this.getUserData(res.uid)
      }
    })
    
  }

  ngOnInit() {
  }




getUserData(uid:string){
  const path ="users";
  const id = uid;

  this.FSservices.getData<UserModel>(path,id).subscribe(res=>{
    if (res){
      // Asignar los datos del usuario a una variable
      const userData = res;
      
      // Crear un array con los datos del usuario para mostrar en el ion-card
      const uDataList = [
        { label: 'ID', value: userData.id },
        { label: 'Nombre', value: userData.name },
        { label: 'Apellido', value: userData.lastname },
        { label: 'Email', value: userData.email },
        { label: 'Teléfono', value: userData.tlf },
        { label: 'WhatsApp', value: userData.wapp },
        { label: 'País', value: userData.country },
        { label: 'Ciudad', value: userData.city },
        { label: 'Tipo de usuario', value: userData.user_type }
        // Agrega más campos según sea necesario
      ];

      // Asignar el array de datos del usuario a una variable para mostrar en la interfaz
      this.userDataList = uDataList;
    }
  })
}

  cerrarSession(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  
}
