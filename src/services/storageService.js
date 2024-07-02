import {ref, uploadBytes, getDownloadURL} from "firebase/storage"

import { storage } from "../config/firebase"
import { nameFileUUID } from "../utils/utils";

const uploadFile = async (imagen) => {
    try{
        const resName = nameFileUUID(imagen.name)
        const refArchivo = ref(storage, resName);
        const res = await uploadBytes(refArchivo, imagen)
        const urlArchivo = await getDownloadURL(refArchivo);
        return urlArchivo;
        
    }catch(error){
        console.log(error);
    }


}

export {
    uploadFile
}