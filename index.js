document.addEventListener("DOMContentLoaded",
    function () {
        //region Observador de imagenes task
        const imgOptions ={};
        const imgObserver = new IntersectionObserver((entries,imgObserver)=>{
            entries.forEach((entry)=>{
                if(!entry.isIntersecting)return;
                const img = entry.target;
                var dataImage = img.getAttribute("data-image");
                img.src=dataImage;
                imgObserver.unobserve(img);
            });
        },imgOptions)



        //enderegion
        //#region Consumo de API con fetch
        const fetchPokemon = async (endpoint) => {
            let data;
            try {
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        // headers section removed to avoid preflight request
                    },
                });
                data = await response.json();
            } catch (error) {
                console.log(error);
            }
            return data.pokemon_species;
        };
        //#endregion
        //#region Ordenar numeros de pokemon
        function orderNumber(str) {
            var mySubstring = str.substring(
                str.lastIndexOf("s/") + 2, str.lastIndexOf("/")
            )
            return mySubstring;
        }
        //#endregion
        //#region Agregar Pokemons al HTML



        async function getPokemons(numero, toggle) {
            let endpoint = `https://pokeapi.co/api/v2/generation/${numero}`;

            var container = document.getElementById("container");
            container.innerHTML = "";
            let pokemons = [];
            pokemons = await fetchPokemon(endpoint);
            for (let j = 0; j < pokemons.length; j++) {
                pokemons[j].nr = orderNumber(pokemons[j].url)
            }
            pokemons.sort((a, b) => a.nr - b.nr)
            pokemons.forEach((item) => {
                let numero3decimales = orderNumber(item.url)
                if (numero3decimales < 10) {
                    numero3decimales = "0" + numero3decimales;
                }
                if (numero3decimales < 100) {
                    numero3decimales = "0" + numero3decimales;
                }
                let divItem = document.createElement("li")
                divItem.classList.add("item")
                var img = new Image()
                const toggleurl = toggle ? "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" : "https://serebii.net/pokemongo/pokemon/"

                img.src = "https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif"

                const urlImage = `${toggleurl}${numero3decimales}.png`
                img.setAttribute("data-image", urlImage)
                img.setAttribute("class", "pokeimage");
                img.setAttribute("alt", item.name);

                divItem.innerHTML = `<div>${orderNumber(item.url)}- ${item.name}</div>`
                divItem.appendChild(img)
                container.appendChild(divItem);
                imgObserver.observe(img)
            })


        }
        //#endregion
        //#region Agregar generaciones
        var numero=1;
        getPokemons(numero)
        var toggle =false;
        //aqui estamos referenciando directo el id de btnicono sin el get element by id
        btnicono.addEventListener("click",function(){
            toggle =!toggle;
            getPokemons(numero,toggle)
        })
        var geners = [
            "generation-1",
            "generation-2",
            "generation-3",
            "generation-4",
            "generation-5",
            "generation-6",
            "generation-7",
        ];
        var filters = document.getElementById("filters");
        var gen = "";
        for (let i = 0; i < geners.length; i++) {
            gen += `<input class="radio-gens" type="radio" id=${geners[i]} value=${i + 1
                }
        name="generation" checked><label for=${geners[i]} class="label_genes">${geners[i]}</label>`;
        }
        filters.innerHTML = gen;
        filters.addEventListener("click",function(e){
            let targ = e.target.type
            if(targ=="radio"){
                getPokemons(e.target.value,toggle)
                title.innerHTML="Pokemon "+ e.target.id
            }
        })
   
//#endregion

});

