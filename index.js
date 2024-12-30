const main = document.querySelector(".main");
const carritoCompras = document.querySelector(".carroCompras");
const cuentaUser = document.querySelector(".userAcc");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");
const descuento = document.querySelector(".containerDescuentos");

let listaRemeras = [];

cargarRemeras();
cargarCarritoLocalStorage();

const contenedorRemeras = document.querySelector(".remerasEspeciales");

contenedorRemeras.addEventListener("click", (event) => {
    const remera = event.target.closest(".remera");
    if (remera){

        const remerasActivas = document.querySelectorAll('.remera.activa');
        if (remerasActivas.length > 0) {
            resetRemeras();
        }
        
        seleccionarRemera(remera);

        event.stopPropagation();
    }
});

document.addEventListener("click", () => {
    resetRemeras();
});

carritoCompras.addEventListener("click", () => {
    let modalExistente = document.querySelector(".modal");
    let menuLateralExistente = document.querySelector(".menuLateral");
    
    if (!modalExistente && !menuLateralExistente){
        console.log("seleccionaste el carrito de compas")
        
        generarMenuLateral();
        let cerrarMenu = document.querySelector('.cerrarMenu');
        let menuLateral = document.querySelector(".menuLateral");
    
        cerrarMenu.addEventListener('click', () => {
            cerrarMenuDinamico(menuLateral)
        });
    } else {console.log("ya hay un menu lateral o un modal")}
});

document.addEventListener("scroll", () => {
    const menuLateral = document.querySelector(".menuLateral");
    
    if (menuLateral){
        ajustarPosicionMenu();
    }
});

cuentaUser.addEventListener("click", () => {
    let modalExistente = document.querySelector(".modal");
    let menuLateralExistente = document.querySelector(".menuLateral");
    
    if (!modalExistente && !menuLateralExistente){
        console.log("seleccionaste la cuenta del usuario")

        generarModal();

        let modal = document.querySelector(".modal");

        const cerrarModal = document.querySelector(".cerrarModal");
        cerrarModal.addEventListener("click", () => {
            cerrarMenuDinamico(modal);
        });
    } else {console.log("modal ya existente")}
});

descuento.addEventListener("click", () => {
    let modalExistente = document.querySelector(".modal");
    let menuLateralExistente = document.querySelector(".menuLateral");
    
    if (!modalExistente && !menuLateralExistente){
        console.log("seleccionaste la cuenta del usuario")

        generarModal();

        let modal = document.querySelector(".modal");

        const cerrarModal = document.querySelector(".cerrarModal");
        cerrarModal.addEventListener("click", () => {
            cerrarMenuDinamico(modal);
        });
    } else {console.log("modal ya existente")}
})

function seleccionarRemera(remera){
    remera.classList.add("activa");
    remera.querySelector(".botonDeCompra").classList.remove("d-none");
};

function resetRemeras(){

    const remeras = document.querySelectorAll(".remera");

    remeras.forEach( (remera) => {
        remera.classList.remove("activa")
        remera.querySelector(".botonDeCompra").classList.add("d-none");
    });
}

function ajustarPosicionMenu(){
    const navbar = document.querySelector(".navbar");
    const header = document.querySelector(".header");
    const navbarHeight = navbar.offsetHeight;
    const menuLateral = document.querySelector(".menuLateral");

    if(document.documentElement.scrollTop === 0){
        const headerHeight = header.offsetHeight;
        menuLateral.style.top = `${navbarHeight + headerHeight}px`;
    } else {
        menuLateral.style.top = `${navbarHeight}px`;
    }
}

function cerrarMenuDinamico(menu){
    menu.remove();
    console.log(`menu cerrado y eliminado`)   
}

function generarModal(){
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.classList.add("d-flex");
    modal.classList.add("flex-row");
    modal.classList.add("justify-content-center");

    modal.innerHTML = 
        `
        <section class="d-flex flex-column justify-content-evenly">
            <p>Registrate para obtener un 20% de descuento</p>
            <form class="d-flex flex-column justify-content-evenly align-items-center h-50" id="myForm" action="https://formsubmit.co/domioluca5@gmail.com" method="POST">
                <label for="nombre"></label>
                <input type="text" id="nombre" name="nombre" placeholder="Nombre:" required>

                <label for="email"></label>
                <input type="mail" id="email" name="email" placeholder="Email: " required>

                <article>
                    <label for="notificaciones">Me gustaría recibir notificaciones</label>
                    <input type="checkbox" id="notificaciones" name="notificaciones">
                </article>

                <button type="submit">Enviar</button>
            </form>

            <button class="cerrarModal">Cerrar</button>
        </section>
        `
    
    document.body.insertAdjacentElement("beforeend", modal);
}

function generarMenuLateral(){
    const menuLateral= document.createElement("aside");
        
    menuLateral.classList.add("menuLateral", "d-flex", "flex-column");
    menuLateral.innerHTML = 
        `<section class="d-flex flex-row-reverse mb-3">
            <button class="usuario cerrarMenu">Close</button>
        </section>
        `
    cargarRemerasCarrito(menuLateral);

    document.body.insertAdjacentElement("beforeend", menuLateral)
    
    ajustarPosicionMenu();
};

async function cargarRemeras(){
    try{
        const response = await fetch("./remeras.json");
        const remeras = await response.json();
        const contenedorRemeras = document.querySelector(".remerasEspeciales");
        
        for (let index = 0; index < remeras.length && index < 4; index++) {
            const remera = remeras[index];
            
            contenedorRemeras.innerHTML += `
                <article class="remera d-flex flex-column align-items-center">
                    <img class="imagenProducto mt-3 mb-3" src="${remera.imagen}" alt="${remera.nombre}">
                    <button class="botonDeCompra d-none">Comprar</button>
                </article>
            `
        }

        const botonesDeCompra = document.querySelectorAll(".botonDeCompra");
        let menuLateral = document.querySelector(".menuLateral");
        botonesDeCompra.forEach( (boton, index) => {
            boton.addEventListener("click", () => agregarRemera(remeras[index].id));
        });
    } catch(error){
        console.error("error al cargar las remeras: ", error);
    };
};

async function agregarRemera(idRemera){
    try{
        const response = await fetch("./remeras.json");
        const remeras = await response.json();
        const remeraBuscada = remeras.find( remera => remera.id == idRemera );
        if (remeraBuscada){
            listaRemeras.push(remeraBuscada);
            const menuLateral = document.querySelector(".menuLateral");
            console.log("remera agregada al carrito", remeraBuscada);
            cargarRemerasCarrito(menuLateral);
            guardarCarritoLocalStorage();
        }
    } catch(error){
        console.error("error al agregar las remeras: ", error)
    }
}

function cargarRemerasCarrito(menuLateral){
    
    let costoTotal = listaRemeras.reduce( (acc, remera) => {
        return acc + remera.precio;
    }, 0);

    menuLateral.innerHTML = 
    `
    <section class="d-flex flex-row-reverse mb-3">
        <button class="usuario cerrarMenu">Close</button>
    </section>
    `;

    for (let i = 0; i < listaRemeras.length; i++) {
        const element = listaRemeras[i];
        
        menuLateral.innerHTML += 
        `
        <section class="d-flex flex-row justify-content-around p-3">
            <article>
                <img class="imagenLateral" src="${element.imagen}" alt="${element.nombre}">
            </article>
            <article class="w-50">
                <p class="textoLateral">${element.descripcion}</p>
            </article>
            <article>${element.precio}</article>
            <button class="botonLateral quitarRemera">X</button>
        </section>
        `
    }

    menuLateral.innerHTML += 
    `
    <section>
        <p>El costo total es ${costoTotal}</p>
    </section>
    `

    const botonesQuitar = menuLateral.querySelectorAll(".quitarRemera");
    botonesQuitar.forEach( (boton, index) => {
        boton.addEventListener("click", () => {
            console.log("seleccionaste");
            quitarRemera(index, menuLateral);
        });
    });

    let cerrarMenu = menuLateral.querySelector('.cerrarMenu');
    if (cerrarMenu){
        cerrarMenu.addEventListener('click', () => cerrarMenuDinamico(menuLateral));
    } else { console.error("no se genero boton")}
}

function quitarRemera(index, menuLateral){
    listaRemeras.splice(index, 1);
    cargarRemerasCarrito(menuLateral);
    guardarCarritoLocalStorage();
}

function cargarCarritoLocalStorage(){
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado){
        listaRemeras = JSON.parse(carritoGuardado);
    }
}

function guardarCarritoLocalStorage(){
    localStorage.setItem("carrito", JSON.stringify(listaRemeras))
}