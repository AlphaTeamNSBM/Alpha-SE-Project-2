/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controllers;

import Controllers.DB;
import Controllers.BankAccount;
import Controllers.BankTransaction;

public class BankTransactionService {

    public boolean Create(BankTransaction vm) {
        boolean isSaved = true;
        try {
            String insertQry = "INSERT INTO BankTransaction(Type,Amount,BankAccountId) values ('" + vm.Type + "','" + vm.Amount + "','" + vm.BankAccountid + "')";
            isSaved = DB.save(insertQry);
        } catch (Exception e) {
            isSaved = false;
            e.printStackTrace();
        }
        return isSaved;
    }

}
