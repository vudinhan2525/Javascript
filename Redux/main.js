const $ = document.querySelector.bind(document);
const depositBtn = $('.deposit');
const withdrawBtn = $('.withdraw');
const output = $('.output');




//----------------------------------USING REDUX LIB------------------------------//
//import { createStore } from 'https://cdn.skypack.dev/redux';

//----------------------------------NOT USING REDUX LIB------------------------------//
function createStore(reducer){
    let state = 0;
    state = reducer(state,{});
    let subscribers = [];
    return {
        getState(){
            return state;
        },
        dispatch(obj){
            state = reducer(state,obj);
            subscribers.forEach(subscriber => subscriber());
        },
        subscribe(subscriber){
            subscribers.push(subscriber);
        },
    }
}


function reducer(state = 0,action){
    if(action.type === "DEPOSIT"){
        return state += action.payload;
    }
    else if(action.type === "WITHDRAW"){
        return (state - action.payload) < 0 ? 0 : (state -= action.payload);
    }
    else    return state;
}
const store = createStore(reducer);
function withdrawAction(cost){
    return {
        type:"WITHDRAW",
        payload:cost
    }
}
function depositAction(cost){
    return {
        type:"DEPOSIT",
        payload:cost
    }
}
depositBtn.onclick = function(){
    store.dispatch(depositAction(10));
}
withdrawBtn.onclick = function(){
    store.dispatch(withdrawAction(10));
}
store.subscribe(() => {
    render();
})
function render(){
    output.innerText = store.getState();
}
render();