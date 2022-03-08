const d = document,
    $links = d.querySelector('.link'),
    $main = d.querySelector('main')


let POKEAPI = 'https://pokeapi.co/api/v2/pokemon'





async function loadPokemon(url) {
    try {
        $main.innerHTML = '<img src="assets/spinning-circles.svg">'
        let res = await fetch(url)
        let json = await res.json()
        let $template = ''
        let $prevLink
        let $nextLink


        if (!res.ok) {
            throw {
                status: res.status,
                statusText: res.statusText
            }
        }


        for (let i = 0; i < json.results.length; i++) {
            const element = json.results[i];
            try {
                let res = await fetch(element.url)
                let json = await res.json()
                if (!res.ok) {
                    throw {
                        status: res.status,
                        statusText: res.statusText
                    }
                }
                $template += `
                    <figure>
                       <img src='${json.sprites.front_default}'>
                     <figcaption>
                        <span class='name'>${element.name}</span> 
                        <span class='type ${json.types[0].type.name}'> ${json.types[0].type.name} </span>
                     </figcaption> 
                    
                    </figure>
                `
            } catch (error) {
                $template += `
                    HUBO UN ERROR ${error.statusText}
                `
            }

        }



        console.log(json)

        $nextLink = json.next ? `<a href="${json.next}">➡️</a>` : "";
        $prevLink = json.previous ? `<a href="${json.previous}">⬅️</a>` : "";

        $links.innerHTML = $prevLink + " " + $nextLink

        setTimeout(() => {
            $main.innerHTML = $template
        }, 500);


    } catch (err) {
        let message = err.statusText || 'Ocurrio un problema'
        $main.innerHTML = `${message} - ${err.status}`
    }


}





d.addEventListener('DOMContentLoaded', e => {
    loadPokemon(POKEAPI)
})


d.addEventListener('click', (e) => {
    if (e.target.matches('.link a')) {
        e.preventDefault()
        loadPokemon(e.target.getAttribute('href'))
    }
})


//CUANDO ES FOR ES UN TECNICA BLOQUEADO, ESPERA QUE TERMINE ANTES DE PASAR
//FOREACH --> PASA SIN ESPERAR EL RESULTADO AL ITERAR