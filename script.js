const navBtn = document.querySelector('.nav-btn')
const closeBtn = document.querySelector('.close-btn')
const sidebar = document.querySelector('#sidebar')
const openCart = document.querySelectorAll('.cart-btn')
const closeCart = document.querySelectorAll('.close-cart-btn')
const cart = document.querySelector('.cart')
const sidebarContact = document.querySelector('.sidebar-contact')
const sidebarAbout = document.querySelector('.sidebar-about')
const productsContainer = document.querySelector('.products-container')
const cartContainer = document.querySelector('.cart-content')
const cartTotal = document.querySelector('.cart-total')
const cartAmount = document.querySelector('.cart-amount')
const cartTotals = document.querySelector('.cart-totals')

navBtn.addEventListener('click',()=>{
    sidebar.classList.add('open')
})
    
closeBtn.addEventListener('click',()=>{
    sidebar.classList.remove('open')
})
    
openCart.forEach(btn=>{
    btn.addEventListener('click',()=>{
        cart.classList.add('open-cart')
    })
})
        
closeCart.forEach(btn=>{
    btn.addEventListener('click',()=>{
        cart.classList.remove('open-cart')
    })
})
    
sidebarContact.addEventListener('click',()=>{
    sidebar.classList.remove('open')
})
    
sidebarAbout.addEventListener('click',()=>{
    sidebar.classList.remove('open')
})


    

// displaying the products to the DOM
displayProducts()

function displayProducts(){
   products.forEach((item)=>{
    const product = document.createElement('div')
    product.classList.add('product')
    product.innerHTML += ` 
        <img src=${item.image} alt="" class="product-img" />
        <div class="product-content">
         <h3>${item.name}</h3>
         <p>Price: $<span>${item.price}</span></p>
        </div>
        <div class="product-overlay">
         <button onclick="addtoCart( ${item.id} )">
          <i class="fa fa-shopping-cart"></i>
         </button>
        </div>`
    productsContainer.appendChild(product)
   })
}

// adding the cart items to local storage && adding items to the cart
let cartItems = JSON.parse(localStorage.getItem("cart")) || [ ]
updateCart()


function addtoCart(id){

    if (cartItems.some((item) => item.id === id)){
            changeCartAmount("plus", id)   
        }
    
    else{
            let cartItem = products.find((product) => product.id === id)
            cartItems.push(cartItem)
        }
        updateCart()
}    


// update the cart

function updateCart(){
    displayCart()
    localStorage.setItem("cart", JSON.stringify(cartItems))
    changeCartTotals()
}

// displaying the cart in the DOM

function displayCart(){
    cartContainer.innerHTML = ""
    cartItems.forEach((item)=>{
        cartContainer.innerHTML += `
        <div class="cart-row">
            <div class="cart-row-image">
            <img src=${item.image} alt=${item.name} />
            </div>
            <div class="cart-row-details">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button class="remove-item" onclick="removeCartItem( ${item.id} )">remove</button>
            </div>
            <div class="cart-row-icons">
            <button class="increase" onclick="changeCartAmount('plus', ${item.id})"><i class="fa fa-chevron-up"></i></button>
            <p class="amount">${item.amount}</p>
            <button class="decrease" onclick="changeCartAmount('minus', ${item.id})"><i class="fa fa-chevron-down"></i></button>
            </div>
        </div>`
    }) 

    if (cartItems.length === 0){
        cartContainer.innerHTML += `
        <div class="cart-empty">
            <h3>Your Cart is currently empty</h3>
            <p>Add some content to your cart.</p>
        </div>
        `
        cartTotals.style.display = "none"
    }

    else{
        cartTotals.style.display = "flex"
    }
}

// change cart totals

function changeCartTotals(){
    let totalPrice = 0
    let totalItems = 0

    cartItems.forEach((item)=>{
        totalPrice += item.amount * item.price
        totalItems += item.amount
    })

    cartTotal.innerText = parseFloat(totalPrice).toFixed(2)
    cartAmount.innerText = totalItems
}

// increase or decrease cart item amount

function changeCartAmount(sign, id){

    cartItems = cartItems.map((item)=>{

        let amount = item.amount
        if(item.id === id){
            if(sign === "plus"){
                amount++
            }
            else if (sign === "minus" && amount > 1){
                amount--
            }
        }

        return {...item, amount}
          
    })
    
    updateCart()
}

// remove cart item

function removeCartItem(id){
    cartItems = cartItems.filter((item) => item.id !== id)
    updateCart() 
}









