// import React, { useState } from 'react';
// import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
// import { useAuth } from '../context/AuthContext';
// import { auth } from '../firebaseConfig';
// import '../Css/Reauthenticate.css';

// interface ReauthenticateProps {
//   onReauthenticated: () => void;
// }

// const Reauthenticate: React.FC<ReauthenticateProps> = ({ onReauthenticated }) => {
//   const { currentUser } = useAuth();
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);

//   const handleReauthenticate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     if (currentUser && currentUser.email) {
//       const credential = EmailAuthProvider.credential(currentUser.email, password);
//       try {
//         await reauthenticateWithCredential(currentUser, credential);
//         onReauthenticated();
//       } catch (error) {
//         setError('Error al reautenticar: ' + (error as Error).message);
//       }
//     }
//   };

//   return (
//     <div className="reauthenticate">
//       <h2>Reautenticación</h2>
//       <form onSubmit={handleReauthenticate}>
//         <div className="form-group">
//           <label htmlFor="password">Contraseña actual:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Reautenticar</button>
//       </form>
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default Reauthenticate;

import React from "react";

function nombrefuncion() {
    return (
        <div> Hola mundo</div>
    )
}

export default nombrefuncion;