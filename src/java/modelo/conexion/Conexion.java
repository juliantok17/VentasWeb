package modelo.conexion;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author Julian Tokonas
 */
public class Conexion {
    
    private static Conexion INSTANCE = null;
    
    private static String DRIVER = "com.mysql.jdbc.Driver";
    private static String DB = "ventas";
    private static String URL = "jdbc:mysql://localhost/" + DB;
    private static String USUARIO = "root";
    private static String PASSWORD = "";

    Connection con = null;
    
    public static Conexion getInstance() throws ClassNotFoundException, IOException, SQLException {
        if (INSTANCE == null) {
            INSTANCE = new Conexion();
        }
        return INSTANCE;
    }
    
    private Conexion() throws ClassNotFoundException,
            IOException, SQLException {
    }
   
    /** Permite retornar la conexión*/     
    public Connection getConnection() throws InstantiationException, ClassNotFoundException, IllegalAccessException, SQLException {
        Class.forName(DRIVER);
        con = DriverManager.getConnection(URL, USUARIO, PASSWORD);
        return con;
    }

    public void desconectar() throws SQLException, ClassNotFoundException {
        con.close();
    }
}
