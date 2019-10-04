import * as io from "socket.io-client";
import Client from "./Client";

export default class SocketHelper {

    waitForDownload(client: Client, token: string, onReceive: (message: number) => void){
        let socket = io.connect(location.hostname + ':3000');
        socket.emit("wait_for_download", token);

        socket.on('download_link', function (fileId: number) {
            socket.disconnect();
            onReceive(fileId);
        });
    }

}