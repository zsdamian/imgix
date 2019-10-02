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

}