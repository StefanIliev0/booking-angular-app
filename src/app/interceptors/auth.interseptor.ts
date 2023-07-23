import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Observable,catchError } from "rxjs";
import { User } from "../types/User";
import { selectIsAuth, selectUser } from "../store/user.selectors";
import { Injectable, Provider } from "@angular/core";
import { ErrActions } from "../store/err.actions";
import { BASIC_URI } from "../constants";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    user : User | {} = {} ;
    isAuth : boolean  = false;

    constructor(private store : Store<{user : User , err : string}>){
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.store.select(selectUser).subscribe(res =>  {
            this.user = res; 
        })  
        this.store.select(selectIsAuth).subscribe(res => {
            this.isAuth = res; 
        })
        let request = req; 
        if(this.isAuth && req.url.startsWith(BASIC_URI)){
            this.store.dispatch(ErrActions.remove());
            const accessToken = (this.user as User).accessToken ;
            
            request = req.clone ({
                headers : req.headers.set("accessToken", accessToken)
        })}
      return  next.handle(request).pipe(
        catchError((err) => {
            this.store.dispatch(ErrActions.add({ err : err.error.error})); 
            console.log(err.error.error);
          return [err];
        })
      )
    }
}

export const authInterseptorProvider:Provider = {
    provide : HTTP_INTERCEPTORS ,
    multi : true , 
    useClass : AuthInterceptor,
} 
