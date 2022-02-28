let tipoDaCamisa = null;
let tipoDeGola = null;
let tipoDoTecido = null;
let imgURL = null;
let img = null;
let nome = null;
let object = {
    model: "",
	neck: "",
	material: "",
	image: "",
	owner: "",
	author: ""
}

function pedirNome(){
    nome = prompt("Por favor, insira o seu nome para continuarmos");
    console.log(nome);
    mostrarLoja();
}

// Funções responsáveis por criar as camisetas

function selecionarCamisa(camisa, classe){
    tipoDaCamisa = camisa;
    console.log(tipoDaCamisa);
    let camisaClicada = document.querySelector(".camisetas .selecionar");
    if (camisaClicada != null){
        camisaClicada.classList.remove("selecionar");
    }
    let camisaSelecionada = document.querySelector(`.${classe}`);
    camisaSelecionada.classList.add("selecionar");
    validarPedido();
}

function selecionarGola(gola, classe){
    tipoDeGola = gola;
    console.log(tipoDeGola);
    let camisaClicada = document.querySelector(".golas .selecionar");
    if (camisaClicada != null){
        camisaClicada.classList.remove("selecionar");
    }
    let camisaSelecionada = document.querySelector(`.${classe}`);
    camisaSelecionada.classList.add("selecionar");
    validarPedido();
}

function selecionarTecido(tecido, classe){
    tipoDoTecido = tecido;
    console.log(tipoDoTecido);
    let camisaClicada = document.querySelector(".tecidos .selecionar");
    if (camisaClicada != null){
        camisaClicada.classList.remove("selecionar");
    }
    let camisaSelecionada = document.querySelector(`.${classe}`);
    camisaSelecionada.classList.add("selecionar");
    validarPedido();
}

//Função responsável por verificar a URL da imagem

function verificarURL(){
let expression = /[-a-zA-Z0-9@:%\+.~#?&//=]{2,256}.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%\+.~#?&//=]*)?/gi;
let regex = new RegExp(expression);
    imgURL = document.querySelector(".URL");
    img = imgURL.value;
    console.log(img)
    if (!img.match(regex)) {
        imgURL.value = ""
        imgURL.placeholder = "Insira um link válido";
        return false;
    }
    else {
        return true;
    }
}


//Funções responsáveis por validar o pedido

function validarPedido(){
    if (tipoDaCamisa != null && tipoDeGola != null && tipoDoTecido != null ){
        let confirmarPedido = document.querySelector(".pedido-final");
        confirmarPedido.classList.add("botao");
    }
}

function confirmarPedido(){
    if (verificarURL() == false){
        alert("Por favor, insira um link válido");
    }
    else{
        object = {
            model: tipoDaCamisa,
            neck: tipoDeGola,
            material: tipoDoTecido,
            image: img,
            owner: nome,
            author: nome
        }
        console.log(object);
        let promisse = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", object);
        promisse.then(sucesso);
        promisse.catch(falha);
    }
}

function sucesso(){
    alert("Encomenda realizada com sucesso");
}

function falha(){
    alert("Ops, não conseguimos processar sua encomenda")
}

function mostrarLoja(){
    let bodyHTML = document.querySelector("body");
    bodyHTML.innerHTML += `
    <header>
        <img src="img/Logo.png" alt="Logo Fashion Driven">
    </header>

    <section>

        <div class="galeria">
            <h2>Escolha o modelo</h2>
            <div class="camisetas">
                <figure class="c1" onclick="selecionarCamisa('t-shirt', 'c1')" > 
                    <img src="img/tshirt.png" alt="Camiseta simples">
                    <figcaption>T-shirt</figcaption>
                </figure>
                <figure class="c2"  onclick="selecionarCamisa('top-tank', 'c2')" >
                    <img src="img/Camiseta.png" alt="Camiseta regata">
                    <figcaption>Camiseta</figcaption>
                </figure>
                <figure class="c3"  onclick="selecionarCamisa('long', 'c3')" >
                    <img src="img/Mangalonga.png" alt="Camiseta manga longa">
                    <figcaption>Manga longa</figcaption>
                </figure>
            </div>

            <h2>Escolha a gola</h2>
            <div class="golas">
                <figure class="g1" onclick="selecionarGola('v-neck', 'g1')">
                    <img src="img/GolaV.png" alt="Gola V">
                    <figcaption>Gola V</figcaption>
                </figure>
                <figure class="g2" onclick="selecionarGola('round', 'g2')">
                    <img src="img/GolaRedonda.png" alt="Gola redonda">
                    <figcaption>Gola redonda</figcaption>
                </figure>
                <figure class="g3" onclick="selecionarGola('polo', 'g3')">
                    <img src="img/GolaPolo.png" alt="Gola Polo">
                    <figcaption>Gola polo</figcaption>
                </figure>
            </div>

            <h2>Escolha o tecido</h2>
            <div class="tecidos">
                <figure class="t1" onclick="selecionarTecido('silk', 't1')">
                    <img src="img/Seda.png" alt="Gola V">
                    <figcaption>Seda</figcaption>
                </figure>
                <figure class="t2" onclick="selecionarTecido('cotton', 't2')">
                    <img src="img/Algodão.png" alt="Gola redonda">
                    <figcaption>Algodão</figcaption>
                </figure>
                <figure class="t3" onclick="selecionarTecido('polyester', 't3')">
                    <img src="img/Poliester.png" alt="Gola Polo">
                    <figcaption>Poliéster</figcaption>
                </figure>
            </div>

            <h2>Imagem de referência</h2>
            <div class="inputs">
                <input class="URL" type="url" placeholder="Insira o link">
                <button class="pedido-final" onclick="confirmarPedido()">Confirmar pedido</button>
            </div>
        </div>
    </section>

    <aside>
        <img src="img/ilustração.png" alt="Ilustração de um manequim com uma roupa fashion">
    </aside>

    <footer>
        <h2>Últimos pedidos</h2>
        <div class="rodape">
            <div class="ultimos-pedidos">
                <img src="data:image/jpeg;base64,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">
                <p>Criador:</p>
            </div>
            <div class="ultimos-pedidos">
                <img src="data:image/jpeg;base64,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">
                <p>Criador:</p>
            </div>
            <div class="ultimos-pedidos">
                <img src="data:image/jpeg;base64,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">
                <p>Criador:</p>
            </div>
            <div class="ultimos-pedidos">
                <img src="data:image/jpeg;base64,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">
                <p>Criador:</p>
            </div>
            <div class="ultimos-pedidos">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QEA8PEA4PEBUVEBUXEBUVFhAXERUVFREXFxUVFxUYHSggGholHRUaIjEhJSkrLi4uFyAzODMsNygtLisBCgoKDg0OGhAQGy4lICYtLS0tLS0tLS0tLTUtLSstLTUtLS0tLS0tLS0tLS0tLTUtKy0tKy0tLS4tLS0tLSstLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xAA9EAACAQIDBQUFBgUDBQAAAAAAAQIDEQQhMQUSQVFhBiJxgZETobHB8AcUMkJS0SNicqLxJIKSU4OTstL/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEAQUG/8QAJhEBAAICAQQBBAMBAAAAAAAAAAECAxEEEhMhMVFBYXGRIjKhBf/aAAwDAQACEQMRAD8A7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8lJJNtpJavgj6c97b7blVq/c6cnGnF/xWvzz/T/AEr4+BXkyRSNyJXa/brD07woRdeXB33ad/6tX5K3Uq1Xt/j5PL2EOVoN285SZE1od53isuKIucLyPNy58kz71+HYWGn2v2jUdvvTV+UKKt/aZafbHaNN51o1Ok4Qt/ak/eV2leHT5oz+1Us1b5lXdvrxaf24uezftDquUY18LGV2lem2peUJXv6nQU7nOPs82K6lV4qonu08qV/zTtm/9vxfQ6QehxJyWp1Xn8AADWAAAAAAAAAAAAAAAAAAAAAADxVqxirykorq0jSqbbwsda0f7n8Ecm0R7l2KzPqFX212sxuDx3s6+Gj91crQnGM3KSaWe9e28nfu2LpQrRnGM4tSi1dNcUyIxu0tn4inOlUqU6kWu8rSy66ZNcyr9h9v08PLF4OtVlKNOq3QlaTbg2+CWXB/7mZ+70X1Mxqf8W9uZr68wuu2sesPQq1srxj3esnlFerRxytWk23q2278W282dD7RY+hilCh7Z04KSlUluyu7LKKVut8yKhsDZj1x9RdMo/GJj5Fpy5NUmNR94Q6LfCoSqycWrrPXma9KHRrrxOhUOyeypW/1U5/9ymvhFMlaHYrZys/YOfVzqNe52ORxMlvcx+3J8OVNWvn66Fm7M9k6uIcZ1ISpUlq2rTn0inour8rnQ8JsXC0WnTw1KLWj3Vvf8nmb5fj4Wp3aduMWGw8KcI04RUYxVopaIygG+I04AAAAAAAAAAAAAAAAAAAAAPjdsytbV7TJXjRs7az/APlfM0e3G39z/TU3w/ite6P7lAxW0ZJWTa8NfFmXPmmvirZx+P1+ZWLG9oO87venb8zbf+CLe1ajW9Kbs3ZKKSXuzKrWk+9K+eTd9X0NunJ2ebeWXJK+bMF5t9XsU42KIT1Xaqs3Zp7uTfBPLPiRLqyhKcqbd7q7s3Jqzv6fI0MdWUoyu5WW5mnnbe5GOjiXH2Tee9e/ioNEIifbXixUivpJYXH15O83OzyXFXtl9dCQoYis5wShdXzd5JteHMiNnbTUVJN3WXLi3z4fudD7I7Rw1RWq23uF/D3GnHSLKeVaMUTMU2i3NRm4tX5fiuvHM9YHb1WlJqEpKzeWqduaz+Bf/u2EnFS3IS62TfX4FN7Z4XDQV4d2Uc4taW5F04rU8xLz8ObHmt0Wqsmw+1NOu1CpaE+HJ/sWI4HVxD3lKNRxu7wa4Ph5P9zp3YTtMsVD2NR/xIqyf6ktfQtw5urxb2r53/PnFXuU9fX7LcADQ8oAAAAAAAAAAAAAAAAAAA1tpYpUaVSo/wAsW0ub4L1Nkrnbivu4dRTteWfgv8o5adRtKleq0Q5pjq7qVZtu9223zfFkXi33mtePgr6fXM3Kkdxt+/qyOaylK+ryZ5seZ29vHXTVmr3v4rwPVfE2Vk/ypdGzHVk2o2vyfyNWrLOyfrw4/MWjctNWbeXd3s81nfjdniFS+edt+SXo9DHiIvdj0tfloeMHU7ii/wBUvTP0ORTwvrZieIcYyj0T56Nfsb+zsfUh+Fy3W7R4cbtZv4kc4d2LeV4583fiYas2luOW9aTtb8L69S2K/DTExbxK87J7Uy7yVZ35PLXVWaNXFbbqSTi5bycWoWd2s3F3+uRUotS1cY59b9L9D1GSX6cn1vLkdnbleLii24hJ0q8lJpSXeUoxfHvdFpmZ9mbdnQrU68E4yUoufK6dpLwdvcRUK0e83dXbUY6tPVO76+YvdTatu70XwvfP3fi9xD1O2qaVvXUw/TuAxUa1KnVjpKKa8+BsFS+zPFOeBhF/lyXh9Itp6ETuNvhM2Pt5LU+JAAdVgAAAAAAAAAAAAAAABUu32cILg016tFtK72uo70ab8fiiGSN1lZinV4lzPFwsm2uOXO9tSFnB23fJeZZNtUs7J2yd0RTjlvPg8lzXPIw1jT3cU/x2ia8t1KNrOzafHJGhKO9q+8tOXn5EvjaV3J7veXHh0/c0o4Wd95+f1bQ4viI0169/Z6K97a87GCNpWWnu4MkJ0n93atndvK3A0qeH70E9N34kqkMMYOKg3xVnzNTfzi1ZWS0vwWpOYjBq8X/NlloaqwkE3fJ8CyJX0vDU3ZJbyX4lZ5eD48THdqVrWTsn4ZEpKmsssuh8xFO7y8n8AujK0JVI3k1Fp791fNKPjre5nwUVJwi7RSbva93du3hwM62XdqV9XmuJK7G2bHe8ZL3aK5Ca7WTnrWNupfZhTccO09ePqy6ld7G0Nyk8uEfmWI21jUQ+M5FurLafuAAkpAAAAAAAAAAAAAAAACM7QUd6lfk7+WhJmOvT3oyi+KscmNuxOpcr2vDO/j6fSIKrUTV+cvTMsfaOO45Ras08yrTSaSTzvp7zBaNS93jeaQySp72d7cvBas16t1dW4eefA36FOM7ptLd8L3MOKo5Xtn+xBoj3pqU6Fo2s2muWXXM0a1KziuSy6ciX9st1prdaVr58czSrLeknZaZeSJVnylWGKMcoPjnfwRinT73Diblam4W/p9fq5rKG/Jv1t4k4lKIeWk2loKlPPXgrHuSSfdzR5jdyJQlLLTjpmuhN7Eob045aLP1IzCUG87eD6ly7KbMbknbVqxKsblm5GTprMr9sOjuUY9Xf5fIkDzTgopRXBWPRqfOzO5AAHAAAAAAAAAAAAAAAAAAAUT7QsDZqql+JWfic9Uo+0zTvwzytxO1dotm/ecPUpL8Vr0/6lp66eZxXFRtN7ycZJtOLWd9GY89dTt6/Ay7rNZbFC2d13t5J8stPgbcKUbtSd+K+SI5Vnd52TVvO37je3c3JN5pZ8vkZW/W3vGzzfe4pq1ueZrSh3ot9Pjc2p1VKKTTvdcOHExqPflZ2zVr/ABJxOlkeIYa3eSlaztZ5/wA1vmYaOFunZ3y08yR3Xe8k1fN8/q5loQteEYrPJtq7TtmS6kt+EdSw13pq0jYw+DWbabs/Kxtexgn+KTf5Xwv4m3RoZbuvlzVuI6plGbs+z6N1CNtVllpc6D2bwSjHetplHx4v65lf7PbNb3crN6dFzZeqNJRiorRI14qa8vE5mbqnph7ABcwAAAAAAAAAAAAAAAAAAAAAAc8+0fs1JqWNoQu1nXitdPxpfH15nQwyNqxaNSsx5Jx26ofnOniN7J3tb3n2Fd8Ho7dTp/aX7N6VecquGq/dpt3lFx3qTfNJNOPlddCn4v7OtrQd4woVX/JUSv8A81EyWwT9HsY+bjmPekROvlK30z7Qr3alnbR6P60MmK7I7Whm8BV8YulP3Qk2as9kbQikvuON/wDDWt/6kO1b4aK8nFr3CSxNRSazTss9OhIUKsVFQWrzfK5A0NlY96YDGvP/AKNVe9omcD2b2rUndYOpBcHUlCCXk3f3Ee3f4c72KY1Noe6UVJxVklq+DfFFh2Nsl1JZRfO2pv7C7F1YrexVWCf6aN36zkvgvMuGCwVOjHdpx3Vx1bb5tvNmnHin3LDyebX+tJeNn4JUo24vV/JG2AaXlzOwABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHw+gAAAAAAAAAAAAAAAAAAAAAAH/9k=">
                <p>Criador:</p>
            </div>
        </div>
    </footer>
    `;

}

pedirNome();
