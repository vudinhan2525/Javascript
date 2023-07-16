function Validator(option){

    let selectorRules = {};

    function validate(InputForm,element){
        let ErrorElement = InputForm.parentElement.querySelector('.form-msg');
        let textWarning;
        let rules = selectorRules[element.selection];
        for(let i = 0;i < rules.length;i++){
            if(InputForm.type === "radio" || InputForm.type ==="checkbox"){
                textWarning = rules[i](Form.querySelector(element.selection + ':checked'));
            }
            else    textWarning = rules[i](InputForm.value);
            if(textWarning){
                ErrorElement.innerText = textWarning;
                InputForm.parentElement.classList.add('invalid');
                return false;
                break;
            }
            else{
                ErrorElement.innerText = "";
                InputForm.parentElement.classList.remove('invalid');
            }
        }
        return true;
    }
    
    let Form = document.querySelector(option.form);
    Form.onsubmit = function(e){
        e.preventDefault();
        let isValidSubmit = true;
        option.rule.forEach(element => {
            let InputForm = Form.querySelector(element.selection);
            var isValid = validate(InputForm,element);
            if(isValid == false)  isValidSubmit = false;
        });
        if(isValidSubmit){
            let UserSubmitted = Array.from(Form.querySelectorAll('[name]'));
            UserSubmitted = UserSubmitted.reduce((obj,cur)=>{
                if(cur.type == "radio" ){
                    if(cur.matches(':checked')) obj[cur.name] = cur.value;
                }
                else if(cur.type === "checkbox"){
                    if(!Array.isArray(obj[cur.name])){
                        obj[cur.name] = [];
                    }
                    if(cur.matches(':checked'))obj[cur.name].push(cur.value);
                }
                else if(cur.type === "file"){
                    obj[cur.name] = cur.files;
                }
                else    obj[cur.name] = cur.value;
                return obj;
            },{})
            console.log(UserSubmitted);
        }
    };

    // lặp qua mỗi rule và xử lý
    if(Form){
        option.rule.forEach(element => {

            if(Array.isArray(selectorRules[element.selection])){
                selectorRules[element.selection].push(element.check);
            }
            else{
                selectorRules[element.selection] = [element.check];
            }

            let InputForms = Form.querySelectorAll(element.selection);
            Array.from(InputForms).forEach((InputForm)=>{
                let ErrorElement = InputForm.parentElement.querySelector('.form-msg');
                InputForm.onblur = function(){
                    if(InputForm.value.trim() === "")   InputForm.value = "";
                    validate(InputForm,element);
                };
                // Bỏ msg lỗi khi ng dùng đang nhập
                InputForm.onclick = function(){
                ErrorElement.innerText = "";
                InputForm.parentElement.classList.remove('invalid');
            }
            })
        });
    }
}
Validator.isRequired = function(selection,customize){
    return {
        selection: selection,
        check: function(text){
            return text ? undefined : `Vui lòng nhập ${customize} đầy đủ`;
        }
    };
};
Validator.isEmail = function(selection){
    return {
        selection: selection,
        check: function(text){
                var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return regex.test(text) ? undefined : "Email nhập vào chưa chính xác";
        }
    };
}
Validator.isMinLength = function(selection,min,customize){
    return {
        selection: selection,
        check: function(text){
            return text.length >= min ? undefined : `${customize} của bạn phải chứa ít nhất ${min} ký tự`;
        }
    };
};
Validator.isSimilar = function(selection,value,customize){
    return {
        selection: selection,
        check: function(text){
            if(text.trim() === "") return "Vui lòng nhập lại mật khẩu";
            return (text === value()) ? undefined : `${customize} điền vào chưa được khớp`;
        }
    };
};