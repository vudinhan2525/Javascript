import html from '../core.js'
import ToDoItem from '../component/ToDoItem.js';
import {connect} from '../store.js'

const connector = connect();
function TodoList({todos,filter,filters,editIndex}){
    if(todos.length == 0)   return '';
    return html`
        <section class="main">
        <input id="toggle-all" 
        onchange = "dispatch('TOGGLE_COMPLETED_All',this.checked)"
        ${todos.every(filters.completed) && 'checked'}
        class="toggle-all" type="checkbox"
        >
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            ${  todos.filter(filters[filter]).map((todo,index) => {
                    return ToDoItem({todo,editIndex},index);
                })
            }
        </ul>
    </section>
    `
}
export default connector(TodoList);