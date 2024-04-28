import { flag } from "ionicons/icons";
import { inject } from '@angular/core';
import { LoginService } from "../services/login.service";
import { FirestoreService } from '../services/firestore.service';
import { UserModel } from "../models/user.model";
import { ActivatedRouteSnapshot } from "@angular/router";
import { firstValueFrom } from "rxjs";

let currentRoutePath: string | undefined; // Variable para almacenar la ruta actual

export const loginGuard = (route: ActivatedRouteSnapshot) => {
  
    currentRoutePath = route.url.join('/');
    const loginUserService = inject(LoginService);
    const FSservices = inject(FirestoreService);

    return new Promise((resolve, reject) => {
      loginUserService.checkAuthState.subscribe(async (res) => {
        if (res) {
          // Verifica si el usuario esta logeado in (res.uid exists)
          if (res.uid) {
            //busca el rol del usuario con la funcion getUserData 
            const tipoUsr = await getUserData(res.uid, FSservices);

            if (checkRole(tipoUsr,currentRoutePath)){
                resolve(true);
            }else{
                resolve(false);
            }
            
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      });
    });
};

const getUserData = async (uid: string, FSservices: FirestoreService): Promise<string> => {
    const path = "users";
    try {
        const res = await firstValueFrom(FSservices.getData<UserModel>(path, uid));
        if (res.user_type) {
            return res.user_type;
        } else {
            return ''; // En caso de que no se encuentren datos
        }
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        return ''; // En caso de error
    }
}

let checkRole = (tipoUr: string | undefined, path: string | undefined): boolean => {
    switch (path) {
        case 'main':
        case 'project':
        case 'infor':
        case 'admincontact':
            return true;
        case 'dashboard':
        case 'invoices':
            return tipoUr === 'Admin';
        case 'leads':
            return tipoUr === 'Admin' || tipoUr === 'Asistente' || tipoUr === 'Profesor';
        case 'settings':
        case 'user':
        case 'Role':
        case 'city':
        case 'country':
        case 'managerequests':
            return tipoUr === 'Admin' || tipoUr === 'Asistente';
        default:
            return false;
    }
};


// if (localStorage.getItem('tokenThub')){
//     return true;
// }else{
//     return false;
// }