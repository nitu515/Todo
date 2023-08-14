
const productReducer = (state, action) => {

    if(action.type === "FETCH_SUCCESS"){
        return{
            loading:false,
            error:'',
            products:action.payload
        }
    }

    if(action.type === "FETCH_ERROR"){
        return {
            loading:false,
            error:'SOMETHING WENT WRONG',
            products:[]
        }
    }
  //add new product
  if(action.type === "ADD_NEW_PRODUCT"){
    let newproduct = action.payload;
    let newProductAdded = {
      id: 1+newproduct.price,
      title: newproduct.title,
      image: newproduct.image,
      category: newproduct.category,
      description: newproduct.description,
      price: newproduct.price
    }
    return {
      ...state,
      products: [...state.products, newProductAdded]
    };
  } 

  //to set increment decrement
if(action.type === "EDIT_PRODUCT"){
  let updatedData = action.payload;
  let updatedProduct = state.products.map((curElem)=>{
    if(curElem.id === updatedData.id){
      let updatedtitle = updatedData.title ;
      let updateimage = updatedData.image  ;
      let updatecategory = updatedData.category  ;
      let updatedescription = updatedData.description ;
      let updateprice = updatedData.price ;
      return{
        ...curElem,
        title: updatedtitle,
        image: updateimage,
        category: updatecategory,
        description: updatedescription,
        price: updateprice,
      }
    }else{
      return curElem;
    } 
  });
  return {...state, products: updatedProduct}
}
   
  //to delete Product
  if(action.type === "REMOVE_PRODUCT"){
    let updatedProducts = state.products.filter(
      (curItem)=> curItem.id !== action.payload
      );
    return {...state, products: updatedProducts}
  }
  
  return state;
  }
  
  
  
  export default productReducer