import storage from './unti/storage.js'
const init = {
    todos:storage.getConfig(),
    filter: 'all',
    filters: {
        all(){
            return true;
        },
        active(todo){
            return !todo.completed;
        },
        completed(todo){
            return todo.completed === true ? true : false;
        },
    },
    editIndex: null,
};
var HandleAction = {
    ADD(state,args){
        if(args === "") return;
        state.todos.unshift({
            title:args,
            completed:false
        })
    },
    TOGGLE_COMPLETED(state,index){
        if(index === undefined) index = 0;
        state.todos[index].completed = !state.todos[index].completed;  
    },
    TOGGLE_COMPLETED_All(state,checked){
        for(let todo of state.todos){
            todo.completed = checked;
        }
    },
    DELETE(state,index){
        if(index === undefined) index = 0;
        state.todos.splice(index,1);
    },
    CHANGE_FILTER(state,newFilter){
        state.filter = newFilter;

    },
    CLEAR_COMPLETED(state){
        state.todos = state.todos.filter(state.filters.active);
    },
    EDITING(state,index){
        if(index === undefined) index = 0;
        state.editIndex = index;
    },
    SAVEEDIT(state,newTitle){
        if(state.editIndex !== null){
            if(newTitle.trim() === ''){
                state.todos.splice(state.editIndex,1);
            }
            else    state.todos[state.editIndex].title = newTitle;
            state.editIndex = null;
        }
    },
    CANCEL_EDIT(state){
        state.editIndex = null;
    }
};
export default function reducer(state = init,action,args){
    if(HandleAction[action]) {
        HandleAction[action](state,...args);
        storage.setConfig(state.todos); 
    }
    return state; 
}