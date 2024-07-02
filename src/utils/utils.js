import { v4 as uuidv4 } from 'uuid';

const nameFileUUID = (nombreArchivo) => {
    const [, extension] = nombreArchivo.split(".");
    const newUUID = uuidv4();
    const newName = `${newUUID}.${extension}`
    return newName;

}

export {
    nameFileUUID
}