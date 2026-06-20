import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    username = '';
    password = '';
    loading  = signal(false);
    error    = signal('');
    showPass = signal(false);

    constructor(private auth: AuthService, private router: Router) {}

    submit() {
        if (!this.username || !this.password) {
            this.error.set('Enter your username and password.');
            return;
        }
        this.loading.set(true);
        this.error.set('');
        this.auth.login(this.username, this.password).subscribe({
            next: () => this.router.navigate(['/tasks']),
            error: () => {
                this.error.set('Invalid credentials. Try admin / admin123.');
                this.loading.set(false);
            }
        });
    }
}