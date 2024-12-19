import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.getToken();

        if (token) {
            request = request.clone({
                setHeaders: {
                    language: localStorage.getItem('language') || 'en',
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }

    private getToken(): string | null {
        return localStorage.getItem('_accessToken');
    }
}
