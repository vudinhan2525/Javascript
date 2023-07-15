const BtnSuccess = document.querySelector('.btn-success');
const BtnError = document.querySelector('.btn-error');
const ToastNoti = document.querySelector('.toast-noti');

var typeMessage ={
    success:{
        type:"success",
        icon:"<i class=\"ti-check-box icon-success\"></i>",
        title:"Success",
        description:"Bạn đã đăng kí thành công tài khoản tại F8!"
    },
    error:{ 
        type:"error",
        icon:"<i class=\"ti-close icon-error\"></i>",
        title:"Error",
        description:"Bạn chưa đăng kí thành công tài khoản F8!"
    }
};
ShowToast = function({type,icon,title,description}){
    const node = document.createElement("div");
    node.classList.add('toast');
    node.classList.add(`toast--${type}`);
    node.innerHTML = `
        <div class="toast-icon">
            ${icon}
        </div>
        <div class="toast-content">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
        <div class="toast-close">
            <i class="ti-close"></i>
        </div>
    `;
    ToastNoti.appendChild(node);
    node.onclick = function(e){
        if(e.target.closest('.toast-close')){
            ToastNoti.removeChild(node);
            clearTimeout(TimeToFade);
        }
    };
    var TimeToFade = setTimeout(()=>{
        ToastNoti.removeChild(node);
    },4000);
}
BtnSuccess.onclick = function(){
    ShowToast(typeMessage.success);
};
BtnError.onclick = function(){
    ShowToast(typeMessage.error);
}