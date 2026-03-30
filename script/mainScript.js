window.addEventListener( 'resize', function() {
    if(this.window.innerWidth > 768) {
        this.document.getElement('menu-toggle').checked = false;
    }
});