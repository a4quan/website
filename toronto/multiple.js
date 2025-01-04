function multipleView(view) {
    // Change menu width
    if (view === true) {
        console.log("here")
        document.getElementById('leftMenu').style.width = '400px';
        document.getElementById('menu').style.width = '400px';
        document.getElementById('vertical-line').style.left = '268px';
        document.getElementById('toggleID1').style.left = '1440px';
        document.getElementById('toggleID2').style.left = '1440px';
        openAllSubMenus()
    }

    // Change back
    if (view === false) {
        document.getElementById('leftMenu').style.width = '330px';
        document.getElementById('menu').style.width = '330px';
        document.getElementById('vertical-line').style.left = '222px';
        document.getElementById('toggleID1').style.left = '1370px';
        document.getElementById('toggleID2').style.left = '1370px';
    }
}

