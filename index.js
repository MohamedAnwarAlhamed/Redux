const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const BUY_CAKE = 'BUY_CAKE';
const BuyIceCream = 'BuyIceCream';

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
    }

function buyIceCream() {
    return {
        type: BuyIceCream,
        info: 'First redux action'
    }   
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}


const reducerCake = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

const reducerIceCreams = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case BuyIceCream: 
        return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default: return state
    }
}

const rootReducer = combineReducers({
    cake: reducerCake,
    iceCream: reducerIceCreams
})

const store = createStore(rootReducer);
console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();
