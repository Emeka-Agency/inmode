// CONSTANTES

const _ids = {};
const _clefs = {};

// CHAÎNE DE CARACTÈRES ALÉATOIRE

function chaineAleatoire(length = 8) {
    // console.log("chaineAleatoire");
    return Math.random().toString(16).substr(2, length);
};

// IDENTIFIANTS

function creerId(prefixe = '') {
    // console.log("creerId");
    if(typeof prefixe != 'string') {
        return prefixe = '';
    }
    let _temp = prefixe + chaineAleatoire(8);
    while(_ids[_temp]) {
        _temp = prefixe + chaineAleatoire(8);
    }
    _ids[_temp] = true;
    return _temp;
}

function detruireId(_id) {
    // console.log("detruireId");
    delete _ids[_id];
}

// CLEFS

function ajouterClef(_id, prefixe = '') {
    // console.log("ajouterClef");
    if(_clefs[_id]) {
        // console.log("Exists on keys");
        return _id;
    }
    // console.log("Does not exists on keys");
    let _clef = prefixe + chaineAleatoire(8);
    while(_clefs[_id]) {
        _clef = prefixe + chaineAleatoire(8);
    }
    _clefs[_id] = _clef;
    return _clef;
}

function avoirClef(_id) {
    // console.log("avoirClef");
    return _clefs[_id] || null;
}

function detruireClef(_clef) {
    // console.log("detruireClef");
    delete _clefs[_clef];
}

// COUPLE

/**
 * 
 * @param {string} _id Identifiant si existant
 * @param {string} _prefix Préfixe à mettre devant l'id final
 * @returns {string} Identifiant créé
 */
function creerCouple(_id, _prefix = '') {
    // console.log("creerCouple");
    try {
        if(_id.length == 0) {
            _id = creerId(_prefix);
        }
        ajouterClef(_id, _prefix);
        return avoirClef(_id);
    }
    catch(err) {
        // console.log(err);
        return false;
    }
}

/**
 * 
 * @param {string} _id Identifiant à supprimer
 * @returns {boolean} Résultat de l'opération de suppression
 */
function detruireCouple(_id) {
    // console.log("detruireCouple");
    try {
        detruireId(_id);
        // console.log(_id);
        detruireClef(avoirClef(_id));
        // console.log(_id);
        return true;
    }
    catch(err) {
        // console.log(err);
        return false;
    }
}

// PROCESSUS PRINCIPAL

document.addEventListener('DOMContentLoaded', () => {
    // console.log('I\'m ready');

    if(avoirRelativeURL().includes("/orders")) {
        typeof initOrderPresentation == "function" && initOrderPresentation();
    }
    
});