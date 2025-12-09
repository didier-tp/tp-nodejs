import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';


@Injectable()
export class TransferService {

    constructor(private accountService : AccountService ) {}
    
     async doTransfer(amount:number , debitAccountNumber: number, creditAccountNumber: number){
        await this.accountService.doDebit(debitAccountNumber,amount,"debit suite virement vers compte num="+creditAccountNumber);
        await this.accountService.doCredit(creditAccountNumber,amount,"credit suite virement depuis compte num="+debitAccountNumber);
     }

}
