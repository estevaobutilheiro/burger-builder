import classes from './Layout.css';
import React, {Component} from 'react';
import Auxilliary from '../Auxilliary/Auxilliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenerHandler = () => {
        this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render(){
        return(
            <Auxilliary>
                <Toolbar opener={this.sideDrawerOpenerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilliary>
        )
    }
}

export default Layout;