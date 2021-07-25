const initDragula = () => {
    console.log("initDragula");
    let temp = getOneByTag('body');
    if(temp && ['page1', 'page2'].indexOf(temp.getAttribute('data-route')) < 0) {
        return false;
    }
    const from = 'from';
    const to = 'to';
    dragula([getById(from), getById(to)] , {
        copy: function (el, source) {
            return source === document.getElementById(from);
        },
        accepts: function (el, target) {
            return target !== document.getElementById(from);
        },
        invalid: function(el, target) {
            // return el.id == "notes";
            return false;
        },
        removeOnSpill: true,
        slideFactorX: 10,
        slideFactorY: 10,
    }).on('drop', function(el, target, source) {
        if(target === source) {
            console.log('Same');
        }
        else {
            console.log('Different');
        }
        // COMPLETE Ne pas mettre autre chose que des modules
        // if(!el.classList.contains('module')) {
        //     el.remove();
        // }
        // selectAll('#my-bo-container > .build-block.module', true).length >= 1 && selectAll('.note', true).length < MAX_NOTES && initBoutonCreer();
        // console.log("majValeurs");
        // initElementGuide(el) && majValeurs();

        // MISE À JOUR BOUTON CRÉER JSON
        // majStatutBoutonJSON();
    }).on('remove', function(el, target, source) {
        // DONE Calcul si remove une étape
        // console.log("majValeurs");
        // majValeurs();
        // DONE Détruire les IDs des sous-éléments
        // detruireCouple(el.id);
        // detruireElemIds(el.id);
        // selectAll('#my-bo-container > .build-block.module', true).length < 2 && stopperBoutonCreer();
        // selectAllIn('.error', true).forEach(elem => elem.classList.remove('error'));

        // MISE À JOUR BOUTON CRÉER JSON
        // majStatutBoutonJSON();

        // majTaillePartieNotes();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // console.log('Dragula page is ready');

    initDragula();
    initParametresGuide();
});