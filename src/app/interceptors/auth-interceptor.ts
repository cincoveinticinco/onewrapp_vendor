import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if(req.url.includes('amazonaws')){
        return next.handle(req);
      }

      const token = localStorage.getItem('id_token');
      if(token){
        const cloned = req.clone({
          headers: req.headers.set("Authorization", token)
        });

        return next.handle(cloned);
      }else{
        return next.handle(req);
      }
  }
}
