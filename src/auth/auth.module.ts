import { Module } from '@nestjs/common';
import { FirebaseService } from './repository/firebase/firebase.service';
import { AuthBaseUsecaseService } from './auth-base-usecase/auth-base-usecase.service';

@Module({
  providers:[{
    provide: 'AuthRepository',
    useClass: FirebaseService
  },{
    provide: 'AuthBaseUsecaseService',
    useClass: AuthBaseUsecaseService
  }],
  exports:['AuthBaseUsecaseService', 'AuthRepository']
})
export class AuthModule {}
