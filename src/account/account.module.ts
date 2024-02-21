import { Module } from '@nestjs/common';
import { BaseInteropService } from './base-interop/base-interop.service';
import { BaseUseCaseService } from './base-usecase/base-usecase.service';
import { FirestoreRepositoryService } from './firestore-repository/firestore-repository.service';
import { InMemRepositoryService } from './in-mem-repository/in-mem-repository.service';
import { AccountController } from './account.controller';
import { AuthModule } from "../auth/auth.module";


@Module({
  providers: [
    {
      provide: 'AccountRepository',
      useClass: InMemRepositoryService
    },
    {
      provide: 'AccountUseCase',
      useClass: BaseUseCaseService
    },
    {
      provide: 'AccountInterop',
      useClass: BaseInteropService
    },
    {
      provide: 'FirestoreRepository',
      useClass: FirestoreRepositoryService
    },


  ],
  controllers: [AccountController],
  exports: ['AccountInterop', 'AccountUseCase', 'AccountRepository','FirestoreRepository'],
  imports: [AuthModule],
})
export class AccountModule {

}
