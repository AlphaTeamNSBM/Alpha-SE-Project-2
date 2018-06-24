/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controllers;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("Stock")
public class StockResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of StockResource
     */
    public StockResource() {
    }

    /**
     * Retrieves representation of an instance of Controllers.StockResource
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    @GET
    @Path("sell")
    @Produces(MediaType.APPLICATION_JSON)
    public Response Sell(@QueryParam("stockTransactionId") int stockTransactionId, @QueryParam("qty") int qty, @QueryParam("sellingPrice") double sellingPrice, @QueryParam("turnId") int turnId, @QueryParam("bankAccoundId") int bankAccoundId) {
        StockService r = new StockService();
        r.SellItem(stockTransactionId, qty, sellingPrice, turnId, bankAccoundId);
        return Response.ok().header("Access-Control-Allow-Origin", "*").build();
    }

    @GET
    @Path("getCurrentTurn")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCurrentTurn() {
        StockService r = new StockService();
        return Response.ok(r.getCurrentTurn()).header("Access-Control-Allow-Origin", "*").build();
    }

    @GET
    @Path("buy")
    @Produces(MediaType.APPLICATION_JSON)
    public Response Buy(@QueryParam("stockId") int stockId, @QueryParam("qty") int qty, @QueryParam("turnId") int turnId, @QueryParam("bankAccoundId") int bankAccoundId) {
        StockService r = new StockService();
        r.BuyItem(qty, stockId, turnId, bankAccoundId);
        return Response.ok().header("Access-Control-Allow-Origin", "*").build();
    }

    @GET
    @Path("/GetBySectorId")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBySectorId(@QueryParam("sectorId") int sectorId) {
        StockService sr = new StockService();
        return Response.ok(sr.GetBySectorId(sectorId), MediaType.APPLICATION_JSON).header("Access-Control-Allow-Origin", "*").build();
    }

    @GET
    @Path("/GetSoldItem")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSoldItem(@QueryParam("bankId") int bankId, @QueryParam("bankId") int roundId) {
        StockService r = new StockService();
        return Response.ok(r.GetSellingItem(bankId), MediaType.APPLICATION_JSON).header("Access-Control-Allow-Origin", "*").build();
    }

    @GET
    @Path("History")
    @Produces(MediaType.APPLICATION_JSON)
    public Response GetHistory(@QueryParam("bankAccoundId") int bankAccoundId) {
        StockService r = new StockService();
        return Response.ok(r.GetHistory(bankAccoundId), MediaType.APPLICATION_JSON).header("Access-Control-Allow-Origin", "*").build();
    }

    /**
     * PUT method for updating or creating an instance of StockResource
     *
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
