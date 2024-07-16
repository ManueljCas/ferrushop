import React from 'react';
import '../Css/OrdenCompleta.css';
import Footer from './FooterView';
import Header from './HeaderView';
import Grid from '@material-ui/core/Grid';

interface OrdenCompletaViewProps {
  onContinueShopping: () => void;
}

const OrdenCompletaView: React.FC<OrdenCompletaViewProps> = ({ onContinueShopping }) => {
  return (
    <div className="order-completed-container">
      <Header />

      <main className="main-content">
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12} md={8} className="order-status">
            <Grid container justifyContent="center" alignItems="center" spacing={3}>
              <Grid item xs={12} className="icon-container">
                <div className="icon">🕒</div>
              </Grid>
              <Grid item xs={12}>
                <h1>Your Order Is Completed!</h1>
              </Grid>
              <Grid item xs={12}>
                <p>
                  Tu orden ha sido completada, por favor envia tus datos de compra al siguiente correo, 
                  <div className='correo'><h1>sistemas@ferru.com.mx.</h1></div>
                  Incluir datos de contacto como numero de telefono, nombre completo y tu ticket de compra.
                </p>
              </Grid>
              <Grid item xs={12}>
                <button className="continue-shopping-btn" onClick={onContinueShopping}>Continue Shopping</button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>

      <Footer />
    </div>
  );
};

export default OrdenCompletaView;
