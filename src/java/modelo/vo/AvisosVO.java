package modelo.vo;

/**
 *
 * @author Julian Tokonas 
 * 
 */
public class AvisosVO {
    private Integer idAvisos;
    private String nombreAvisos;
    private String descripcionAvisos;
    private Double precioAvisos; 
    
    
     /**
     * @return the idAvisos
     */
    public Integer getIdAvisos() {
        return idAvisos;
    }

    /**
     * @param idAvisos the idAvisos to set
     */
    public void setIdAvisos(Integer idAvi) {
        idAvisos = idAvi;
    }

    /**
     * @return the nombreAvisos
     */
    public String getNombreAvisos() {
        return nombreAvisos;
    }

    /**
     * @param nombreAvisos the nombreAvisos to set
     */
    public void setNombreAvisos(String nomAvi) {
        nombreAvisos = nomAvi;
    }

    /**
     * @return the precioAvisos
     */
    public Double getPrecioAvisos() {
        return precioAvisos;
    }

    /**
     * @param precioAvisos the precioAvisos to set
     */
    public void setPrecioAvisos(Double preAvi) {
        precioAvisos = preAvi;
    }

    /**
     * @return the descripcionAvisos
     */
    public String getDescripcionAvisos() {
        return descripcionAvisos;
    }

    /**
     * @param descripcionAvisos the descripcionAvisos to set
     */
    public void setDescripcionAvisos(String desAvi) {
        this.descripcionAvisos = desAvi;
    }
    
    
}
