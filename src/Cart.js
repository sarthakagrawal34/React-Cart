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
                        />
                    )
               })}
           </div>
       );
    }
}

export default Cart;
