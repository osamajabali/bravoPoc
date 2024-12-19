import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../app/services/login.service';


export const authGuard: CanActivateFn = () => {
  const authService: LoginService = inject(LoginService);
  const router: Router = inject(Router);
  if (!authService.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};