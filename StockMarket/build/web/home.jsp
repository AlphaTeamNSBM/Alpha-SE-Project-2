<%-- 
    Document   : home
    Created on : Jun 12, 2018, 1:20:54 AM
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
    <body>

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand mb-0 h1">Stock Market</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link">Account Balance -:</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Turns -: <span class="badge badge-success">10</span></a></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"><span class="badge badge-danger">10:00</span></a>
                    </li>
                </ul>
            </div>
        </nav>



        <div class="container">
            <div class="card text-center">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="bank-tab" data-toggle="tab" href="#bank_details" role="tab" aria-controls="bank_details" aria-selected="false">Bank Details</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="event-tab" data-toggle="tab" href="#event_show" role="tab" aria-controls="event_show" aria-selected="false">Event Show</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="buy-tab" data-toggle="tab" href="#buy_selling" role="tab" aria-controls="buy_selling" aria-selected="false">Buy/Sell History</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <nav class="navbar navbar-expand-lg navbar-light">


                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav mr-auto">

                                    <li class="nav-item">
                                        <form class="form-inline my-2 my-lg-0">
                                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                                            <button class="btn btn-outline-success my-3 my-sm-0" type="submit">Search</button>
                                        </form>
                                    </li>

                                    <li class="nav-item">
                                        <select class="form-control" name="" id="productname" style="margin-left: 10px">
                                            <option>Sector 1</option>
                                            <option>Sector 2</option>
                                            <option>Sector 3</option>
                                        </select>
                                    </li>

                                </ul>

                            </div>
                        </nav>
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Buy</th>
                                    <th scope="col">Sell</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Mark</td>
                                    <td>
                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                            Buy
                                        </button>
                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-success" data-dismiss="modal">Buy</button>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
                                            Sell
                                        </button>
                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-success" data-dismiss="modal">Sell</button>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">kkk</div>
                    <div class="tab-pane fade" id="bank_details" role="tabpanel" aria-labelledby="bank-tab">ddd</div>
                    <div class="tab-pane fade" id="event_show" role="tabpanel" aria-labelledby="event-tab">ddd</div>
                    <div class="tab-pane fade" id="buy_selling" role="tabpanel" aria-labelledby="buy-tab">ddd</div>
                </div>
            </div>


        </div>

    </body>
</html>
