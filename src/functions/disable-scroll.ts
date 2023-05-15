export const disableMainScroll = function (elems = []) {
    document?.querySelector('body')?.classList.add('no-scroll');
  }
  
  export const enableMainScroll = function () {
    let i = 0;
    document?.querySelector('#contact-us.opened') && ++i;
    document?.querySelector('.privacy-policy.opened') && ++i;
    document?.querySelector('#purchase-mini.step-1') && ++i;
    document?.querySelector('#purchase-mini.step-2-3') && ++i;
    document?.querySelector('#header-mini.opened') && ++i;
    if(i > 1) {
      return;
    }
    document?.querySelector('body')?.classList.remove('no-scroll');
  }
  