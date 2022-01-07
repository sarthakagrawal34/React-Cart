import React from 'react';
import CartItem from './CartItem';


class Cart extends React.Component {
    constructor () {
        // We have to call the constructor of parent class that is super() as we are inheriting state constructor in our parent constructor
        super();
        this.state = {
            products : [
                {
                    price: '99',
                    title: 'Watch',
                    qty: 1,
                    img: ' ',
                    id: 1
                },
                {
                    price: '999',
                    title: 'Phone',
                    qty: 10,
                    img: ' ',
                    id: 2
                },
                {
                    price: '99999',
                    title: 'Laptop',
                    qty: 4,
                    img: ' ',
                    id: 3
                }
            ]
        }
    }
    // Function to Increase the quantity
    handleIncreaseQuantity = (product) => {
        // console.log ("hey please increase the qty of ", product);
        // Taking out the list of products in a array
        const {products}= this.state;
        // Finding the index of which product's qty is to be increased
        const index = products.indexOf(product);

        products[index].qty +=1;
        this.setState({
            products // or products: products we are writing shorthand notation is key and value are same
        });
    }
    // Function to Decrease the quantity
    handleDecreaseQuantity = (product) => {
        // console.log ("hey please decrease the qty of ", product);
        // Taking out the list of products in a array
        const {products}= this.state;
        // // Finding the index of which product's qty is to be decreased
        const index = products.indexOf(product);
        if (products[index].qty == 0)
        {
            return;
        }
        products[index].qty -=1;

        this.setState({
            products // or products: products we are writing shorthand notation is key and value are same
        });
    }
    // Function to Delete the Product
    handleDeleteProduct = (id) => {
        const {products} = this.state;

        const items = products.filter((item) => item.id !== id) // Returns an array of the remaining items

        this.setState({
            products : items
        })
    }


    render(){
        const {products} = this.state
        return(
            <div className='cart'>
               {products.map((product)=>{
                   return (
                        <CartItem 
                            product={product}
                            key = {product.id} 
                            // key= {product.title}
                            // func = {()=> console.log("Func in prop")}
                            // isLoggedIn = {false}
                            // jsx = {<h1>TEST</h1>}
                            onIncreaseQuantity = {this.handleIncreaseQuantity}
                            onDecreaseQuantity = {this.handleDecreaseQuantity}
                            onDeleteProduct = {this.handleDeleteProduct}
                        />
                    )
               })}
           </div>
       );
    }
}

export default Cart;
