
const cartReducer = (state, action) => {
  if(action.type === "ADD_TO_CART"){
    let {product} = action.payload;

  //tackle the existing Item
  let existingItem = state.cart.find((curItem)=> curItem.id === product.id);

  if(existingItem){
   let updatedItems = state.cart.map((curElem)=>{
    if(curElem.id === product.id){
      let newAmount = curElem.amount + 1;
      return{
        ...curElem,
        amount: newAmount,
      }
    }else{
      return curElem
    }
   });
   return {
    ...state,
    cart: updatedItems,
  };
  }else{
    let cartProduct = {
      id : product.id,
      amount:1,
      title: product.title,
      image: product.image,
      category: product.category,
      description: product.description,
      price: product.price
    }
    return {
      ...state,
      cart: [...state.cart, cartProduct]
    };

  }
}

//to delete ITEM
if(action.type === "REMOVE_ITEM"){
  let updatedCart = state.cart.filter(
    (curItem)=> curItem.id !== action.payload
    );
  return {...state, cart: updatedCart}
}

//to set increment decrement
if(action.type === "SET_DECREMENT"){
  let updatedProduct = state.cart.map((curElem)=>{
    if(curElem.id === action.payload){
      let decAmount = curElem.amount - 1 ;

      if(decAmount <= 1){
        decAmount = 1
      }
      return{
        ...curElem,
        amount: decAmount
      }
    }else{
      return curElem;
    } 
  });
  return {...state, cart: updatedProduct}
}

if(action.type === "SET_INCREMENT"){
  let updatedProduct = state.cart.map((curElem)=>{
    if(curElem.id === action.payload){
      let incAmount = curElem.amount + 1;
      if(incAmount >= 10){
        incAmount = 10
      }
      return{
        ...curElem,
        amount: incAmount
      }
    }else{
      return curElem;
    } 
  });
  return {...state, cart: updatedProduct}
}

//cart count

if(action.type === "CART_TOTAL_ITEM"){
  let updatedItemVal = state.cart.reduce((intialVal, curElem)=>{
 let {amount} = curElem
 intialVal = intialVal+ amount
 return intialVal;
  },0)
  return{
    ...state,
    total_item: updatedItemVal
  }
}

//cart subtotal

if(action.type === "CART_TOTAL_PRICE"){
  let total_price = state.cart.reduce((initialVal, curElem)=>{
    let {price , amount } = curElem;
    initialVal = initialVal + price*amount;
    return  initialVal
  },0)
  return{
    ...state,
    total_price
  }
}

//clear cart

if(action.type === "CLEAR_CART"){
  return{
    ...state,
    cart:[],
  }
}

return state;
}



export default cartReducer