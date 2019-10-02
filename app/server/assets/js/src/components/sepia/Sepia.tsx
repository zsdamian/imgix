import * as React from "react";
import {InputHTMLAttributes, SyntheticEvent} from "react";
import Client from "../../api/Client";

export default class Sepia extends React.Component<any, any> {

    private client: Client;

    constructor(props: any) {
        super(props);
        this.client = new Client();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handlePowerChange = this.handlePowerChange.bind(this);
        this.state = {
            'file': null,
            'error': null,
            'power': 0,
        };
    }

    componentWillUnmount(): void {
        this.setState({
            'file': null,
            'power': null,
            'error': null,
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

        if(!this.state.file){
            this.setState({
                'error': 'You must choose file to convert!',
            });
            return;
        }

        this.client.sepia(this.state.file, this.state.power,
            () => {
                this.setState({
                    'error': null,
                });
            }, () => {
                this.setState({
                    'error': 'An error occured. Try later.'
                });
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
                            </select>
                        </div>
                        <div className="col-12 form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                {this.state.error ? <div className="alert-danger">{this.state.error}</div> : ''}
            </div>
        );
    }
}