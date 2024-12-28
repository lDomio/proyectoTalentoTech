const main = document.querySelector(".main");
const remeras = document.querySelectorAll(".remera");
const carritoCompras = document.querySelector(".carroCompras");
const cuentaUser = document.querySelector(".userAcc");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");
const descuento = document.querySelector(".containerDescuentos");

remeras.forEach( (remera) => {
    remera.addEventListener("click", (event) => {
        if(Array.from(remeras).some( (remera) => remera.classList.contains("activa") )){
            resetRemeras();
        }
        event.stopPropagation()
        seleccionarRemera(remera);
    });
});

document.addEventListener("click", () => {
    resetRemeras();
});

carritoCompras.addEventListener("click", () => {
    let menuLateralExistente = document.querySelector(".menuLateral");

    if (!menuLateralExistente){
        console.log("seleccionaste el carrito de compas")
        
        generarMenuLateral();
        let cerrarMenu = document.querySelector('.cerrarMenu');
        let menuLateral = document.querySelector(".menuLateral");
    
        cerrarMenu.addEventListener('click', () => {
            cerrarMenuDinamico(menuLateral)
        });
    } else {console.log("ya hay un menu lateral")}
});

document.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const menuLateral = document.querySelector(".menuLateral");
    const header = document.querySelector(".header");
    const navbarHeight = navbar.offsetHeight;

    if (navbar && menuLateral) {
        menuLateral.style.top = `${navbarHeight}px`;
    }

    if(window.scrollY == 0){
        const headerHeight = header.offsetHeight;
        menuLateral.style.top = `${navbarHeight + headerHeight}px`;
    }
});

cuentaUser.addEventListener("click", () => {
    let modalExistente = document.querySelector(".modal");

    if (!modalExistente){
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
    
    if (!modalExistente){
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
    remeras.forEach( (remera) => {
        remera.classList.remove("activa")
        remera.querySelector(".botonDeCompra").classList.add("d-none");
    });
}

function cerrarMenuDinamico(menu){
    menu.remove();
    console.log(`menu cerrado y eliminado`)   
}

function generarModal(){
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.classList.add("d-flex");
    modal.classList.add("justify-content-center");

    modal.innerHTML = 
        `
        <section class="d-flex align-items-center">
            <p>Hola!</p>
        </section>
        <section>
            <button class="usuario cerrarModal">Close</button>
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
    
    const headerHeight = header.offsetHeight;
    const navbarHeight = navbar.offsetHeight;
    
    menuLateral.style.top = `${headerHeight + navbarHeight}px`;
}