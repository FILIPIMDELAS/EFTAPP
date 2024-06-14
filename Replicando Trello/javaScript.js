const urlCards = "https://localhost:7039/api/Cards"
const urlChecklist = "https://localhost:7039/api/Checklists"

async function pegaCards(){
    const response = await fetch(urlCards)
    const data = await response.json()
    return(data)
}

async function filtraBloco(id){
    try{
        const data = await pegaCards()
        const FiltraData = data.filter(item => item.bloco == id)
        return(FiltraData)
    }catch (error){
        console.error('Erro ao: ', error)
        return[]
    }
}

async function pegaChecklist(){
    const response = await fetch(urlChecklist)
    const data = await response.json()
    return(data)
}

async function filtraCard(idBloco, idCard){
    try{
        const data = await pegaChecklist()
        const FiltraData = data.filter(item => item.bloco == idBloco && item.cards == idCard)
        return(FiltraData)
    }catch (error){
        console.error('Erro ao: ', error)
        return[]
    }
}

async function criaBloco(){
    const array = await pegaCards()
    const data = [... new Set(array.map(item => item.bloco))]

    data.map(function(titulo, indice){
        const div = document.createElement('div')
        div.classList.add('Bloco_Principal')
        div.id = data[indice]
        var idBloco = data[indice]
        div.ondblclick = function(){
            selecionaBloco(idBloco)
        }
        div.innerHTML = `
        <h4>${data[indice]}</h4>
        `

        const principal = document.getElementById('Principal')
        principal.appendChild(div)
    })
}

function novoBloco(){
    var titulo = document.getElementById()

    const div = document.createElement('div')
    div.classList.add('Bloco_Principal')
    div.id = titulo
    div.ondblclick = function(){
        selecionaBloco(titulo)
    }
    div.innerHTML = `
    <h4>${titulo}</h4>
    `

    const principal = document.getElementById('Principal')
    principal.appendChild(div)

    cadastraNovoBloco()
}

function selecionaBloco(idBloco){
    var todoConteudo = document.getElementById('Principal')

    while (todoConteudo.firstChild) {
        todoConteudo.removeChild(todoConteudo.firstChild);
    }

    criaCard(idBloco)
}

criaBloco()

async function criaCard(idBloco){
    const data = await filtraBloco(idBloco)

    data.map(function(titulo, indice){
        const section = document.createElement('section')
        section.id = idBloco + data[indice].cards
        section.classList.add('Section_Principal')
        section.innerHTML = `
            <header class="header_Card">
                <h4>${data[indice].cards}</h4>
                <i class="material-icons">delete</i>
            </header>
            <div id="div_conteudoCard${idBloco}${data[indice].cards}"></div>
            <footer>
                <button>
                    <i class="material-icons">add</i>
                    <p>Add Card</p>
                </button>
                <i id="icone${idBloco}${data[indice].cards}" class="material-icons icone_mais_funcoes" onclick="maisFuncoesCard('${idBloco}', '${data[indice].cards}')">more_horiz</i>
                <div class="div_mais_funcoes" id="div_mais_funcoes${idBloco}${data[indice].cards}">
                    <div>
                        <p>DELETE</p>
                        <i id="icone${idBloco}${data[indice].cards}" class="material-icons" onclick="">delete</i>
                    </div>
                    <div>
                        <p>EDITAR</p>
                        <i id="icone${idBloco}${data[indice].cards}" class="material-icons" onclick="">edit</i>
                    </div>
                </div>
            </footer>
        `
        
        const idBlocoD = document.getElementById('Principal')
        idBlocoD.appendChild(section)

        criaSubCard(idBloco, data[indice].cards)
    })
}

function novoCard(idBloco){
    const section = document.createElement('section')
    const titulo = document.getElementById('')
    section.id = idBloco + codigo
    section.classList.add('Section_Principal')
    principal.innerHTML = `
    <header class="header_Card">
                <h4>${titulo}</h4>
                <i class="material-icons">delete</i>
            </header>
            <div id="div_conteudoCard${idBloco}${titulo}"></div>
            <footer>
                <button>
                    <i class="material-icons">add</i>
                    <p>Add Card</p>
                </button>
                <i id="icone${idBloco}${titulo}" class="material-icons icone_mais_funcoes" onclick="maisFuncoesCard('${idBloco}', '${titulo}')">more_horiz</i>
                <div class="div_mais_funcoes" id="div_mais_funcoes${idBloco}${titulo}">
                    <div>
                        <p>DELETE</p>
                        <i id="icone${idBloco}${titulo}" class="material-icons" onclick="">delete</i>
                    </div>
                    <div>
                        <p>EDITAR</p>
                        <i id="icone${idBloco}${titulo}" class="material-icons" onclick="">edit</i>
                    </div>
                </div>
            </footer>
    `

    const idBlocoD = document.getElementById('Principal')
    idBlocoD.appendChild(section)

    cadastraNovoCard(idBloco)
}

function maisFuncoesCard(idBloco, idCards){
    var div = document.getElementById(`div_mais_funcoes${idBloco}${idCards}`)

    if(div.style.display == 'block'){
        div.style.display = 'none'
    }else{
        div.style.display = 'block'
    }
}

async function criaSubCard(idBloco, idCard){
    const data = await filtraCard(idBloco, idCard)

    data.map(function(titulo, indice){
        const div = document.createElement('div')
        div.id = idBloco + idCard + data[indice].subCard
        div.classList.add(`div_subCard_conteudo`)
        div.innerHTML = `
            <header>
                <h4>${data[indice].subCard}</h4>
                <i id="icone${idBloco}${idCard}${data[indice].subCard}" class="material-icons" onclick="expandMore('${idBloco}', '${idCard}', '${data[indice].subCard}')">expand_more</i>
            </header>
            <div id="Checklist${idBloco}${idCard}${data[indice].subCard}" class="div_checklist_conteudo"></div>
            <footer>
                <p>4/5 FILIPE</p>
                <i id="icone${idBloco}${idCard}${data[indice].subCard}" class="material-icons icone_mais_funcoes_subCard" onclick="maisFuncoessubCard('${idBloco}', '${idCard}', '${data[indice].subCard}')">more_horiz</i>
                <div class="div_mais_funcoes" id="div_mais_funcoes_Card${idBloco}${idCard}${data[indice].subCard}">
                    <div>
                        <p>DELETE</p>
                        <i id="icone${idBloco}${idCard}${data[indice].subCard}" class="material-icons" onclick="">delete</i>
                    </div>
                    <div>
                        <p>EDITAR</p>
                        <i id="icone${idBloco}${idCard}${data[indice].subCard}" class="material-icons" onclick="">edit</i>
                    </div>
                </div>
            </footer>
        `

        const idCards = document.getElementById(`div_conteudoCard${idBloco}${idCard}`)
        idCards.appendChild(div)

        criaChecklist(idBloco, idCard, data[indice].subCard)
    })
}

function novosubCard(idBloco, idCard){
    const div = createElement('div')
    const titulo = gerarCodigo()
    div.id = idBloco + idCard + codigo
    div.classList.add('div_subCard_conteudo')
    div.innerHTML = `
    <header>
                <h4>${titulo}</h4>
                <i id="icone${idBloco}${idCard}${titulo}" class="material-icons" onclick="expandMore('${idBloco}', '${idCard}', '${titulo}')">expand_more</i>
            </header>
            <div id="Checklist${idBloco}${idCard}${titulo}" class="div_checklist_conteudo"></div>
            <footer>
                <p>4/5 FILIPE</p>
                <i id="icone${idBloco}${idCard}${titulo}" class="material-icons icone_mais_funcoes_subCard" onclick="maisFuncoessubCard('${idBloco}', '${idCard}', '${titulo}')">more_horiz</i>
                <div class="div_mais_funcoes" id="div_mais_funcoes_Card${idBloco}${idCard}${titulo}">
                    <div>
                        <p>DELETE</p>
                        <i id="icone${idBloco}${idCard}${titulo}" class="material-icons" onclick="">delete</i>
                    </div>
                    <div>
                        <p>EDITAR</p>
                        <i id="icone${idBloco}${idCard}${titulo}" class="material-icons" onclick="">edit</i>
                    </div>
                </div>
            </footer>
    `

    const idCards = document.getElementById(`div_conteudoCard${idBloco}${idCard}`)
    idCards.appendChild(div)

    cadastraNovoSubCard(idBloco, idCard)
}

function maisFuncoessubCard(idBloco, idCards, idsubCard){
    var div = document.getElementById(`div_mais_funcoes_Card${idBloco}${idCards}${idsubCard}`)

    if(div.style.display == 'block'){
        div.style.display = 'none'
    }else{
        div.style.display = 'block'
    }
}

async function criaChecklist(idBloco, idCards, idsubCard){
    const array = await pegaChecklist()

    const data = array.filter(item => item.bloco == idBloco && item.cards == idCards && item.subCard == idsubCard)

    data.map(function(titulo, indice){
        var sectionS = document.createElement('section')
        sectionS.innerHTML = `
            <input type="checkbox" id="">
            <label for="">${data[indice].checklists}</label>
        `

        var Pai = document.getElementById(`Checklist${idBloco}${idCards}${idsubCard}`)
        Pai.appendChild(sectionS)
    })
}

function novoChecklist(idBloco, idCards, idsubCard){
    var titulo = document.getElementById('')

    const sectionS = document.createElement('section')
    sectionS.innerHTML = `
            <input type="checkbox" id="">
            <label for="">${titulo}</label>
        `

    var Pai = document.getElementById(`Checklist${idBloco}${idCards}${idsubCard}`)
    Pai.appendChild(sectionS)

    cadastraNovoChecklist(idBloco, idCards, idsubCard)
}

function expandMore(idBloco, idCards, idsubCard){
    var div = document.getElementById(`Checklist${idBloco}${idCards}${idsubCard}`)
    var icone = document.getElementById(`icone${idBloco}${idCards}${idsubCard}`)

    if(div.style.display == 'flex'){
        div.style.display = 'none'
        icone.innerHTML = 'expand_more'
    }else{
        div.style.display = 'flex'
        icone.innerHTML = 'keyboard_arrow_up'
    }
}

async function deletaBloco(idBloco){
    var dataBloco = await pegaCards()
    var dataCheck = await pegaChecklist()

    for(let i = 0; i < dataBloco.length; i++){
        if(dataBloco[i].bloco == idBloco){
            const idBlocoD = dataBloco[i].id
            const url = `https://localhost:7039/api/Cards${idBlocoD}`

            try{
                const response = await fetch(url,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(!response.ok){
                    throw new Error('Não foi possivel excluir o recurso')
                }else{
                    console.log('Exclusão realizado com sucesso!')
                }
            }catch (error) {
                console.error('Ocoreu um erro ao exluir o recurso: ', error.mensage)
            }
        }
    }

    for(let i = 0; i < dataCheck.length; i++){
        if(dataCheck[i].bloco == idBloco){
            const idCheckD = dataCheck[i].id
            const url = `https://localhost:7039/api/Checklists${idCheckD}`

            try{
                const response = await fetch(url,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(!response.ok){
                    throw new Error('Não foi possivel excluir o recurso')
                }else{
                    console.log('Exclusão realizada com sucesso!')
                }
            }catch (error){
                console.error('Ocorrreu um erro ao excluir o recurso: ', error.mensage)
            }
        }
    }

    idBlocoD.parentNode.removeChild(idBlocoD)
}

async function deletaCard(idBloco, idCard){
    var dataBloco = await pegaCards()
    var dataCheck = await pegaChecklist()

    for(let i = 0; i < dataCheck.length; i++){
        if(dataCheck[i].cards == idCard && data[i].bloco == idBloco){
            const idCard = dataCheck[i].id
            const url = `https://localhost:7039/api/Checklists${idCard}`

            try{
                const response = await fetch(url,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(!response.ok){
                    throw new Error('Não foi possivel excluir o recurso')
                }else{
                    console.log('Exclusão realizada com sucesso!')
                }
            }catch (error){
                console.error('Ocorreu um erro ao excluir o recurso: ', error.mensage)
            }
        }
    }

    for(let i = 0; i < dataBloco.length; i++){
        if(dataBloco[i].cards == idCard && data[i].bloco == idBloco){
            const idCard = dataBloco[i].id
            const url = `https://localhost:7039/api/Checklists${idCard}`

            try{
                const response = await fetch(url,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(!response.ok){
                    throw new Error('Não foi possivel excluir o recurso')
                }else{
                    console.log('Exclusão realizada com sucesso!')
                }
            }catch (error){
                console.error('Ocorreu um erro ao excluir o recurso: ', error.mensage)
            }
        }
    }
}

async function deletaSubCard(idBloco, idCard, idsubcard){
    const data = pegaChecklist()

    for(let i = 0; i < data.length; i++){
        if(data[i].subCard == idsubcard && data[i].cards == idCard && data[i].bloco == idBloco){
            const idsubCard = data[i].id
            const url = `https://localhost:7039/api/Checklists${idsubCard}`

            try{
                const response = await fetch(url,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(!response.ok){
                    throw new Error ('Não foi possivel excluir o recurso')
                }else{
                    console.log('Exclusão realizada com sucesso!')
                }
            }catch (error){
                console.error('Ocorreu um erro ao excluir o recuro: ', error.mensage)
            }
        }
    }
}

async function deletaChecklist(idCheck, idBloco, idCard, idsubcard){
    const data = pegaChecklist()

    for(let i = 0; i < data.length; i++){
        if(data[i].checklists == idCheck && data[i].subCard == idsubcard && data[i].cards == idCard && data[i].bloco == idBloco){
            const idChecklist = data[i].id
            const url = (`https://localhost:7039/api/Checklists${idChecklist}`)

            try{
                const response = await fetch(url,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(!response.ok){
                    throw new Error ('Não foi possivel excluir o recurso')
                }else{
                    console.log('Exclusão realizada com sucesso!')
                }
            }catch (error){
                console.error('Ocorreu um erro ao excluir o recuro: ', error.mensage)
            }
        }
    }
}

//Aqui vai ficar as functions que abre o input quando 2 cliques for dada

async function atualizaNomeBloco(){
    const dataCheck = await pegaChecklist()
    const dataCard = await pegaCards()

    const novoValorDigitado = document.getElementById('')

    const idAtualizaValorBloconoChecklist = function(){
                                            for(let i = 0; i < dataCheck.length; i++){
                                                if(dataCheck[i].cards == idCards && dataCheck[i].bloco == idBloco){
                                                    return(dataCheck[i].id)
                                                }
                                            }
                                        }

    const responseCard = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ novoValor: novoValorDigitado})
    }

    fetch(`https://localhost:7039/api/Checklists${idAtualizaValorBloconoChecklist}`, responseCard)
    .then(response => {
        if(!response.ok){
            throw new Error ('Erro ao atualizar coluna')
        }
        return response.json()
    })
    .then(data => {
        console.log('Coluna atualizada com sucesso: ', data)
    })
    .catch(error => {
        console.error('Erro ao atualizar a coluna', error)
    })

    const idAtualizaValorBloconoBloco = function(){
                                            for(let i = 0; i < dataCard.length; i++){
                                                if(dataCard[i].cards == idCards && dataCard[i].cards == idBloco){
                                                    return(dataCheck[i].id)
                                                }
                                            }
                                        }

    const responseBloco = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ novoValor: novoValorDigitado })
    }

    .fetch(`https://localhost:7039/api/Cards${idAtualizaValorBloconoBloco}`, responseBloco)
    .then(response => {
        if(!response.ok){
            throw new Error ('Erro ao atualizar coluna')
        }
        return response.json()
    })
    .then(data => {
        console.log('Coluna atualizada com suacesso: ', data)
    })
    .catch(error => {
        console.error('Erro ao atualizar a coluna', error)
    })
}

async function atualizaNomeCard(){
    const dataCheck = await pegaChecklist()
    const dataCard = await pegaCards()

    const novoValorDigitado = document.getElementById('')

    const idAtualizaValorCardnoChecklist = function (){
                                                for(let i = 0; i< dataCheck.length; i++){
                                                    if(dataCheck[i].card == idCards && dataCheck[i].bloco == idBloco){
                                                        return(dataCheck[i].id)
                                                    }
                                                }
                                            }

    const responseCard = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ novoValor: novoValorDigitado })
    }

    fetch(`https://localhost:7039/api/Checklists${idAtualizaValorCardnoChecklist}`, responseCard)
        .then(response => {
            if(!response.ok) {
                throw new Error('Erro ao atualizar coluna')
            }
            return response.json()
        })
        .then(data => {
            console.log('Coluna atualizada com sucesso: ', data)
        })
        .catch(error => {
            console.error('Erro ao atualizar a coluna', error)
        })

    const idAtualizaValorCardnoBloco = function(){
                                            for(let i = 0; i < dataCard.length; i++){
                                                if(dataCard[i].cards == idCards && dataCard[i].bloco == idBloco){
                                                    return(dataCard[i].id)
                                                }
                                            }
                                        }

    const responseBloco = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ novoValor: novoValorDigitado})
    }

    fetch(`https://localhost:7039/api/Cards${idAtualizaValorCardnoBloco}`, responseBloco)
    .then(response => {
        if(!response.ok){
            throw new Error('Erro ao atualizar coluna')
        }
        return response.json()
    })
    .then(data => {
        console.log('Coluna atualizada com sucesso: ', data)
    })
    .catch(error => {
        console.error('Erro ao atualizar a coluna', error)
    })
}

async function atualizaNomeSubCard(){
    const dataCheck = await pegaChecklist()

    const novoValorDigitado = document.getElementById('')

    const idAtualizaValorSubCardnoChecklist = function(){
                                                    for(let i = 0; i < dataCheck.length; i++){
                                                        if(dataCheck[i].subCard == idsubCard && dataCheck[i].card == idCard && dataCheck[i].bloco == idBloco){
                                                            return(dataCheck[i].id)
                                                        }
                                                    }
                                                }
    
    const responseCard = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ novoValor: novoValorDigitado })
    }

    fetch(`https://localhost:7039/api/Checklists${idAtualizaValorSubCardnoChecklist}`, responseCard)
    .then(response => {
        if(!response.ok){
            throw new Error('Erro ao atualizar coluna')
        }
        return response.json()
    })
    .then(data => {
        console.log('Coluna atuaizada com sucesso: ', data)
    })
    .catch(error => {
        console.error('Erro ao atualizar a coluna', error)
    })
}

// aqui vai ficar as funções de qunado o checkbox for marcado

async function cadastraNovoBloco(){
    const novoValorDigitado = document.getElementById('')
    
    const body = {
        id: 0,
        bloco: novoValorDigitado,
        cards: null,
        usuario: null
    }

    const response = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    fetch('https://localhost:7039/api/Cards')
    .then(response => {
        if(!response.ok){
            throw new Error ('Erro ao cadastrar novo Bloco')
        }
        return response.json()
    })
    .then(data => {
        console.log('Cadastro realizado com sucesso', data)
    })
    .catch(error => {
        console.error('Erro: ', error)
    })
}

async function cadastraNovoCard(idBloco){
    const novoValorDigitado = document.getElementById('')

    const bodyCheck = {
        id: 0,
        bloco: idBloco,
        cards: novoValorDigitado,
        subCard: null,
        checklists: null,
        status: null,
        data: null
    }

    const responseCheck = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyCheck)
    }

    fetch('https://localhost:7039/api/Checklists', responseCheck)
    .then(response => {
        if(!response.ok){
            throw new Error('Erro ao cadastrar novo Card')
        }
        return response.json()
    })
    .then(data => {
        console.log('Cadastro realizado com sucesso: ', data)
    })
    .catch(error => {
        console.error('Erro: ', error)
    })

    const bodyCard = {
        id: 0,
        bloco: idBloco,
        cards: novoValorDigitado,
        usuario: null
    }

    const responseCard = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyCard)
    }

    fetch('https://localhost:7039/api/Cards', responseCard)
    .then(response => {
        if(!response.ok){
            throw new Error('Erro ao cadastrar novo Card')
        }
        return response.json()
    })
    .then(data => {
        console.log('Cadastro realizado com sucesso: ', data)
    })
    .catch(error => {
        console.error('Erro: ', error)
    })
}

async function cadastraNovoSubCard(idBloco, idCards){
    const novoValorDigitado = document.getElementById('')

    const body = {
        id: 0,
        bloco: idBloco,
        cards: idCards,
        subCard: novoValorDigitado,
        checklists: null,
        status: null,
        data: null
    }

    const response = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    fetch('https://localhost:7039/api/Checklists', response)
    .then(response => {
        if(!response.ok){
            throw new Error('Erro ao cadastrar novo Card')
        }
        return response.json()
    })
    .then(data => {
        console.log('Cadastro realizado com sucesso: ', data)
    })
    .catch(error => {
        console.error('Erro: ', error)
    })
}

async function cadastraNovoChecklist(idBloco, idCards, idsubCard){
    const novoValorDigitado = document.getElementById('')
    const body = {
        id: 0,
        bloco: idBloco,
        cards: idCards,
        subCard: idsubCard,
        checklists: novoValorDigitado,
        status: 'PENDENTE',
        data: null
    }

    const response = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    fetch('https://localhost:7039/api/Checklists', response)
    .then(response => {
        if(!response.ok){
            throw new Error('Erro ao cadastrar novo Card')
        }
        return response.json()
    })
    .then(data => {
        console.log('Cadastro realizado com sucesso: ', data)
    })
    .catch(error => {
        console.error('Erro: ', error)
    })
}
