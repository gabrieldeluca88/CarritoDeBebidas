

document.addEventListener('DOMContentLoaded', () =>{
    traerdatos()
})  


const stockProductos = [];

async function traerdatos(){                                                            //fetch para traer el json
    fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        createHTML(data);
        stockProductos.push(data);
    });
}                         

console.log(stockProductos);



const mayor = document.getElementById('mayor')
const menor = document.getElementById('menor')

mayor.addEventListener('click', () => {
Swal.fire({
    position: 'center',
    icon: 'success',
    title: '¡Bienvenido!',                      
    showConfirmButton: false,
    timer: 1500
})
document.getElementById("modal").style.display = "none"; 
})

menor.addEventListener('click', () => {
    window.location.href = "https://www.cartoonnetwork.com.ar/";})


const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorProducto = document.getElementById('contadorProducto')

const botonComprar = document.getElementById('comprar-carrito')

const precioTotal = document.getElementById('precioTotal')




let carrito = []                                                                        //carrito vacio

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito')) || []
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    localStorage.clear();

    Toastify({                                                                           
        text: `Tu carrito está vacio!`,
        duration: 1000,

        style: {
            background: "red",

        },
        offset: {
            x: 0, 
            y: 100 
        },
    }).showToast();
})

botonComprar.addEventListener('click', () => {
    if (carrito.length > 0) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `¡Muchas gracias por tu compra, has comprado con Exíto!`,                      
            showConfirmButton: false,
            timer: 4000
        }) 
        
        
        contenedorModal.classList.toggle('modal-active')
        carrito.length = 0 
        localStorage.clear()
        actualizarCarrito();
        
    } else {
        Toastify({                                          
            text: `Tu carrito está vacio!`,
            duration: 1000,
    
            style: {
                background: "red",
    
            },
            offset: {
                x: 0, 
                y: 100 
            },
        }).showToast();
    }})





function createHTML (stockProductos) {                                                      // INYECTO EL HTML con plantilla literal                         
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.bebida}</h3>
    <p class="precioProducto">$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar</button>`

    contenedorProductos.appendChild(div)


    const boton = document.getElementById(`agregar${producto.id}`)


    boton.addEventListener('click', () => {                             //esta funcion ejecuta el agregar el carrito con la id del producto
        
        carrito.push(stockProductos[producto.id - 1]);
        SumarBebida()

        Toastify({
            text: `Tenés ${carrito.length} en el carrito!`,          
            duration: 1000,

            style: {
                background: "linear-gradient(to right, #aab09b, 255,0,0)",

            },
            offset: {
                x: 0, 
                y: 100 
            },
        }).showToast();
    })
})
}



const SumarBebida = (prodId) => {

    let array= []

        const item = stockProductos.find((prod) => prod.id === prodId)
        array.push(item)
    
    actualizarCarrito()
}



const BorrarBebida = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)                                        //Busca el elemento que le pase y me devuelve su indice.

    carrito.splice(indice, 1)                                                                   //borro un producto
    localStorage.clear();
    actualizarCarrito()
    console.log(carrito)


    Toastify({
        text: `Bebida eliminada del carrito!`,
        duration: 1000,

        style: {
            background: "red",

        },
        offset: {
            x: 0, 
            y: 100 
        },
    }).showToast();
}

const actualizarCarrito = () => {


    contenedorCarrito.innerHTML = ""                                                            //dejo el contenido vacio
    
    carrito.forEach((prod) => {                                                                 // Recorro el array de carrito.
        const div = document.createElement('div')                   
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <img src=${prod.img} alt= "">
        <p>${prod.bebida}</p>
        <p>${prod.marca}</p>
        <p>$ ${prod.precio}</p>
        <button onclick="BorrarBebida(${prod.id})"class="boton-eliminar"><i class="fa-solid fa-cart-arrow-down"></i></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorProducto.innerText = carrito.length                                                     // actualizo con la longitud del carrito.

    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0) // por cada producto el acumulador le suma el precio , iniciando en 0
    


}




const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]                          // modal para los productos 
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})





