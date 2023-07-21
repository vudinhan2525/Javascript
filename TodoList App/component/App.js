import html from '../core.js'
import Header from '../component/Header.js'
import ToDoList from '../component/TodoList.js'
import Footer from './Footer.js'


function App(){
    return html`
    <section class="todoapp">
        ${Header()}
        ${ToDoList()}
        ${Footer()}
    </section>
    `
}
export default App;