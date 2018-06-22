/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controllers;

import Controllers.DB;
import Controllers.BankAccount;
import Controllers.Broker;
import java.sql.ResultSet;

public class BrokerService {

    public int Create(int BankAccountId) {
        ResultSet rs = null;
        try {
            String insertQry = "INSERT INTO Broker(BankAccountId) values ('" + BankAccountId + "')";
            DB.save(insertQry);

            String selectQry = "SELECT Id FROM Broker WHERE BankAccountId='" + BankAccountId + "'";
            rs = DB.fetch(selectQry);
            if (rs.next()) {
                return rs.getInt(1);
            }
            return 0;
        } catch (Exception e) {

            e.printStackTrace();
            return 0;
        }
    }
}
