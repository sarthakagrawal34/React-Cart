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
  addProduct = () => {
    this.db
      .collection('products')
      .add({
        img: 'data:image/jpeg;base64,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',
        title: "Washing Machine",
        price: 10999,
        qty: 2
      })
      .then((docRef) => {
        console.log(docRef);
      })
  }
  render(){
    const {products, loading} = this.state
    return(
      <div className='App'>
        <Navbar count = {this.getCartCount()}/>
        <button onClick={this.addProduct} style={{padding: 10, fontSize: 20}}>Add a Product</button>
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
