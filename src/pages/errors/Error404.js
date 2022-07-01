import React from 'react'
import errorImage from '../../assets/images/error-img.png'

function Error404() {
    return (
        <div className="account-pages my-5 pt-sm-5">
            <div className="container">
                <div className="justify-content-center row">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="overflow-hidden card">
                            <div className="card-body">
                                <div className="text-center p-3">
                                    <div className="img">
                                        <img
                                            src={errorImage}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    <h1 className="error-page mt-5">
                                        <span>404!</span>
                                    </h1>
                                    <h4 className="mb-4 mt-5">Sorry, page not found</h4>
                                    <p className="mb-4 w-75 mx-auto">
                                        
                                    </p>
                                    <a
                                        className="btn btn-primary mb-4 waves-effect waves-light"
                                        href="/"
                                    >
                                        <i className="mdi mdi-home" />
                                        Back to Dashboard
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Error404