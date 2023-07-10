const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var TabActive = $('.tab-element.active');
var LineActive = $('.tab-line');
LineActive.style.left = `${TabActive.offsetLeft}px`;
LineActive.style.width = `${TabActive.offsetWidth}px`;

const tabs = $$('.tab-element');
const panes = $$('.tab-pane');
for(let i = 0;i < tabs.length;i++){
    tabs[i].onclick = function() {
        var ActiveElement = $('.tab-element.active');
        var ActivePane = $('.tab-pane.active');
        ActiveElement.classList.remove('active');
        ActivePane.classList.remove('active');

        LineActive.style.left = `${tabs[i].offsetLeft}px`;
        LineActive.style.width = `${tabs[i].offsetWidth}px`;

        panes[i].classList.add('active');
        tabs[i].classList.add('active');
    }
}
