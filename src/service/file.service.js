import axios from "axios";
import {FileUplaodUrl} from '../config/server'
const fileUpload =async({file , token})=>{
    let files = file[0];
    console.log(files);
    let fileName = files.path ; 
    // fileName = fileName.replace(/\s/g,'_');
    console.log(fileName);
    // let filetype = files.type;  
    let url = FileUplaodUrl;
    var formData = new FormData();
    formData.append('file' , files)
 return await  await axios.post(url , formData,{headers:{
  'Content-Type': 'multipart/form-data' , 
  'Authorization':token
}}).then(async result=>{
    return result.data
  }).catch(err=>{
    console.log(err);
    return null
  });
}
export {fileUpload}