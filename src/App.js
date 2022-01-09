import React from 'react';
// import CartItem from './CartItem';
import Cart from './Cart';
import Navbar from './NavBar';
import firebase from 'firebase/compat/app';

// function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//       <Cart/>
//     </div>
//   );
// }

class App extends React.Component {
  constructor () {
    // We have to call the constructor of parent class that is super() as we are inheriting state constructor in our parent constructor
    super();
    this.state = {
        /*products : [
            {
                price: '99',
                title: 'Watch',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
                id: 1
            },
            {
                price: '999',
                title: 'Phone',
                qty: 10,
                img: 'https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
                id: 2
            },
            {
                price: '99999',
                title: 'Laptop',
                qty: 4,
                img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
                id: 3
            }
        ]*/

        // Now using firebase so initialize products as an empty array
        products : [],
        // Adding loader till when the products are being loaded
        'loading': true
    }
    // Declaring a new variable db which stores the database
    this.db = firebase.firestore();
  }

  // Function to fetch initial products array
  componentDidMount (){

    // Now take use of function chaining
    // The following method is the get() method which fetch the data but it is not real-time data
    /*
    firebase
      .firestore()
      .collection('products')
      .get()  // get() method returns a promise which retreive data
      .then((snapshot) => {
        // console.log(snapshot);

        // Snapshot is the picture taken of the database
        // snapshot.docs is the document which stores our data and return a doc.data()
        // doc.data() contains all the data in the form of objects

        // snapshot.docs.map((doc) => {
        //   console.log(doc.data());
        // })

        // Fetch out in the products array
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();

          //Provide a 'id' field to the data so as to provide a unique key
          data['id'] = doc.id;
          return data;
        });

        // Now update the state
        this.setState({
          products:products,
          // Removing loader as the products are loaded
          loading: false
        });
      });
    */

    // Using onSnapshot method which is a listener for fetching data which updates data in real-time
    // firebase
    //   .firestore()
    this.db
      .collection('products')
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();

          //Provide a 'id' field to the data so as to provide a unique key
          data['id'] = doc.id;
          return data;
        });
        // Now update the state using this.setState
        this.setState({
          products:products,
          // Removing loader as the products are loaded
          loading: false
        });
      });
  }

  // Function to Increase the quantity
  handleIncreaseQuantity = (product) => {
    // console.log ("hey please increase the qty of ", product);
    // Taking out the list of products in a array
    const {products}= this.state;
    // Finding the index of which product's qty is to be increased
    const index = products.indexOf(product);
    /*
    products[index].qty +=1;
    this.setState({
        products // or products: products we are writing shorthand notation is key and value are same
    });
    */
    
    // Now using firebase update the qty
    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty : products[index].qty + 1
      })
      .then(() => {
        alert("Quantity increased successfully");
      })
      .catch((error) => {
        alert("Error in increasing quantity");
      })

  }
  // Function to Decrease the quantity
  handleDecreaseQuantity = (product) => {
    // console.log ("hey please decrease the qty of ", product);
    // Taking out the list of products in a array
    const {products}= this.state;
    // // Finding the index of which product's qty is to be decreased
    const index = products.indexOf(product);
    if (products[index].qty === 0)
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
  // Function which tell the total quantity count of cart
  getCartCount = () => {
      const {products} = this.state;

      let count = 0;

      products.forEach((product) => {
        count += product.qty;
      })
      return count;
  }
  // Function to get the total
  getTotal = () => {
      const {products} = this.state;

      let cartTotal = 0;

      products.map((product) => {
        cartTotal += product.qty * product.price;
      });

      return cartTotal;
  }

  // Function to add product from app to database
  /*
  addProduct = () => {
    this.db
      .collection('products')
      .add({
        img: '',
        title: "Washing Machine",
        price: 10999,
        qty: 2
      })
      .then((docRef) => {
        console.log(docRef);
      })
  }
  */
  render(){
    const {products, loading} = this.state
    return(
      <div className='App'>
        <Navbar count = {this.getCartCount()}/>
        {/* <button onClick={this.addProduct} style={{padding: 10, fontSize: 20}}>Add a Product</button> */}
        <Cart 
          products = {products}
          onIncreaseQuantity = {this.handleIncreaseQuantity}
          onDecreaseQuantity = {this.handleDecreaseQuantity}
          onDeleteProduct = {this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products ....</h1>}
        <div style={{padding: 10, fontSize: 20}}>
          TOTAL: {this.getTotal()}
        </div>
      </div>
    )
  }
}



export default App;
