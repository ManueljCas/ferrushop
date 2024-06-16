import '../Css/Administrador.css';
import 'react-toastify/dist/ReactToastify.css';
import AgregarProducto from '../Components/AppComponent';
import { Link } from 'react-router-dom';
import AdministradorLogin from '../Components/AdminLoginComponent';
import AdminidtradorVerProductos from '../Components/AdminVerProductosComponent';

const Administrador = () => {
    // Inicializa las vistas de los diferentes componentes de administración
    const AgregarProductoView = AgregarProducto();
    const AdministradorLoginView = AdministradorLogin();
    const AdmintVerProducto = AdminidtradorVerProductos();

    return (
        <div className="admin-container">
            <h1>Ferrushop</h1>
            <h2>¿Qué queremos hacer hoy?</h2>
            <div className="admin-links">
                {/* Enlaces de navegación a las diferentes vistas de administración */}
                <Link to={`/${AgregarProductoView}`} className="admin-link">Agregar producto</Link>
                <Link to={`/${AdmintVerProducto}`} className="admin-link">Ver productos</Link>
                <Link to={`/${AdministradorLoginView}`} className="admin-link">Salir</Link>
            </div>
        </div>
    );
};

export default Administrador;
