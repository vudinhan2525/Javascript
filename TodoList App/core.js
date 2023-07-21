export default function html([first,...strings],...values){
    return values.reduce((acc,cur) => {
        return acc.concat(cur).concat(strings.shift());
    },[first])
    .filter(temp => {
        return temp && temp !== true && temp !== 0;
    })
    .join('');
}
export function createStore(reducer){
    let state = reducer();
    const roots = new Map();
    
    function render(){
        for(let [root,component] of roots){
            let output = component();
            root.innerHTML = output;
        }
    }

    return {
        attach(component,root){
            roots.set(root,component);
            render();
        },
        connect(selector = state => state){
            return (component) => {
                return (props,...args) =>{ 
                    return component(Object.assign({},props,selector(state),...args));
                }
            }
        },
        dispatch(action,...args){
            state = reducer(state,action,args);
            render();
        },
    }
}