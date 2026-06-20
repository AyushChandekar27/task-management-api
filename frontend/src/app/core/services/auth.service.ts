import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

interface LoginResponse {
    token: string;
    username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly API = 'http://localhost:8080/api/auth';
    private readonly TOKEN_KEY = 'tf_token';
    private readonly USER_KEY  = 'tf_user';

    isLoggedIn = signal(!!localStorage.getItem(this.TOKEN_KEY));
    username   = signal(localStorage.getItem(this.USER_KEY) ?? '');

    constructor(private http: HttpClient, private router: Router) {}

    login(username: string, password: string) {
        return this.http.post<LoginResponse>(`${this.API}/login`, { username, password }).pipe(
            tap(res => {
                localStorage.setItem(this.TOKEN_KEY, res.token);
                localStorage.setItem(this.USER_KEY,  res.username);
                this.isLoggedIn.set(true);
                this.username.set(res.username);
            })
        );
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        this.isLoggedIn.set(false);
        this.username.set('');
        this.router.navigate(['/login']);
    }

    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    }
}