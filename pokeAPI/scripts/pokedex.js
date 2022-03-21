const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    console.log(pokeNameInput.value);
    pokeName = pokeName.toLowerCase();
    const tipo=document.getElementById("tipo");
    const estadisticas=document.getElementById("estadisticas");
    const table = document.getElementById('habilidades');
    const table1 = document.getElementById('moves');

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./imgs/pokemon-sad.png")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            const nombre=document.getElementById("nombre");
            let nomUp=data.name
            nomUp[0]=nomUp[0].toUpperCase();

            console.log(nomUp);
            nombre.innerText=data.name;

            let pokeImg = data.sprites.front_default;
            let pokeType=data.types;
            let pokeStatistics=data.stats;
            let pokeMoves=data.moves;
            let id=data.id;
            const pokeId=document.getElementById("id");
            pokeId.innerText=id;
            let stats="";
            
            pokeImage(pokeImg);
            console.log(pokeImg);
            tipo.innerHTML="";

            pokeType.forEach(element => {
                newLi = document.createElement("li");
                newLi.appendChild(document.createTextNode(element.type.name));
                tipo.appendChild(newLi);
                
            });

            const estadisticas=document.getElementById("habilidades");
            estadisticas.innerHTML="";

            pokeStatistics.forEach(element => {
                let row=estadisticas.insertRow();
                let cell = row.insertCell();
                cell.setAttribute("class","habilidades");
                cell.textContent = element.stat.name;
                cell = row.insertCell();
                cell.textContent = element.base_stat;
            });
          
            const moves=document.getElementById("moves");
            moves.innerHTML="";

            for (let i=0; i<pokeMoves.length;){
                let row=moves.insertRow();
                for(let j=0;j<6;j++){
                    let cell= row.insertCell();
                    if (i<pokeMoves.length) {
                        i++;
                        cell.textContent=pokeMoves[i].move.name;    
                    }
                }
            }
            /*
            pokeMoves.forEach(element => {
                let row=moves.insertRow();
                for(let i=0;i<6;i++){
                    let cell = row.insertCell();
                    cell.textContent = element.move.name;
                }
                
                
                                
            });
*/
            for (let i=0; i<pokeMoves.length; i++){
                console.log(pokeMoves[i].move.name);
            }

        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}