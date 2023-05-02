import { createContext, useEffect, useState, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    const sub = authUser?.attributes?.sub;
console.log(dbUser)
    useEffect(() => {
        Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
    }, []);
  // Ici on va chercher l'utilisateur qui utilise l'appli
  useEffect(() => {
    DataStore.query(User, (user) => user.sub("eq", sub)).then((users) =>
      setDbUser(users[0])
    );
  }, [sub]);
    // Ici on set le dbUser dans l'appli
// Des que sub de l'utilisateur change on doit aller le chercher dans la base de donnees
    return (
        <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser }}>
            {children}
        </AuthContext.Provider>
    );
}



export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
//Ce context permet d'aller chercher les infos de l'utilisateur sans avoir a produire trop de code annexe 
//Ceci est un custom Hoook qui permet d'exporter le provider d'une appli a l'autre 




/**
 Pour creer un context que l'on va pouvoir utiliser dans toute l'application 

 I-Creation Context 

 1- Importer createContext from 'react'
 2- Creation context : const OrderContext = createContext({}); ==>Ici on a une destructuration dans createContext({})
 3- Definition du context avec une fonction : const OrderContextProvider =()=>{} cette fonction aura des parametres qui sont les children
 4- Appel du context dans un element de return <OrderContext.provider value= {parametres attendus}> {children} </OrderContext.provider>
 5- Lors de la definition du context on definit tous les parametres qui seront ultimement utilises comme les children dans le cas  ci dessus on cherche a obtenir tous ce qui est apparente au order 
       ==> On va fetch l'order, les plats lies a un order specifique et on peut aussi ajouter des fonctions specifiques au Order 

 II-Utilisation du context 
  
 Pour donner acces au context ou on veut dans l'application (les differents Screens) il faut wrapper l'application dans le context 

  Dans App.js 
  1- On utilse un Hook export const useOrderContext = () => useContext(OrderContext); ==> Exporter le context (dernier ligne de code ici)
  2- importer contextProvider 
  3- <contextProvider> 
      <App/>
     </contextProvider>


 */