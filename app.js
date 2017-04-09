"use strict";

class App {

    static renderOptions(decks) {
        let html = ''
        decks.some((deck) => {
            html += `<tr>`
            deck.some((item) => {
                html += `<td>${item}</td>`
            })
            html += `<td><button>Use!</button></td>`
            html += `</tr>`
        })
        document.querySelector('#groups').innerHTML = html
    }

    static app() {
        fetch('decks.json').then(responce => responce.json()).then(decks => this.renderOptions(decks))
    }

}

App.app()
