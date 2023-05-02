import axios from 'axios';

export const GET_HOLDINGS_BEGIN = "GET_HOLDINGS_BEGIN";
export const GET_HOLDINGS_SUCCESS = "GET_HOLDINGS_SUCCESS";
export const GET_HOLDINGS_FAILURE = "GET_HOLDINGS_FAILURE";
export const GET_COIN_MARKET_BEGIN = "GET_COIN_MARKET_BEGIN";
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS";
export const GET_COIN_MARKET_FAILURE = "GET_COIN_MARKET_FAILURE";

/** Data associe a mes possessions */

export const getHoldingsBegin = () => ({
    type: GET_HOLDINGS_BEGIN
})

export const getHoldingsSuccess = (myHoldings) => ({
    type: GET_HOLDINGS_SUCCESS,
    payload: { myHoldings }
})

export const getHoldingsFailure = (error) => ({
    type: GET_HOLDINGS_FAILURE,
    payload: { error }
})


export function getHoldings(
    holdings = [],
    currency = "usd",
    orderBy = "market_cap_desc",
    sparkline = true,
    priceChangePerc = "7d",
    perPage = 20,
    page = 1) {

    return dispatch => {

        dispatch(getHoldingsBegin());
        let ids = holdings.map((item) => { return item.id }).join(",");
        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;
        return axios({
            url: apiUrl,
            method: 'GET',
            header: {
                Accept: "application/json"
            }
        }).then((response) => {
            
            if (response.status == 200) {
               
                const myHoldings = response.data.map((item) => {
                    //Aller chercher les holdings existants 
                    let coin = holdings.find(a => a.id == item.id)
                    //Aller chercher la valeur du holdings d'il y a 7 jours 
                    let price7d = item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01)
                    return {
                        id: item.id,
                        symbol: item.symbol,
                        name: item.name,
                        image: item.image,
                        current_price: item.current_price,
                        qty: coin.qty,
                        total: coin.qty * item.current_price,
                        price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
                        holding_value_change_7d: (item.current_price - price7d) * coin.qty,
                        sparkline_in_7d: {
                            value: item.sparkline_in_7d.price.map((price) => { return price * coin.qty })
                        },
                        high24: item.high_24,
                        low24: item.low_24,
                        price_change_24h: item.price_change_24h,
                        price_change_percentage_24h: item.price_change_percentage_24h,
                        market_cap: item.market_cap,
                        market_cap_change_percentage_24h: item.market_cap_change_percentage_24h,

                    }

                });

                dispatch(getHoldingsSuccess(myHoldings))

            } else {
                dispatch(getHoldingsFailure(response.data))
            }
        }).catch((error) => dispatch(getHoldingsFailure(error)))

    }

}


/** data market  */

export const getCoinMarketBegin = () => ({
    type: GET_COIN_MARKET_BEGIN
})

export const getCoinMarketSuccess = (coins) => ({
    type: GET_COIN_MARKET_SUCCESS,
    payload: { coins }
})

export const getCoinMarketFailure = (error) => ({
    type: GET_COIN_MARKET_FAILURE,
    payload: { error }
})



export function getCoinMarket(
    currency = "usd",
    orderBy = "market_cap_desc",
    sparkline = true,
    priceChangePerc = "7d",
    perPage = 20,
    page = 1

) {
    return dispatch => {
        dispatch(getCoinMarketBegin())

        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`
        return axios({
            url: apiUrl,
            method: 'GET',
            header: {
                Accept: "application/json"
            }
        }).then((response) => {
            if (response.status == 200) {
           
                dispatch(getCoinMarketSuccess(response.data))
            } else {
                dispatch(getCoinMarketFailure(response.data))
            }
        }).catch((error) => dispatch(getCoinMarketFailure(error)))
    }

}
  /**
 CREATION D'UN REDUCER

 Necessite des dependances suivantes 
 npm v6.14.7, 
 react v16.13.1,
 react-native v0.63.2, 
 @react-navigation/native v5.7.3,
 @react-navigation/stack v5.9.0,
 redux v4.0.5,
 and react-redux v7.2.1.

 Definition:
 Un reducer est une fonction pure qui prend un etat precedent et une action comme argument et qui retour un nouvel etat 
 C'est tres utile pour garder une etat a jour dans l'ensemble d'une application 

 I-CREATION ACTIONS

 un objet action est un object qui decrit la facon dont on doit updater l'etat 
 Generalement, l'oblet action a une propriete type qui un string decrivant l'etat update dans lequel doit etre le reducer 
 
 On peut y ajouter des infos pour une meilleur utilisation par le reducer (aka payload)

 Ici
 On cree plusieures actions dont celle qui vise a obtenir l'information de notre api

 II-DISPATCH

 La fonction qui vise a retourner les informations de l'api est une fonction particuliere car elle retourne un element dispatch 
 C'est si la reponse de l'api est positive (response.status==200) que l'on aura les information d'interet
 Voir Home.js


 III- REDUCER
 Voir marketReducer.js

 
 IV- VUE D'ENSEMBLE
 À la suite d'un gestionnaire d'événements ou après avoir terminé une requête d'extraction, vous appelez la fonction dispatch avec l'objet action.
 Ensuite, React redirige l'objet d'action et la valeur d'état actuelle vers la fonction de réduction.
 La fonction de réduction utilise l'objet d'action et effectue une mise à jour d'état, renvoyant le nouvel état.
 React vérifie ensuite si le nouvel état diffère du précédent. Si l'état a été mis à jour, React rend à nouveau le composant et useReducer() renvoie la nouvelle valeur d'état


 */

 export function getCoinMarket2(
    currency = "usd",
    orderBy = "market_cap_desc",
    sparkline = true,
    priceChangePerc = "30d",
    perPage = 20,
    page = 1

) {
    return dispatch => {
        dispatch(getCoinMarketBegin())

        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`
        return axios({
            url: apiUrl,
            method: 'GET',
            header: {
                Accept: "application/json"
            }
        }).then((response) => {
            if (response.status == 200) {
            console.log(response)
                dispatch(getCoinMarketSuccess(response.data))
            } else {
                dispatch(getCoinMarketFailure(response.data))
            }
        }).catch((error) => dispatch(getCoinMarketFailure(error)))
    }

}