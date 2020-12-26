import React, {Component} from 'react';
import Auxilliary from '../../hoc/Auxilliary';

class BurgerBuilder extends Component{
    render(){
        return (
            <Auxilliary>
                <div>Burger</div>
                <div>Build Controls</div>
            </Auxilliary>
        );
    }
}

export default BurgerBuilder;