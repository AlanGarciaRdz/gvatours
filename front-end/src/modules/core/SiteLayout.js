import React, { Component } from 'react';
import { Route, withRouter } from 'react-router';


class LayoutRoute extends Component {


    render() {

        const { component: Component, ...rest } = this.props;

        const renderFunc = (
            <div>
                {/* <Header /> */}
                <div className="content-separator">
                    <Component  { ...this.props } />
                </div>
                {/* <Footer  /> */}
            </div>
        );

    
        // Return React Router's route with render function
        return <Route render={ () => renderFunc } { ...rest } />;

    }
    
    
}

    
  

  export default withRouter(LayoutRoute);