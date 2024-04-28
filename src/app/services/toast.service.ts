import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) { }

  async presentToast(message: string, position: 'top' | 'bottom' | 'middle' = 'bottom',h?:string | undefined) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: position,
      animated: true,
      header: h,
      color: 'light'
    });
    toast.present();
  }
}