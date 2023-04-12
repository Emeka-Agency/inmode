export const disableMainScroll = function () {
    document?.querySelector('body')?.classList.add('no-scroll');
}

export const enableMainScroll = function () {
    let i = 0;
    if(Array.from(
        document.querySelectorAll('#contact-us.opened, .privacy-policy.opened, #purchase-mini.step-1, #purchase-mini.step-2-3, #header-mini.opened')
        ).length > 0
    ) {
        return;
    }
    document?.querySelector('body')?.classList.remove('no-scroll');
}
