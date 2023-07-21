let init = {
    cars:['BMW'],
}
export default function reducer(state = init,action,args){
    switch(action){
        case 'ADD':
            const [newcar] = args;
            return {
                ...state,
                cars:[...state.cars,newcar]
            }
            break;
        default:
            return state;
    }
}