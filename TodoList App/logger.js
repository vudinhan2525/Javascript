export default function logger(reducer){
    return (prevState,action,args) => {
        console.group();
        console.log('prevState',prevState);
        console.log('Action',action);
        const nextState = reducer(prevState,action,args);
        console.log('nextState',nextState);
        console.groupEnd();
        return nextState;

    };
}