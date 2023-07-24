import html from '../core.js'
import {connect} from '../store.js'
const connector = connect();
function Footer({todos,filter,filters}){
    if(todos.length === 0 ) return '';
    return html`
    <footer class="footer">
        <span class="todo-count"><strong>${
            String(todos.filter(filters.active).length)
        }</strong> item left</span>
        <ul class="filters">${
            Object.keys(filters).map((type)=>{
                return html`
                    <li>
                    <a class="${filter === type && 'selected'}" href="#" onclick = "dispatch('CHANGE_FILTER','${type}')">
                        ${type[0].toUpperCase() + type.slice(1)}
                        </a>
                    </li>
                `
        })}</ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" ${todos.every(filters.active) && 'style = "display:none"'}
            onclick = "dispatch('CLEAR_COMPLETED')"
        >Clear completed</button>
    </footer>
    `
}
export default connector(Footer);