import Toastify from 'toastify-js'
const showAlert = ({msg})=>{
    Toastify({
        text: msg,
        duration: 3000
        }).showToast();
}
export default showAlert
