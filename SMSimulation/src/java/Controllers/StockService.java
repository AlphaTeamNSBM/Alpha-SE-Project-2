/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controllers;

import Controllers.DB;
import Controllers.BankAccount;
import Controllers.Sector;
import Controllers.Stock;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class StockService {

    public boolean Create(Stock vm) {
        boolean isSaved = true;
        try {
            String insertQry = "INSERT INTO Stock(Name,CurrentPrice,CurrentValue,SectorId) values ('" + vm.Name + "','" + vm.CurrentPrice + "','" + vm.CurrentValue + "','" + vm.SectorId + "')";
            isSaved = DB.save(insertQry);
        } catch (Exception e) {
            isSaved = false;
            e.printStackTrace();
        }
        return isSaved;
    }

    public void SellItem(int stockTransactionId, int qty, double sellingPrice, int turnId, int bankAccoundId) {
        StockTransaction StockTransaction = new StockTransaction();
        ResultSet rs = null;
        try {
            String searchQry = "SELECT Id,Price,Type,TurnId, BankAccountId, StockId, Quantity FROM StockTransaction WHERE Id='" + stockTransactionId + "'";
            rs = DB.fetch(searchQry);
            while (rs.next()) {
                StockTransaction.Id = rs.getInt(1);
                StockTransaction.Price = rs.getDouble(2);
                StockTransaction.Type = rs.getInt(3);
                StockTransaction.TurnId = rs.getInt(4);
                StockTransaction.BankAccountId = rs.getInt(5);
                StockTransaction.StockId = rs.getInt(6);
                StockTransaction.Quantity = rs.getInt(7);
            }
            rs.close();
            String insertQry = "INSERT INTO StockTransaction(Price,Type,TurnId,BankAccountId,StockId,Quantity) VALUES ('" + sellingPrice + "','" + 1 + "','" + turnId + "','" + bankAccoundId + "','" + StockTransaction.StockId + "','" + qty + "')";
            Boolean isSaved = DB.save(insertQry);

            if (isSaved) {
                String updateQry = "UPDATE StockTransaction SET Quantity = '" + (StockTransaction.Quantity - qty) + "' WHERE Id = '" + stockTransactionId + "'";
                DB.save(updateQry);
            }

            double currentBalance = 0;
            String searchQry2 = "SELECT Balance FROM BankAccount WHERE Id='" + bankAccoundId + "'";
            rs = DB.fetch(searchQry2);
            while (rs.next()) {
                currentBalance = rs.getInt(1);
            }
            rs.close();

            String updateQry = "UPDATE BankAccount SET Balance = '" + (currentBalance + sellingPrice) + "' WHERE Id = '" + bankAccoundId + "'";
            DB.save(updateQry);

            String selectQry2 = "SELECT * FROM Turn where (select MAX(Id) from Turn)";
            rs = DB.fetch(selectQry2);
            int TurnId;
            int Turn = 0;
            while (rs.next()) {
                TurnId = rs.getInt(1);
                Turn = rs.getInt(2);
            }
            rs.close();
            if (Turn != 20) {
                String insertQry4 = "INSERT INTO Turn(Turn) values ('" + Turn + 1 + "')";
                DB.save(insertQry4);
            }

        } catch (Exception e) {

        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                }
            }
        }
    }

    public Turn getCurrentTurn() {
        ResultSet rs = null;
        Turn t = new Turn();
        try {

            String searchQry = "SELECT * FROM Turn WHERE Id=(SELECT MAX(Id) from Turn)";
            rs = DB.fetch(searchQry);
            while (rs.next()) {
                t.Id = rs.getInt(1);
                t.Turn = rs.getInt(2);
            }

        } catch (Exception e) {

        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                }
            }
        }

        return t;
    }

    public void BuyItem(int qty, int stockId, int turnId, int bankAccoundId) {
        ResultSet rs = null;
        try {
            double currentPrice = 0;
            String searchQry = "SELECT Id,CurrentPrice FROM Stock WHERE Id='" + stockId + "'";
            rs = DB.fetch(searchQry);
            while (rs.next()) {
                currentPrice = rs.getDouble(2);
            }
            rs.close();
            String insertQry = "INSERT INTO StockTransaction(Price,Type,TurnId,BankAccountId,StockId,Quantity) VALUES ('" + currentPrice + "','" + 2 + "','" + turnId + "','" + bankAccoundId + "','" + stockId + "','" + qty + "')";
            Boolean isSaved = DB.save(insertQry);

            double currentBalance = 0;
            String searchQry2 = "SELECT Balance FROM BankAccount WHERE Id='" + bankAccoundId + "'";
            rs = DB.fetch(searchQry2);
            while (rs.next()) {
                currentBalance = rs.getInt(1);
            }
            rs.close();

            String updateQry = "UPDATE BankAccount SET Balance = '" + (currentBalance + currentPrice) + "' WHERE Id = '" + bankAccoundId + "'";
            DB.save(updateQry);

            String selectQry2 = "SELECT * FROM Turn where (select MAX(Id) from Turn)";
            rs = DB.fetch(selectQry2);
            int TurnId = 0;
            int Turn = 0;
            while (rs.next()) {
                TurnId = rs.getInt(1);
                Turn = rs.getInt(2);
            }
            rs.close();
            if (Turn != 20) {
                String insertQry4 = "INSERT INTO Turn(Turn) values ('" + Turn + 1 + "')";
                DB.save(insertQry4);
            }

        } catch (Exception e) {

        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                }
            }
        }
    }

    public ArrayList<StockTransaction> GetSellingItem(int bankId) {
        ArrayList<StockTransaction> stockTransactionList = new ArrayList<StockTransaction>();
        ResultSet rs = null;
        try {
            String searchQry = "SELECT StockTransaction.Id,StockTransaction.Price,StockTransaction.Type,Turn.Turn,Stock.Name,Sector.Name, BankAccountId,Quantity,Stock.CurrentPrice FROM StockTransaction INNER JOIN Turn ON StockTransaction.TurnId=Turn.Id INNER JOIN Stock ON Stock.Id=StockTransaction.StockId INNER JOIN Sector ON Sector.Id=Stock.SectorId WHERE BankAccountId='" + bankId + "' AND Type= 2";
            rs = DB.fetch(searchQry);
            while (rs.next()) {
                StockTransaction StockTransaction = new StockTransaction();
                StockTransaction.Id = rs.getInt(1);
                StockTransaction.Price = rs.getDouble(2);
                StockTransaction.Type = rs.getInt(3);
                StockTransaction.TurnNo = rs.getInt(4);
                StockTransaction.StockName = rs.getString(5);
                StockTransaction.SectorName = rs.getString(6);
                StockTransaction.BankAccountName = rs.getString(7);
                StockTransaction.Quantity = rs.getInt(8);
                StockTransaction.CurrentPrice = rs.getInt(9);
                stockTransactionList.add(StockTransaction);
            }

        } catch (Exception e) {

        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                }
            }
        }

        return stockTransactionList;
    }

    public ArrayList<StockTransaction> GetHistory(int bankAccoundId) {
        ArrayList<StockTransaction> StockTransactionList = new ArrayList<StockTransaction>();
        ResultSet rs = null;
        try {
            double currentPrice = 0;
            String searchQry = "SELECT Stock.Name, StockTransaction.Type,StockTransaction.Quantity,StockTransaction.Price FROM StockTransaction Inner Join Stock ON Stock.Id = StockTransaction.StockId WHERE BankAccountId='" + bankAccoundId + "'";
            rs = DB.fetch(searchQry);
            while (rs.next()) {
                StockTransaction stockTransactionViewModel = new StockTransaction();
                stockTransactionViewModel.StockName = rs.getString(1);
                stockTransactionViewModel.Type = rs.getInt(2);
                stockTransactionViewModel.Quantity = rs.getInt(3);
                stockTransactionViewModel.Price = rs.getDouble(4);
                StockTransactionList.add(stockTransactionViewModel);
            }
            rs.close();

        } catch (Exception e) {

        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                }
            }
        }
        return StockTransactionList;
    }

    public List<Stock> GetBySectorId(int sectorId) {
        ArrayList<Stock> stockViewModelList = new ArrayList<Stock>();
        ResultSet rs = null;
        try {
            String selectQry = "SELECT Id,Name,CurrentValue,CurrentPrice FROM Stock WHERE SectorId='" + sectorId + "'";
            rs = DB.fetch(selectQry);
            while (rs.next()) {
                Stock stockViewModel = new Stock();
                stockViewModel.Id = rs.getInt(1);
                stockViewModel.Name = rs.getString(2);
                stockViewModel.CurrentValue = rs.getInt(3);
                stockViewModel.CurrentPrice = rs.getDouble(4);
                stockViewModelList.add(stockViewModel);
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
        return stockViewModelList;
    }

}
