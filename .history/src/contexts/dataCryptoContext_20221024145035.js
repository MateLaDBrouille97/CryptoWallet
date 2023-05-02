
import { User, DataCrypto, Holding } from "../models";
import { useAuthContext } from "../contexts/AuthContext";
import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { Auth, DataStore } from "aws-amplify";

const CryptoContext = createContext({});

const CryptoContextProvider = ({ children }) => {

    const { dbUser, userName, authUser } = useAuthContext();
    const [dataCrypto, setDataCrypto] = useState();
    const [holdings,setHoldings] =useState();
console.log(dataCrypto)

    useEffect(() => {
        DataStore.query(DataCrypto, (dc) => dc.User("eq", dbUser)).then((dataC) =>
            setDataCrypto(dataC[0]));
    }, [dbUser]);

    useEffect (()=>{
        DataStore.query(Holding,(h)=>h.datacryptoID("eq", dataCrypto.id)).then((Holdings)=>setHoldings(Holdings))
    },[dbUser])


    useEffect(() => { 
   
            addDataCrypto();     
     }, [dbUser])


    const createDataC = async () => {
        try {
            const dc = await DataStore.save(
                new DataCrypto({
                    User: dbUser,
                })
            );
            setDataCrypto(dc);
        } catch (e) {
            Alert.alert("Error", e.message);
        }
    };


    const updateDataCrypto = async () => {
        try {
          const dataC = await DataStore.save(
             DataCrypto.copyOf(dataCrypto, updated => {
              updated.User = dbUser;
              updated.Holdings = holdings;
              // updated.address = address;
              // updated.lat = coordinates.lat;
              // updated.lng = coordinates.lng;
            //   updated.sub = dbUser?.sub;
            })
          );
          setDataCrypto(dataC);
        }
        catch (e) {
          Alert.alert("Error", e.message);
        }
      };

    const addDataCrypto = async () => {
        if(dbUser){
          await updateDataCrypto();
        }else{
        await createDataC();
        }
    }


    return (
        <CryptoContext.Provider value={{
            dataCrypto,
            setDataCrypto,
        }}>
            {children}
        </CryptoContext.Provider>
    );
}

export default CryptoContextProvider;

export const useCryptoContext = () => useContext(CryptoContext);