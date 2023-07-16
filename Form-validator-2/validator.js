function Validator(selector){
    let formRules = {};
    let varlidatorRules = {
        required: function(text){
            return text ? undefined : "Vui lòng nhập vào trường này";
        },
        email: function(text){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
            return regex.test(text) ? undefined : "Vui lòng nhập email";
        },
        min: function(min){
            return function (text){
                return text.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
            }
        }
    };
    // Lấy ra form cần xử lý
    let FormElements = document.querySelector(selector);
    if(FormElements){
        let inputs = FormElements.querySelectorAll('[name][rules]');
        for(var input of inputs){
            var rules = input.getAttribute('rules').split('|');
            for(var rule of rules){
                var RuleFunc;
                if(rule.includes(':')){
                    var ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                    RuleFunc = varlidatorRules[rule](ruleInfo[1]);
                }
                else RuleFunc = varlidatorRules[rule];
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(RuleFunc);
                }
                else{
                    formRules[input.name] = [];
                    formRules[input.name].push(RuleFunc);
                }
            }


            // Lắng nghe sự kiện để validate
            input.onblur = HandleValidate;
        }
        function HandleValidate(e){
            let rules = formRules[e.target.name];
            let ErrorElement = e.target.parentElement.querySelector('.form-msg');
            for(let rule of rules){ 
                let textWarning = rule(e.target.value);
                if(textWarning){
                    ErrorElement.innerText = textWarning;
                    e.target.parentElement.classList.add('invalid');
                    return false;
                    break;
                }
                else{
                    ErrorElement.innerText = "";
                    e.target.parentElement.classList.remove('invalid');
                }
            }

        }
        // Xử lí khi submit form
        FormElements.onsubmit = function(e){
            e.preventDefault();
            let isValidSubmit = true;
            for(let input of inputs){
                var isValid = HandleValidate({target : input});
                if(isValid === false)   isValidSubmit = false;
            }
            if(isValidSubmit){
                let UserSubmitted = Array.from(FormElements.querySelectorAll('[name]'));
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
        }
    }
}