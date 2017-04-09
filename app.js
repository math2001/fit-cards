"use strict";

class App {

    static updateDecks(decks) {
        this.decks = decks
        let html = ''
        decks.some((deck, index) => {
            html += `<tr>`
            deck.some((item) => {
                html += `<td>${item}</td>`
            })
            html += `<td><button class="use-deck" data-deck-index="${index}">Use!</button></td>`
            html += `</tr>`
        })
        document.querySelector('#groups').innerHTML = html
    }

    static use(deckIndex) {
        [this.heart, this.spade, this.club, this.diamond].some((element, index) => {
            element.textContent = this.decks[deckIndex][index + 1]
        })
    }

    static cacheDOM() {
        this.heart = document.querySelector('#heart')
        this.spade = document.querySelector('#spade')
        this.club = document.querySelector('#club')
        this.diamond = document.querySelector('#diamond')
        this.decksPopup = document.querySelector('#decks')
    }

    static app() {
        this.cacheDOM()
        fetch('decks.json').then(responce => responce.json()).then(decks => this.updateDecks(decks))

        document.body.addEventListener('click', e => {
            if (!e.target.classList.contains('use-deck')) { return }
            this.use(parseInt(e.target.getAttribute('data-deck-index')))
            this.decksPopup.classList.remove('active')
        })

    }

}

App.app()
