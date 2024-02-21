import { Body, Controller, Delete, Get, Inject, Param, Post, Put , Headers} from "@nestjs/common";
import { Account, AccountInterop } from "../domain/account.domain";
import { FirestoreRepositoryService } from "./firestore-repository/firestore-repository.service";

@Controller('v1/account')
export class AccountController {
  constructor(@Inject('AccountInterop') private interop: AccountInterop,
            @Inject('FirestoreRepository')  private firebaseService: FirestoreRepositoryService) {
  }
  @Get('getAll')
  async getAllAccounts(){
    //how to get all accounts from firestore
    return this.firebaseService.getAll();
    // return this.interop.getAll('token');
  }
  @Get(':id')
  getAccount(@Headers() headers: any, @Param('id') id: string) {
    return this.firebaseService.getAccountById(id);
    // return this.interop.get(headers['authorization'], id);
  }
  @Post()
  async createAccount(@Headers() headers: any, @Body() account: Account) {
    let token = headers['authorization'];
    try {
      const createdAccount = await this.interop.create(token, account)
      await this.firebaseService.pushAccount(createdAccount);
      return createdAccount;
    } catch (error) {
      // Handle error appropriately
    }
    // return this.interop.create(token, account);
  }
  @Put()
  updateAccount(@Body() account: Account){
    return this.firebaseService.updateAccount(account);
    // return this.interop.update('token', account);
  }
  @Delete(':id')
  deleteAccount(@Param('id') id: string){
    return this.firebaseService.deleteAccount(id);
    // return this.interop.delete('token', id);
  }
  @Post('transfer')
  transferMoney(@Body() body: { from: string, to: string, amount: number}) {
    return this.firebaseService.transferMoney(body.from, body.to, body.amount);
    // return this.interop.transferMoney(body.from, body.to, body.amount);
  }
}
