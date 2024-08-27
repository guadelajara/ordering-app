
import  menuArray  from '/data.js'

let totalOrder = 0
let orderItems =[]

function getMenuHtml (orderArr) {
    return orderArr.map(order => {
        const {
            name,
            ingredients,
            price,
            emoji,
            id
        } = order

    return `
        <section class="card">
            <div class="card-emoji">${emoji}</div>
            <div class="card-right">
                <h2>${name}</h2>
                <p>${ingredients}</p>
                <h3>${price}€</h3>
            </div>
            <button class="add-btn" data-id="${id}">+</button>
        </section>
    `
    }).join('')


}


function addItemToOrder (item) {

const thankYouMessage = document.querySelector('.thank-you-message');
if (thankYouMessage) {
        thankYouMessage.remove();  
}

orderItems.push(item)

    const itemHtml = `
        <div class="order-section" data-id="${item.id}">
            <div class="left-side">
                <h3>${item.name}</h3>
                <button class="remove-btn" data-id="${item.id}">remove</button>
            </div>
            <h3>${item.price}€</h3>
        </div>
    `
    totalOrder += item.price
    updateTotalPrice()

    document.getElementById('selected-items').innerHTML += itemHtml
    document.getElementById('order-btn').addEventListener('click', renderPayment);
}

function removeItemFromOrder(itemId) {
    const itemIndex = orderItems.findIndex(item => item.id == itemId)

    if (itemIndex > -1) {
        totalOrder -= orderItems[itemIndex].price
        updateTotalPrice()

        orderItems.splice(itemIndex, 1)

        document.querySelector(`.order-section[data-id="${itemId}"]`).remove()
    }
}


function updateTotalPrice() {
    const totalHtml = `
    <div class="order-section">
        <h3>Total price:</h3>
        <h3>${totalOrder}€</h3>
    </div>
    <button class="order-btn">Complete order</button>
`
document.getElementById('total-items').innerHTML = totalHtml
}


document.getElementById('container').innerHTML = getMenuHtml(menuArray)


function renderPayment() {
    const paymentHtml = `
        <div id="payment" class="payment">
            <div class="header">   
                <h2>Enter card details</h2>
            </div>
            <div class="data-inputs">
                <input type="text" placeholder="Enter your name" id="name-input" class="inputs" required>
                <input type="text" placeholder="Enter card number" class="inputs" required>
                <input type="text" placeholder="Enter CVV" class="inputs" required>
            </div>
            <button class="pay-btn" id="pay-btn">Pay</button>
        </div>
    `
    document.getElementById('payment-container').innerHTML = paymentHtml

    document.getElementById('pay-btn').addEventListener('click', function(){

        const userName = document.getElementById('name-input').value
        const cardNumberInput = document.querySelector('.inputs[placeholder="Enter card number"]').value
        const cvvInput = document.querySelector('.inputs[placeholder="Enter CVV"]').value

        if (userName && cardNumberInput && cvvInput) {

            document.getElementById('selected-items').innerHTML = `
            <div class="thank-you-message" id=""thank-you-message">
                <h2>Thanks ${userName}! Your order is on its way!</h2>
            </div>
        `
        document.getElementById('payment').remove()
        document.getElementById('payment-container').remove()

        totalOrder = 0
        document.getElementById('total-items').innerHTML=''
    
        } else {
            alert('Please fill out all fields')
        }
    })
}





// Event Delegations

document.getElementById('container').addEventListener('click', function(event) {
    if (event.target.classList.contains('add-btn')) {
        const itemId= event.target.getAttribute('data-id')
        const item = menuArray.find(item => item.id == itemId)
        addItemToOrder(item)
    }
})

document.getElementById('selected-items').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        const itemId = event.target.getAttribute('data-id')
        removeItemFromOrder(itemId)
    }
})

document.getElementById('total-items').addEventListener('click', function(e) {
    if (e.target.classList.contains('order-btn')) {
        console.log('ordered')
        renderPayment()
    }
})

