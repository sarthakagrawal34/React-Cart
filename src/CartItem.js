import React from 'react';

class CartItem extends React.Component {
    // constructor() {
    //     // We have to call the constructor of parent class that is super() as we are inheriting state constructor in our parent constructor
    //     super();
    //     this.state= {
    //         price: '999',
    //         title: 'Phone',
    //         qty: 1,
    //         img: ''
    //     }
    //     // Second method to bind the function when there are multiple functions to bind we bind using this method
    //     // this.increaseQuantity=this.increaseQuantity.bind(this);

    //     // Executing the testing function
    //     // this.testing();
    // }
    
    // Code to see how batching sometimes fails
    // testing () {
    //     const promise = new Promise ((resolve, reject) => {
        //     setTimeout(() => { resolve('done');
        //     }, 5000);
    //     });
    //     promise.then(() => {
        // setState acts like a synchronus call this.setState({ qty: this.state.qty 10 });
        //     this.setState({ qty: this.state.qty + 10 });
        //     this.setState({ qty: this.state.qty + 10 });
        //     console.log('state', this.state);
    //     });
    // }

    // Third way to bind the function
    increaseQuantity= () => {
        // console.log('this',this.state);
        // this.state.qty+=1; This statement only increase qty but doesn't re-render the state
        
        // setState Form-I used when we didn't use the prevState
        // this.setState({
        //     qty: this.state.qty+1
        // }, () => {});

        // setState Form-II- if previous state is required
        this.setState ((prevState) => {
            return {
                qty: prevState.qty+1
            }
        }, ()=> { console.log(this.state)})
        // this.setState ((prevState) => {
        //     return {
        //         qty: prevState.qty+1
        //     }
        // }, ()=> { console.log(this.state)})
        // this.setState ((prevState) => {
        //     return {
        //         qty: prevState.qty+1
        //     }
        // }, ()=> { console.log(this.state)})
    }

    decreaseQuantity= () => {
        const {qty}= this.state;
        if (qty===0)
        {
            return;
        }
        // setState Form-I used when we didn't use the prevState
        // this.setState({
        //     qty: this.state.qty-1
        // });

        // setState Form-II- if previous state is required
        this.setState ((prevState) => {
            return {
                qty: prevState.qty-1
            }
        })
    }
    render(){
        // Using Object Destructuring so to extract all the properties at a single time
        const {title,price,qty} = this.props.product;
        console.log('this.props', this.props);
        return(
            <div className='cart-item'>
                {/* {this.props.jsx} */}
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
                            onClick={this.decreaseQuantity}
                        />
                        <img  
                            alt="delete" 
                            className='action-icons' 
                            src= "https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
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
