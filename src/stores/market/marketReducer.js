import * as marketActions from '../market/marketAction';

const initialState = {
    myHoldings: [],
    coins: [],
    error: null,
    loading: false,
}

const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case marketActions.GET_HOLDINGS_BEGIN:
            return {
                ...state,
                loading: true
            }
        case marketActions.GET_HOLDINGS_SUCCESS:
            return {
                ...state,
                myHoldings: action.payload.myHoldings,
            }
        case marketActions.GET_HOLDINGS_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        case marketActions.GET_COIN_MARKET_BEGIN:
            return {
                ...state,
                loading: true
            }
        case marketActions.GET_COIN_MARKET_SUCCESS:
            return {
                ...state,
                coins: action.payload.coins
            }

        case marketActions.GET_COIN_MARKET_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default marketReducer;


/**
 * 
   LE REDUCER 
   C'est une fonction pure qui accepte deux parametre 
     l'etat initial 
     les objets actions 

   En fonction de l'objet action, le reducer va updater l'etat de facon immuable et retourner un nouvel etat 
   React vérifie la différence entre le nouvel état et l'état actuel pour déterminer si l'état a été mis à jour, donc ne mute pas directement l'état actuel.

   Ici dans marketReducer :
   importer marketActions
   On cree un etat initial
   On definit comme vont etre updater l'etat en donction des actions 


   VUE D'ENSEMBLE
  
  À la suite d'un gestionnaire d'événements ou après avoir terminé une requête d'extraction, vous appelez la fonction dispatch avec l'objet action.
  Ensuite, React redirige l'objet d'action et la valeur d'état actuelle vers la fonction de réduction.
  La fonction de réduction utilise l'objet d'action et effectue une mise à jour d'état, renvoyant le nouvel état.
  React vérifie ensuite si le nouvel état diffère du précédent. Si l'état a été mis à jour, React rend à nouveau le composant et useReducer() renvoie la nouvelle valeur d'état

 */