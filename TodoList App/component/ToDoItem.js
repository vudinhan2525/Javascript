import html from '../core.js'
function ToDoItem({ todo }){
    var Complete = "";
    var Checked = "";
    if(todo.completed === true) {
        Checked = 'checked';
        Complete = 'completed';
    }
    return html`
        <li class="${Complete}">
        <div class="view">
            <input class="toggle" type="checkbox" ${Checked}>
            <label>${todo.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.title}">
        </li>
    `
}
export default ToDoItem;