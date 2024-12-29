const main = document.querySelector(".main");
const carritoCompras = document.querySelector(".carroCompras");
const cuentaUser = document.querySelector(".userAcc");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");
const descuento = document.querySelector(".containerDescuentos");

const listaRemeras = [];

cargarRemeras();

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
        
    menuLateral.classList.add("menuLateral");
    menuLateral.innerHTML = 
        `<section class="d-flex">
            <button class="usuario cerrarMenu">Close</button>
        </section>`
    document.body.insertAdjacentElement("beforeend", menuLateral)
    
    ajustarPosicionMenu();
};

async function cargarRemeras(){
    try{
        const response = await fetch("./remeras.json");
        const remeras = await response.json();
        const contenedorRemeras = document.querySelector(".remerasEspeciales");
        
        remeras.forEach( remera => {
            contenedorRemeras.innerHTML += `
                <article class="remera d-flex flex-column align-items-center">
                    <img class="imagenProducto mt-3 mb-3" src="${remera.imagen}" alt="${remera.nombre}">
                    <button class="botonDeCompra d-none">Comprar</button>
                </article>
            `
        });

        const botonesDeCompra = document.querySelectorAll(".botonDeCompra");
        botonesDeCompra.forEach( (boton, index) => {
            console.log("lo que hay en .id en remeras[index]", remeras[index].id)
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
        console.log("esto hay en remeras", remeras);
        console.log("esto hay en remeras.id", remeras[0].id);
        console.log("esto le paso por parametro a la función: ", idRemera)
        const remeraBuscada = remeras.filter( (remera) => {
            remera.id == idRemera
        });
        console.log("esta remera encontro: ", remeraBuscada[0]);

        listaRemeras.push(remeraBuscada);
    } catch(error){
        console.error("error al agregar las remeras: ", error)
    }
}