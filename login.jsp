-----JSP-----

%-- 
    Document   : Login
    Created on : June 12, 2018, 22:36:03 PM
    Author     : Shashika
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <script>
            var forClear;
            function startTime() {
                forClear = setInterval("sendReg()", 3000);
            }
            function stopTime() {
                clearInterval(forClear);
            }
            function sendReg() {

                var xmlhttp;
                if (window.XMLHttpRequest) {//for other vertion
                    xmlhttp = new XMLHttpRequest();
                } else if (window.ActiveXObject) {//for old enternet explorer
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } else {
                    alert("Browser Doesnt Support Ajax!");
                }

                if (xmlhttp !== null) {

                    xmlhttp.onreadystatechange = function() {
                        //    alert(xmlhttp.readyState);
                        if (xmlhttp.readyState === 4) {
                            if (xmlhttp.status === 200) {
                                var res = xmlhttp.responseText;
                                var jsonText = JSON.parse(res);
                                var arr = jsonText.jarr;
                                //alert(jarr.length);

                                document.getElementById('ajaxdiv').innerHTML = "";

                                for (i = 0; i < arr.length; ++i) {
                                    var nic = arr[i].nic;
                                    var name = arr[i].name;
                                    var addr = arr[i].add;
                                    var img = arr[i].img;
                                    document.getElementById('ajaxdiv').innerHTML += nic + ' - ' + name + ' - ' + addr + ' - ' + img + "<br>";

                                }
                            }
                        }
                    }
                    xmlhttp.open("POST", "AjaxServerlet", true);
                    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xmlhttp.send(null);
                }
            }

            function loginToGame() {
                var uname = document.getElementById('uname');
                var pw = document.getElementById('pw');
                if (uname.value == '' || pw.value == '') {
                    alert('incurrt values');
                    return false;
                }
                if (uname.value != '' || pw.value != '') {
                    alert('ok');
                    return true;
                }
            }

        </script>


    </head>
    <body >
    <center>
        <tt>
            <br><br><br><br><br><br><br><br><br><br>
            <h1>LOG IN</h1>
            <form action="SingupS" method="GET">
                USERNAME : <input type="text" name="username"><br><br>
                PASSWORD : <input type="password" name="password"><br><br>
                <input  type="submit" value="SIGN UP">
            </form>
        </tt>
    </center>



</body>
</html>

-----JAVA CLASS-----

public class User {
    private int id;
    private String name;
    private double current_amount;

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the current_amount
     */
    public double getCurrent_amount() {
        return current_amount;
    }

    /**
     * @param current_amount the current_amount to set
     */
    public void setCurrent_amount(double current_amount) {
        this.current_amount = current_amount;
    }
}

-----JAVA CLASS-----
public class Bank {
    private int id;
    private String name;
    private double amount;

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the amount
     */
    public double getAmount() {
        return amount;
    }

    /**
     * @param amount the amount to set
     */
    public void setAmount(double amount) {
        this.amount = amount;
    }
}

