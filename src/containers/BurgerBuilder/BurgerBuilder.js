import { connect } from 'react-redux';
import axios from '../../axios-orders';
import React, {Component} from 'react';
import * as actionTypes from '../../store/actions'
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';



class BurgerBuilder extends Component{
    // constructor (props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-burger-51981-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys( ingredients )
        .map( igKey => {
            return ingredients[igKey];
        } )
        .reduce( ( sum, el ) => {
            return sum + el;
        }, 0 );
        return sum > 0;
    }

    purchaseHandler = () => {
        console.log(this.props);
        this.setState({purchasing: true});

    }

    closeModalHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push({pathname: '/checkout'});
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if(this.props.ings){
            burger = (
                <Auxilliary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}  
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo} 
                        price={this.props.price}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Auxilliary>
            );
            orderSummary = <OrderSummary 
                price={this.props.price}
                ingredients={this.props.ings}
                purchaseCanceled={this.closeModalHandler}
                purchaseContinued={this.purchaseContinueHandler}
                />;  
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return (
            <Auxilliary>
                <Modal show={this.state.purchasing} modalClosed={this.closeModalHandler}>
                      {orderSummary}
                </Modal>
                {burger}
            </Auxilliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));