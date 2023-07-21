import reducer from './reducer.js'
import {createStore} from './core.js'
const {attach,connect,dispatch} = createStore(reducer);
window.dispatch = dispatch;
export {
    attach,
    connect
}