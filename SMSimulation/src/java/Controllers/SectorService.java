/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controllers;

import Controllers.DB;
import Controllers.BankAccount;
import Controllers.Sector;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SectorService {

    public boolean Create(Sector vm) {
        boolean isSaved = true;
        try {
            String insertQry = "INSERT INTO Sector(Name,CurrentValue,CurrentPrice) values ('" + vm.Name + "','" + vm.CurrentValue + "','" + vm.CurrentPrice + "')";
            isSaved = DB.save(insertQry);
        } catch (Exception e) {
            isSaved = false;
            e.printStackTrace();
        }
        return isSaved;
    }

    public List<Sector> GetAllSectors() {
        ArrayList<Sector> sectorViewModelList = new ArrayList<Sector>();
        ResultSet rs = null;
        try {
            String selectQry = "SELECT Id,Name,CurrentValue,CurrentPrice FROM Sector";
            rs = DB.fetch(selectQry);
            while (rs.next()) {
                Sector sectorViewModel = new Sector();
                sectorViewModel.Id = rs.getInt(1);
                sectorViewModel.Name = rs.getString(2);
                sectorViewModel.CurrentValue = rs.getInt(3);
                sectorViewModel.CurrentPrice = rs.getDouble(4);
                sectorViewModelList.add(sectorViewModel);
            }

        } catch (Exception e) {

            e.printStackTrace();
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                  
                }
            }
        }
        return sectorViewModelList;
    }
}
