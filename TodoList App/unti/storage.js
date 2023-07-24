const USERConfig = 'USER';
export default {
    getConfig(){
        return JSON.parse(localStorage.getItem(USERConfig)) || [];
    },
    setConfig(state){
        localStorage.setItem(USERConfig,JSON.stringify(state));
    },
}