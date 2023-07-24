import html from '../core.js'
function ToDoItem({ todo,editIndex },index){
    var Complete = "";
    var Checked = "";
    if(todo.completed === true) {
        Checked = 'checked';
        Complete = 'completed';
    }
    return html`
        <li class="${Complete} ${editIndex === index && 'editing'}">
        <div class="view">
            <input onchange="dispatch('TOGGLE_COMPLETED',${index})" class="toggle" type="checkbox" ${Checked}>
            <label ondblclick = "dispatch('EDITING',${index})">${todo.title}</label>
            <button class="destroy" onclick = "dispatch('DELETE',${index})"></button>
        </div>
        <input class="edit" 
            onkeyup = "event.keyCode === 13 && dispatch('SAVEEDIT',this.value.trim()) || event.keyCode === 27 && dispatch('CANCEL_EDIT')"
            onblur = "dispatch('SAVEEDIT',this.value.trim())"
            value="${todo.title}">
        </li>
    `
}
export default ToDoItem;