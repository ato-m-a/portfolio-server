import { Routes } from 'nest-router';

/* modules */
import { V1Module } from './v1/v1.module';
import { AuthModule } from './v1/auth/auth.module';

export const routes: Routes = [
  {
    path: '/api/v1',
    module: V1Module,
    children: [
      {
        path: '/auth',
        module: AuthModule
      }
    ]
  }
]