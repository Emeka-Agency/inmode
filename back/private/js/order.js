const initOrderPresentation = function() {
    console.log('initOrderPresentation');
    selectAll(".order-item .order-presentation", true).forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if(e.currentTarget.parentElement.classList.contains('order-opened')) {
                selectAll(".order-item", true).forEach(item => item.classList.remove('order-opened'));
            }
            else {
                selectAll(".order-item", true).forEach(item => item.classList.remove('order-opened'));
                e.currentTarget.parentElement.classList.add('order-opened');
            }
        })
    });
}