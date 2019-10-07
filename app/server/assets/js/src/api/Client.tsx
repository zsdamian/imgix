import axios from 'axios';

export default class Client {

    sepia(file: File, power: number, onSuccess: (result: any) => void, onFailure: (result: any) => void){
        const formData = new FormData();
        formData.append('sepia[file]', file);
        formData.append('sepia[power]', power.toString());
        axios
            .post("/api/v1/image/sepia", formData)
            .then(onSuccess, onFailure);
    }

    blackAndWhite(file: File, mode: number, onSuccess: (result: any) => void, onFailure: (result: any) => void){
        const formData = new FormData();
        formData.append('blackAndWhite[file]', file);
        formData.append('blackAndWhite[mode]', mode.toString());
        axios
            .post("/api/v1/image/black-and-white", formData)
            .then(onSuccess, onFailure);
    }

    downloadFile(id: number, onSuccess: (result: any) => void = null, onFailure: (result: any) => void = null){
        axios
            .get("/file/" + id)
            .then(onSuccess, onFailure);
    }

}