import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonLabel, IonToast, IonImg, IonContent, IonItem, IonInput, IonIcon, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, atOutline, warningOutline} from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { Token } from '@angular/compiler';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ 
    IonToast, RouterLink, IonImg, IonContent, IonItem, IonInput, IonIcon, IonHeader, 
    IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, IonButtons, IonButton, IonMenuButton, 
    IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle,IonLabel
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginServices = inject(LoginService);
  presentarMsg = inject(ToastService);
  router = inject(Router)

  constructor(private fb: FormBuilder) { 
    addIcons({
      personOutline, lockClosedOutline, atOutline, warningOutline
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    
  }

  async iniciarSesion(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const res = await this.loginServices.login(this.loginForm.value)
      .catch((error: any) => {
        const errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          this.presentarMsg.presentToast('Usuario o Contraseña incorrecta!','top','');
          //this.loginForm.setErrors({ wrongPassword: true });
        } else if (errorCode === 'auth/user-not-found') {
          this.presentarMsg.presentToast('Usuario no exite!','top','');
          //this.loginForm.setErrors({ userNotFound: true });
        }else if (errorCode === 'auth/missing-password') {
          this.presentarMsg.presentToast('Debe ingrear una contraseña!','top','');
          //this.loginForm.setErrors({ missingPassword: true });
        }else if (errorCode === 'auth/invalid-email') {
          this.presentarMsg.presentToast('Cuenta invalida!','top','');
          //this.loginForm.setErrors({ invalidEmail: true });
        }else if (errorCode === 'auth/user-disabled'){
          this.presentarMsg.presentToast('Cuenta deshabilitada!','top','');
        }

        //console.log(errorMessage);
        // Aquí puedes mostrar la alerta correspondiente utilizando una librería de alertas o creando tu propia implementación
      });
      if(res){
        const userCredential = res; // UserCredential object
        
        //Almacenar el token
        //const user = await userCredential.user  ; // Get the actual user object
        //const idToken = await user.getIdToken(); // Access the ID token
        //localStorage.setItem('tokenThub', idToken);

        this.router.navigate(['/main']);
      }
      else{
        console.log('Error => ', res);
      }
    } else{
      console.log("Email y/o contraseña invalida")

    }
    
  }

}
