import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from './models/login';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule , MatIconModule ]
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;

	constructor(private fb: FormBuilder , private router : Router , private loginService : LoginService) {}
  
	ngOnInit(): void {
	  // Initialize the form group with controls
	  this.loginForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]]
	  });
	}
  
	// Submit handler for the form
	onSubmit(): void {
		if(this.loginForm.invalid){
			return
		}
		let model: Login = {
			email: this.loginForm.get('email')?.value,
			password: this.loginForm.get('password')?.value,
			rememberMe : false
		};
		
		this.loginService.login(model).pipe(
			finalize(() => {})
		  ).subscribe(response => {
			if (response.code == 1) {
			  this.loginService.setUser(response.result.tokin);
			  this.router.navigate(['/dashboard'])
			  }
			  else{
				console.log('WRONG_EMAIL_OR_PASSWORD')
			  }
			}
		  )
	}
}
