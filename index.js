const main = document.querySelector(".main");
const remeras = document.querySelectorAll(".remera");
const carritoCompras = document.querySelector(".carroCompras");
const cuentaUser = document.querySelector(".userAcc");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");

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
    console.log("seleccionaste el carrito de compas")
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

    const cerrarMenu = document.querySelector('.cerrarMenu');
    cerrarMenu.addEventListener('click', () => {
        menuLateral.remove();
        console.log('Menu lateral cerrado y eliminado')
    })
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
    console.log("seleccionaste la cuenta del usuario")
});

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

function cerrarMenuLateral(){
    const panel = document.querySelector(".menuLateral")   
}