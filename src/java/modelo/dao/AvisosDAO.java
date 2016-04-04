/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo.dao;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import modelo.conexion.Conexion;
import modelo.vo.AvisosVO;

/**
 *
 * @author Julián Tokonas
 */
public class AvisosDAO {
    
    private static AvisosDAO INSTANCE = new AvisosDAO(); //Patron singleton
    
    private AvisosDAO() {} //Patron singleton, constructor privado
    
    public static AvisosDAO getInstance() throws ClassNotFoundException, IOException, SQLException{ //patron singleton
        if (INSTANCE == null) {
            INSTANCE = new AvisosDAO();
        }
        return INSTANCE;
    }
            
    public static void altaAviso(AvisosVO miAviso) throws IOException, InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
        
        Connection conn = Conexion.getInstance().getConnection();

        try {
            
            Statement statement = conn.createStatement();
            statement.executeUpdate("INSERT INTO avisos (pro_nom, pro_pre, pro_des ) VALUES ('"                    
                    + miAviso.getNombreAvisos() + "','"
                    + miAviso.getPrecioAvisos() + "','"
                    + miAviso.getDescripcionAvisos() + "')");
                    
            statement.close();
            conn.close();//Conexion.getInstance().desconectar();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public static void bajaAviso(AvisosVO a) throws IOException, ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        Connection c = null;
        PreparedStatement ptsmt = null;
        //Connection conn = Conexion.getInstance().getConnection();
        try {
            c = Conexion.getInstance().getConnection();
            ptsmt = c.prepareStatement("DELETE FROM avisos WHERE pro_id = ?;");
            ptsmt.setInt(1, a.getIdAvisos());
            ptsmt.execute();           

        } finally {
            try {
                ptsmt.close();
            } finally {
                c.close();
            }
        }
    }

    public static void modificarAviso(AvisosVO miAviso) throws IOException, ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {

        Connection conn = Conexion.getInstance().getConnection();

        try {
            String consulta = "UPDATE avisos SET pro_nom = ? , pro_des = ? , pro_pre = ? WHERE pro_id = ?";
            PreparedStatement statement = conn.prepareStatement(consulta);
            
            statement.setString(1, miAviso.getNombreAvisos());
            statement.setString(2, miAviso.getDescripcionAvisos());
            statement.setDouble(3, miAviso.getPrecioAvisos());
            statement.setInt(4, miAviso.getIdAvisos());
            
            statement.executeUpdate();
           
            statement.close();
            Conexion.getInstance().desconectar();
            
        } catch (SQLException e) {
            System.out.println(e);            
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(AvisosDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public ArrayList<AvisosVO> getAllAvisos() throws IOException, ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        Connection conn = Conexion.getInstance().getConnection();      
        ArrayList<AvisosVO> avisoList = new ArrayList<AvisosVO>();
        
        try {
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("select pro_id, pro_nom, pro_pre, pro_des from avisos");
            
            while (rs.next()) { 
                AvisosVO miAviso = new AvisosVO();
                miAviso.setIdAvisos(rs.getInt("pro_id"));
                miAviso.setNombreAvisos(rs.getString("pro_nom"));
                miAviso.setPrecioAvisos(rs.getDouble("pro_pre"));
                miAviso.setDescripcionAvisos(rs.getString("pro_des"));
                avisoList.add(miAviso);                
            }         
            
            statement.close();
            conn.close();//Conexion.getInstance().desconectar();
            
        } catch (SQLException e) {
            e.printStackTrace();            
        }

        return avisoList;
    }

    
    public static void main ( String args [ ] ) throws IOException, ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {
        AvisosVO vo = new AvisosVO();
        AvisosDAO dao = AvisosDAO.getInstance();
        vo.setIdAvisos(1307);
        vo.setNombreAvisos("Julian");
        vo.setDescripcionAvisos("aklsjahd");
        vo.setPrecioAvisos(17.00);
        System.out.println(vo.getNombreAvisos());
                    System.out.println(vo.getPrecioAvisos());
                    System.out.println(vo.getDescripcionAvisos());
        
        dao.bajaAviso(vo);
        
    }
    
    
}
