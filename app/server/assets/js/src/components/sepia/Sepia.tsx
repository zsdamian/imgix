import * as React from "react";
import {InputHTMLAttributes, SyntheticEvent} from "react";
import Client from "../../api/Client";
import * as io from 'socket.io-client';
import SocketHelper from "../../api/SocketHelper";


export default class Sepia extends React.Component<any, any> {

    private client: Client;

    private socketHelper: SocketHelper;

    constructor(props: any) {
        super(props);
        this.client = new Client();
        this.socketHelper = new SocketHelper();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handlePowerChange = this.handlePowerChange.bind(this);
        this.onUploadFailure = this.onUploadFailure.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
        this.state = {
            'file': null,
            'error': null,
            'power': 0,
            'downloadId': null,
            'isLoading': false,
        };
    }

    componentWillUnmount(): void {
        this.setState({
            'file': null,
            'power': null,
            'error': null,
            'downloadId': null,
        });
    }

    handleFileChange(event: any) {
        this.setState({
            'file': event.target.files[0]
        });
    }

    handlePowerChange(event: any) {
        this.setState({
            'power': event.target.value
        });
    }

    handleSubmit(event: SyntheticEvent) {
        event.preventDefault();

        if (!this.state.file) {
            this.setState({
                'error': 'You must choose file to convert!',
            });
            return;
        }

        this.setState({
            'isLoading': true,
        });

        this.client.sepia(this.state.file, this.state.power, this.onUploadSuccess, this.onUploadFailure);
    }

    onUploadSuccess(message: any) {
        this.setState({
            'error': null,
        });

        this.socketHelper.waitForDownload(this.client, message, (fileId: number) => {
            this.setState({
                'downloadId': fileId,
                'isLoading': false,
            });
        });
    }

    onUploadFailure(message: any) {
        this.setState({
            'error': 'An error occured. Try later.',
            'isLoading': false,
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-12 form-group">
                            <input type="file" onChange={this.handleFileChange} className="form-control-file"/>
                        </div>
                        <div className="col-12 form-group">
                            <select onChange={this.handlePowerChange} className="form-control">
                                <option value="0">Low</option>
                                <option value="1">Medium</option>
                                <option value="2">High</option>
                                <option value="3">Very High</option>
                                <option value="4">Crazy</option>
                            </select>
                        </div>
                        <div className="col-6 form-group">
                            <button type="submit" className="btn btn-primary" disabled={this.state.isLoading}>
                                {this.state.isLoading ?
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> : ''
                                }

                                {this.state.isLoading ? 'Loading...' : 'Convert'}
                            </button>
                        </div>
                        <div className="col-6 form-group">
                            {this.state.downloadId ?
                                <a href={'/file/' + this.state.downloadId} download>
                                    <button className="btn btn-primary" type="button">Download</button>
                                </a> : ''
                            }
                        </div>
                    </div>
                </form>
                {this.state.error ? <div className="alert-danger">{this.state.error}</div> : ''}

            </div>
        );
    }
}