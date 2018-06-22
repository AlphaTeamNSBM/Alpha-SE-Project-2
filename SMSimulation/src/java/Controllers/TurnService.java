
package Controllers;

import Controllers.DB;
import Controllers.BankAccount;
import Controllers.Turn;


public class TurnService {

    public boolean Create(Turn vm) {
        boolean isSaved = true;
        try {
            String insertQry = "INSERT INTO Turn(Turn) values ('" + vm.Turn + "')";
            isSaved = DB.save(insertQry);
        } catch (Exception e) {
            isSaved = false;
            e.printStackTrace();
        }
        return isSaved;
    }
}
