/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import javax.swing.JOptionPane;

public class DB {

    public static ResultSet res;
    public static Connection conec;

    public static Connection makeConnection() throws Exception {
        String url = "jdbc:sqlite:F:\\4th Year Lectures\\StockMarketSimulation\\StockMarketSimulation\\StockMarketSimulation.Api\\StockSimulation.db";
        Class.forName("org.sqlite.JDBC").newInstance();
        conec = (Connection) DriverManager.getConnection(url);
        return conec;
    }
    public static ResultSet fetch(String sql) {
        try {
            if (conec == null) {
                makeConnection();
            }

            res = (ResultSet) conec.createStatement().executeQuery(sql);

        } catch (Exception e) {
        } 
        return res;
    }

    public static boolean save(String sql) {
        boolean b = true;
        try {
            if (conec == null) {
                makeConnection();
            }
            conec.createStatement().executeUpdate(sql);
        } catch (Exception e) {
            b = false;
        } 
        return b;
    }

}
