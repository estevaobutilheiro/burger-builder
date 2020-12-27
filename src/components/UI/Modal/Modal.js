import React, {Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';

//This could be a functional component, doesn't have to be a class
class Modal extends Component {

    
    shouldComponentUpdate(nextProps, nextState){ //Study this later
        return nextProps.show !== this.props.show;
    }

    componentDidUpdate(){
        console.log('[Modal.js] DidUpdate')
    }

    render(){
        return(
            <Auxilliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    >
                    {this.props.children}
                </div>
            </Auxilliary>
        )
    }
}

export default Modal;