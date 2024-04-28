import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Product,ZproductService } from '../../services/zproduct.service';
import { addIcons } from 'ionicons';
import { logOut} from 'ionicons/icons';

@Component({
  selector: 'app-zproduct-list',
  templateUrl: './zproduct-list.page.html',
  styleUrls: ['./zproduct-list.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule]
})
export class ZproductListPage implements OnInit {
  router = inject(Router)
  loginServices = inject(LoginService);

  products: Product[] = [];
  productservice = inject(ZproductService)

  constructor() { 
    addIcons({
      logOut
    });
  }
  
  async ngOnInit() {
    const response = await this.productservice.getall()
    this.products = response.results;
  }

  cerrarSession(){
    this.loginServices.logout();
    this.router.navigate(['/login']);
  }

}
