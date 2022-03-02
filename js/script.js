let tipoDaCamisa = null;
let tipoDeGola = null;
let tipoDoTecido = null;
let imgURL = null;
let img = null;
let nome = null;
let listaDaAPI = null;
let object = {
    model: "",
    neck: "",
    material: "",
    image: "",
    owner: "",
    author: ""
}

function pedirNome() {
    nome = prompt("Por favor, insira o seu nome para continuarmos");
    console.log(nome);
    mostrarLoja();
}

// Funções responsáveis por criar as camisetas

function selecionarCamisa(camisa, classe) {
    tipoDaCamisa = camisa;
    console.log(tipoDaCamisa);
    let camisaClicada = document.querySelector(".camisetas .selecionar");
    if (camisaClicada != null) {
        camisaClicada.classList.remove("selecionar");
    }
    let camisaSelecionada = document.querySelector(`.${classe}`);
    camisaSelecionada.classList.add("selecionar");
    validarPedido();
}

function selecionarGola(gola, classe) {
    tipoDeGola = gola;
    console.log(tipoDeGola);
    let camisaClicada = document.querySelector(".golas .selecionar");
    if (camisaClicada != null) {
        camisaClicada.classList.remove("selecionar");
    }
    let camisaSelecionada = document.querySelector(`.${classe}`);
    camisaSelecionada.classList.add("selecionar");
    validarPedido();
}

function selecionarTecido(tecido, classe) {
    tipoDoTecido = tecido;
    console.log(tipoDoTecido);
    let camisaClicada = document.querySelector(".tecidos .selecionar");
    if (camisaClicada != null) {
        camisaClicada.classList.remove("selecionar");
    }
    let camisaSelecionada = document.querySelector(`.${classe}`);
    camisaSelecionada.classList.add("selecionar");
    validarPedido();
}

//Função responsável por verificar a URL da imagem

function verificarURL() {
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

function validarPedido() {
    if (tipoDaCamisa != null && tipoDeGola != null && tipoDoTecido != null) {
        let confirmarPedido = document.querySelector(".pedido-final");
        confirmarPedido.classList.add("botao");
    }
}

function confirmarPedido() {
    if (verificarURL() == false) {
        alert("Por favor, insira um link válido");
    }
    else {
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

function sucesso() {
    alert("Encomenda realizada com sucesso");
    ultimosPedidos();
}

function falha() {
    alert("Ops, não conseguimos processar sua encomenda")
}

//Função responsável por atualizar os últimos pedidos

function ultimosPedidos() {
    let request = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    request.then((mensagem) => { carregaUltimosPedidos(mensagem) });
}

function carregaUltimosPedidos(lista) {
    listaDaAPI = lista.data;
    console.log(listaDaAPI);
    let criarOsPedidos = document.querySelector(".rodape");
    criarOsPedidos.innerHTML = ""
    for (i = 0; i < lista.data.length; i++) {
        criarOsPedidos.innerHTML += `
            <figure class="ultimos-pedidos" onclick="encomendar('${lista.data[i].id}')">
                <img src="${lista.data[i].image}">
                <p><b>Criador:</b> ${lista.data[i].owner}</p>
            </figure>
            `;
    }
}

function encomendar(identificador) {
    let confirmacao = confirm("Deseja concluir esta encomenda?");
    if (confirmacao == true) {
        for (j = 0; j < listaDaAPI.length; j++) {
            if (listaDaAPI[j].id == identificador) {
                object = {
                    model: listaDaAPI[j].model,
                    neck: listaDaAPI[j].neck,
                    material: listaDaAPI[j].material,
                    image: listaDaAPI[j].image,
                    owner: nome,
                    author: listaDaAPI[j].owner
                }
                console.log(object);
                let promisse = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", object);
                promisse.then(sucesso);
                promisse.catch(falha);
            }
        }
    }

}

// Função responsável por carregar a página

function mostrarLoja() {
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
        <div class="rodape"></div>
    </footer>
    `;
    ultimosPedidos();
}

pedirNome();