<%-- 
    Document   : login
    Created on : Jun 12, 2018, 11:14:10 PM
    Author     : Ishara Jayasuriya
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link href="bootstrap//bootstrap.min.css" rel="stylesheet"/>
        <script src="bootstrap/jquery-3.3.1.js"></script>
        <script src="bootstrap//bootstrap.min.js"></script>
    </head>
    <body class="bg-dark">
        <div class="">
            <center>

                <div class="card" style="width: 25rem;margin-top: 50px">
                    <div class="card-header">
                        Login in to Your Account
                    </div>
                    <div class="card-body" style="margin-left: 60px">

                        <form action="login" method="post">


                            <div class="row">
                                <div class="col-sm-12 col-md-10  col-md-offset-1 ">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="glyphicon glyphicon-user"></i>
                                            </span> 
                                            <input type="text" name="email" placeholder="Email" class="form-control" autofocus required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="glyphicon glyphicon-lock"></i>
                                            </span>
                                            <input name="pass" autocomplete="off" class="form-control" placeholder="Password" type="password" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="checkbox" id="user_rememberme" name="user_rememberme" value="1" />
                                        <label for="user_rememberme"><small>Keep me logged in</small></label>
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" name="login" class="btn btn-primary btn-block" value="Sign in">
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div class="modal-footer">
                        <a href="#">Forgot Password?</a>
                        <a href="register.jsp">Register</a>
                    </div>
                </div>
            </center>
            <nav class="navbar fixed-bottom navbar-dark bg-dark">
                <lable class="navbar-item" style="color: #ffffff">Copyright 2018 - StockMarket.lk All rights reserved</lable>
            </nav>
        </div>
    </body>
</html>
