import axios from '../../axios-orders';
import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{
    // constructor (props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
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
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        };
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    closeModalHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // alert('You Continue!');
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, //this price should be stored in the server to make sure the user isn't manipulating the data
            customer: {
                name: 'Max',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if(this.state.ingredients){
            burger = (
                <Auxilliary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}  
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo} 
                        price={this.state.totalPrice}
                        purchasable = {this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Auxilliary>
            );
            orderSummary = <OrderSummary 
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);