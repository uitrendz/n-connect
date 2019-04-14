import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Guest.scss';

// import { userActions } from '../_actions';

class GuestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row p-5 bg-white text-primary">
                    <div className="col-12 py-5 text-center">
                        <p className="mb-0 ls-8">WELCOME TO</p>
                        <p className="display-2 mb-0 font-weight-bold">
                            <strong>U<span className="text-dark">X</span>D
                            <span className="text-secondary">.</span>
                            </strong>
                        </p>
                        <p className="mb-0 ls-8">Already Member ? <button className="btn font-weight-light btn-dark"><small>LOGIN</small></button></p>
                    </div>
                </div>

                <div className="row mx-4 py-5 d-flex justify-content-center">
                    {/* <div className="col-12 text-center text-muted pb-4"><small className="ls-8">RECENT PROJECTS</small></div> */}
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                        <div className="py-4 text-center">
                            <h2 className="mb-0 custom-font font-weight-bold text-warning display-4">12</h2>
                            <small className="mb-0 text-muted ls-4"><small>TEAM</small></small>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                        <div className="py-4 text-center">
                            <h2 className="mb-0 custom-font font-weight-bold text-primary display-4">08</h2>
                            <small className="mb-0 text-muted ls-4"><small>RUNNING PROJECTS</small></small>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                        <div className="py-4 text-center">
                            <h2 className="mb-0 custom-font font-weight-bold text-secondary display-4">04</h2>
                            <small className="mb-0 text-muted ls-4"><small>UPCOMING PROJECTS</small></small>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(GuestPage);
export { connectedLoginPage as GuestPage }; 