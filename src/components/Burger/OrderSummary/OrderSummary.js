import React, {Component} from 'react';
import Button from '../../UI/Button/Button';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';

//This could be a functional component, doesn't have to be a class
class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('[OrderSummary.js] DidUpdate');
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
                </li>
            );
        });

        return(
            <Auxilliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Cheackout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxilliary>
        );
    }
}

export default OrderSummary;