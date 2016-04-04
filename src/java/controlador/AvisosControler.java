package controlador;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modelo.dao.AvisosDAO;
import modelo.vo.AvisosVO;

/**
 *
 * @author Julián Tokonas
 */
@WebServlet(name = "AvisosControler", urlPatterns = {"/AvisosControler"})
public class AvisosControler extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            Gson gson = new Gson();
            AvisosDAO allAvi = AvisosDAO.getInstance(); // Patron singleton
            out.println(gson.toJson(allAvi.getAllAvisos()));
        } catch (ClassNotFoundException ex) {
            out.println("" + ex.getMessage());
        } catch (SQLException ex) {
            out.println("" + ex.getMessage());
        } catch (InstantiationException ex) {
            Logger.getLogger(AvisosControler.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(AvisosControler.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            out.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            
            Gson convertir = new Gson();
            String texto = request.getReader().readLine();
            AvisosVO avisoParametro = convertir.fromJson(texto, AvisosVO.class);
            AvisosDAO.altaAviso(avisoParametro);
            out.println(convertir.toJson("Aviso guardado correctamente"));

        } catch (ClassNotFoundException ex) {
            out.println("" + ex.getMessage());
        } catch (SQLException ex) {
            out.println("" + ex.getMessage());
        } catch (InstantiationException ex) {
            Logger.getLogger(AvisosControler.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(AvisosControler.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            out.close();
        }
    }
    
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        log("CONTROL UPDATE 1");
        try {
            log("CONTROL UPDATE 2");
            Gson convertir = new Gson();
            AvisosVO avisoParametro = convertir.fromJson(request.getReader(), AvisosVO.class);
            AvisosDAO.modificarAviso(avisoParametro);
            out.println(convertir.toJson("OK"));
            log("CONTROL UPDATE 3");
        } catch (ClassNotFoundException ex) {
            out.println("" + ex.getMessage());
        } catch (SQLException ex) {
            out.println("" + ex.getMessage());
        } catch (InstantiationException ex) {
            Logger.getLogger(AvisosControler.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(AvisosControler.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            out.close();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        log("CONTROL DELETE 1");
        response.setContentType("text/html;charset=UTF-8");
        log("CONTROL DELETE 2");
        PrintWriter out = response.getWriter();  
        log("CONTROL DELETE 3");
        try {   
            log("CONTROL DELETE 4");
            Gson convertir = new Gson();
            log("CONTROL DELETE 5");
            AvisosVO avisoParametro = convertir.fromJson(request.getReader(), AvisosVO.class);
            log("CONTROL DELETE 6");            
            AvisosDAO.bajaAviso(avisoParametro);
            out.println(convertir.toJson("Aviso eliminado correctamente"));

        } catch (ClassNotFoundException ex) {            
            out.println("" + ex.getMessage());
        } catch (SQLException ex) {            
            out.println("" + ex.getMessage());
        } catch (InstantiationException ex) {            
            Logger.getLogger(AvisosControler.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {            
            Logger.getLogger(AvisosControler.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            out.close();
        }

    }
}
