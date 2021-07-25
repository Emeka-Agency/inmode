function initChangeIconElem(elem, _for) {
    // console.log("initChangeIconElem");
    // console.log(elem);
    if(!isElement(elem)) {
        return null;
    }
    // console.log(elem);
    // console.log(_for);
    tippy(`#${elem.id}`, {
        content: htmlAOE2Images(getAOE2RessourcesImages()),
        allowHTML: true,
        interactive: true,
        duration: 250,
        hideOnClick: true,
        // trigger: 'mouseenter click focusin',
        trigger: 'click',
        // THEMES
        // theme: 'light',
        // theme: 'light-border',
        // theme: 'material',
        // theme: 'translucent',
        popperOptions: {
            strategy: 'fixed',
            modifiers: [
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['right', 'left', 'bottom'],
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        altAxis: true,
                        tether: false,
                    },
                },
            ],
        },
        onBeforeUpdate: function() {
            // console.log('onBeforeUpdate');
            if(isNoteMode()) {
                // TODO Bloquer l'affichage proprement ++
            }
        },
        onTrigger: function() {
            // console.log('onTrigger');
            if(isNoteMode()) {
                // TODO Bloquer l'affichage proprement
            }
        },
        onShow: function(instance) {
            // console.log('onShow');
            // DONE taunt kévin, 17:59
            getById(_for).classList.add('iconed');
            instance.popper.style.display = '';
        },
        onMount: function(instance) {
            // console.log('Mounted');
            // console.log(`#${instance.popper.id} img.aoe2-select-image`);
            let _temp = selectAllIn(`#${instance.popper.id} img.aoe2-select-image`, selectOne(`#${instance.popper.id}`));
            if(_temp) {
                _temp.forEach(img => {
                    img.addEventListener('click', (_e) => {
                        // console.log(_e.currentTarget);
                        // console.log(img.getAttribute('src'));
                        // console.log(img.getAttribute('alt'));
                        getById(elem.id).src = img.getAttribute('src');
                        getById(elem.id).alt = img.getAttribute('alt');

                        // Changer l'icône du BO si dans modale bo-config
                        if(_for == 'bo-icon') {
                            _json.modifIcon(img.getAttribute('src'));
                            selectOne('img.guide-param').classList.remove('error');
                            selectOne('img.guide-param + .form-field-error').innerText = "";
                        }
                    });
                    // }, {passive: true});
                });
            }
            else {
                return false;
            }
        },
        onHide: function(instance) {
            getById(_for).classList.remove('iconed');
            instance.popper.style.display = 'none';
            let _temp = selectAllIn(`#${instance.popper.id} .tippy-select-img`, selectOne(`#${instance.popper.id}`));
            if(_temp) {
                _temp.forEach(img => {
                    img.replaceWith(img.cloneNode(true));
                });
            }
            else {
                return false;
            }
        }
    });
    return true;
}