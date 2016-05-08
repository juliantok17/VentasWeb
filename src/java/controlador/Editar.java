/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Stream;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import modelo.dao.AvisosDAO;
import modelo.vo.AvisosVO;

/**
 *
 * @author Julián
 */
@WebServlet(name = "Editar", urlPatterns = {"/Editar"})
public class Editar extends HttpServlet {

    

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {        
        PrintWriter out = response.getWriter();
     try {
            
            
            String buscar = request.getReader().readLine();
            log(buscar);
            Gson convertir = new Gson();
            AvisosDAO respuesta = AvisosDAO.getInstance();
            if(buscar != null){
                out.println(convertir.toJson(respuesta.getBuscarAvisos(buscar)));
            }else{
                out.println(convertir.toJson(respuesta.getAllAvisos()));
            }
                
        } catch (ClassNotFoundException ex) {
            out.println("" + ex.getMessage());
        } catch (SQLException ex) {
            out.println("" + ex.getMessage());
        } catch (InstantiationException ex) {
            Logger.getLogger(AvisosControler.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(AvisosControler.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(Editar.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            out.close();
        }
    }
    

}
