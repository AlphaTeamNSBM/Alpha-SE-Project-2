
package Controllers;

import java.util.Set;
import javax.ws.rs.core.Application;

@javax.ws.rs.ApplicationPath("api")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(Controllers.BankAccountResource.class);
        resources.add(Controllers.BrokerResource.class);
        resources.add(Controllers.SectorResource.class);
        resources.add(Controllers.StockResource.class);
    }
    
}
