"use strict";
var EisdealerOperator;
(function (EisdealerOperator) {
    let url = "https://fabiankowatschgis.herokuapp.com";
    document.getElementById("button").addEventListener("click", retrieveData);
    async function retrieveData() {
        let response = await communicate(url + "/retrieve");
        let orders = (JSON.parse(await response.text()));
        console.log(orders);
        let ausstehend = document.getElementById("ausstehend");
        orders.forEach(e => {
            let div = document.createElement("div");
            div.setAttribute("class", "item");
            div.setAttribute("id", e._id);
            let liste = document.createElement("ul");
            let listelement = document.createElement("li");
            listelement.innerHTML = "Bestellnummer: " + e._id;
            let listelement1 = document.createElement("li");
            listelement1.innerHTML = "Vorname: " + e.fname;
            let listelement2 = document.createElement("li");
            listelement2.innerHTML = "Nachname: " + e.lname;
            let listelement3 = document.createElement("li");
            listelement3.innerHTML = "Adresse: " + e.adress;
            liste.appendChild(listelement);
            liste.appendChild(listelement1);
            liste.appendChild(listelement2);
            liste.appendChild(listelement3);
            div.appendChild(liste);
            let edit = document.createElement("button");
            edit.innerHTML = "Bestellung bearbeiten";
            edit.addEventListener("click", hndEdit);
            div.appendChild(edit);
            let eisdiv = document.createElement("div");
            eisdiv.setAttribute("class", "inneritem");
            e.ices.forEach(element => {
                let ul = document.createElement("ul");
                for (const key in element) {
                    let li = document.createElement("li");
                    li.innerHTML = key + ": " + element[key] + "";
                    ul.appendChild(li);
                }
                eisdiv.appendChild(ul);
            });
            div.appendChild(eisdiv);
            if (localStorage.getItem(e._id) != "active")
                ausstehend.appendChild(div);
            else {
                let active = document.getElementById("aktiv");
                active.appendChild(div);
                changeButton(edit);
            }
        });
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        return response;
    }
    function hndEdit(_event) {
        let button = _event.target;
        let aktiv = document.getElementById("aktiv");
        let div = button.parentElement;
        localStorage.setItem(div.getAttribute("id"), "active");
        aktiv.appendChild(button.parentNode);
        changeButton(button);
    }
    function changeButton(b1) {
        let newbutton = document.createElement("button");
        let parent = b1.parentElement;
        newbutton.innerHTML = "Löschen";
        newbutton.addEventListener("click", hndDelete);
        parent.removeChild(b1);
        parent.appendChild(newbutton);
    }
    async function hndDelete(_event) {
        let active = document.getElementById("aktiv");
        let ziel = _event.target;
        let parent = ziel.parentElement;
        let info = "/delete?id=" + parent.getAttribute("id");
        await communicate(url + info);
        active.removeChild(parent);
    }
})(EisdealerOperator || (EisdealerOperator = {}));
//# sourceMappingURL=client.js.map