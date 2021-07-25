// HTML BUILDERS

function htmlEtapeTexte(_for) {
    // Ajouter la possibilité de déplacer pour supprimer
    let _id = creerCouple("", "_");
    let html = [], i = -1;

    html[++i] = `<div id="${_id}" class="show-mode comment etape" data-for="${_for}">`;
    html[++i] = `   <div class="active user-select-none"></div>`;
    html[++i] = `   <textarea spellcheck="false" class="inactive" resizeable="false" placeholder="Ajouter étape..."></textarea>`;
    html[++i] = `</div>`;
    // DONE Ajouter une icône de suppression
    html[++i] = `<img class="delete-etape" src="${avoirCheminIcon('close.svg')}" alt="Supprimer étape"/>`;

    return {html: html.join('').trim(), id: _id};
}

// SPECIAL FORM ELEMENTS

const toggleInputHTML = (_selector) => {
    let html = [], i = -1;

    html[++i] = `<div class="switch-component">`;
    html[++i] = `    <input`;
    html[++i] = `        type="checkbox"`;
    html[++i] = `        name="${_selector}"`;
    html[++i] = `        class="switch-checkbox"`;
    html[++i] = `        id="${_selector}"`;
    html[++i] = `    />`;
    html[++i] = `    <label`;
    html[++i] = `        class="switch"`;
    html[++i] = `        htmlFor="${_selector}"`;
    html[++i] = `    >`;
    html[++i] = `        <span class="switch-inner user-select-none"></span>`;
    html[++i] = `        <span class="switch-switch user-select-none"></span>`;
    html[++i] = `    </label>`;
    html[++i] = `</div>`;

    return html.join('').trim();
}
