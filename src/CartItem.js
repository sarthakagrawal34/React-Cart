import React from 'react';

class CartItem extends React.Component {
    constructor() {
        // We have to call the constructor of parent class that is super() as we are inheriting state constructor in our parent constructor
        super();
        this.state= {
            price: '999',
            title: 'Phone',
            qty: 1,
            img: ''
        }
        // Second method to bind the function when there are multiple functions to bind we bind using this method
        // this.increaseQuantity=this.increaseQuantity.bind(this);
    }
    // Third way to bind the functiom
    increaseQuantity= () => {
        console.log('this',this.state);
    }
    render(){
        // Using Object Destructuring so to extract all the properties at a single time
        const {title,price,qty} = this.state;
        return(
            <div className='cart-item'>
                <div className='left-block'>
                    <img style={styles.image}/>
                </div>
                <div className='right-block'>
                    <div style={{fontSize: 25}}> {title} </div>
                    <div style={{color: "red"}}> Rs. {price} </div>
                    <div style={{color: "gray"}}> Qty: {qty} </div>
                    <div className='cart-item-actions'>
                        <img  
                            alt="increase" 
                            className='action-icons' 
                            src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
                            // onClick={this.increaseQuantity.bind(this)} this is the naive method to bind here only
                            onClick={this.increaseQuantity} 
                        />
                        <img  
                            alt="decrease" 
                            className='action-icons' 
                            src="https://cdn-icons-png.flaticon.com/512/334/334047.png" 
                        />
                        <img  
                            alt="delete" 
                            className='action-icons' 
                            src="https://cdn-icons.flaticon.com/png/512/5676/premium/5676146.png?token=exp=1641014416~hmac=bb097dcfd72f69408db4f31d2f6556ab"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const styles={
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;
