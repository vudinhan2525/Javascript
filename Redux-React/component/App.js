import html from '../core.js'
import { connect } from '../store.js'
const connector = connect();
function App({cars}){
    return html`
        <h2>Car Lib</h2>
        <ul>
            ${cars.map((car) => `<li>${car}</li>`)}
        </ul>
        <button onclick = "dispatch('ADD','Porche')"> Add car </button>
    `
}
export default connector(App);