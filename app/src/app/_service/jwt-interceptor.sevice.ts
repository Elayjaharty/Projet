import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthentificationService } from './authentification.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


//@Injectable()
//export class RefreshJwtInterceptor implements HttpInterceptor {

    //constructor (public auth: AuthentificationService) {}

        //intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            //return next.handle(request)
                //.pipe(catchError(error => {
                //return Observable.throw (error);
                //})); 

    //}

//}
