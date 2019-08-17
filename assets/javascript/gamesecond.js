let PickStatus = {
    PICKED: 0,
    PICK_OK: 1,
    MATCH: 2,
    NOT_MATCH: 3 
};

function PikaPikaGame(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.init = function() {
        // create cards and shuffle
        this.cards = [];
        for (let idx = 0; idx < rows * cols; ++ idx) {
            this.cards.push(new Card(Math.floor(idx / 2), false));
        }
        this.cards.sort((lhs, rhs)=>{ return Math.random() - 0.5; })
    };
    this.history = null;
    this.cards = [];
    this.pick = function(idx) {

        if (this.cards[idx].picked) {
            return PickStatus.PICKED;
        }

        // pick first
        if (this.history === null) {
            this.cards[idx].picked = true;
            this.history = this.cards[idx];
            return PickStatus.PICK_OK;
        }
        
        // pick second

        // match
        if (this.cards[idx].label === this.history.label) {
            this.card[idx].picked = true;
            this.history = null;
            return PickStatus.MATCH;
        }

        // not match
        this.history.picked = false;
        this.history = null;
        return PickStatus.NOT_MATCH;
    };
    this.is_win = function() {
        for (let card in this.cards) {
            if (card.picked != true) {
                return false;
            }
        }
        return true;
    };
}

function Card(label, picked) {
    this.label = label;
    this.picked = picked;
}

let g_game = null;

window.onload = function() {

    g_game = new PikaPikaGame(4, 4);
    g_game.init();
    display_game(g_game);
    console.log(g_game);
    $('#app').on('click', function(e) {
        let pick_status = g_game.pick($(e.target).index());
        switch (pick_status) {
            case PickStatus.PICKED:
                break;
            case PickStatus.PICK_OK:
                $(e.target).class = "picked";
        }
    })
}

function display_game(g_game) {
    let app = $('#app');
    g_game.cards.forEach((card)=> {
        let card_div = $('<div class="hidden">' + card.label + '</div>');
        card_div.text(card.label);
        console.log(card_div) 
        app.append(card_div);
    });
}