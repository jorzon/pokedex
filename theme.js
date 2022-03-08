export function themeDark(btn, arr) {
    var ligth = "☀️"
    var dark = "🌙"



    function ligthTheme() {
        btn.textContent = dark
        arr.forEach(e => {
            e.classList.remove('dark-theme')
        });
        localStorage.setItem('theme', '🌙')
    }


    function darkTheme() {
        btn.textContent = ligth
        arr.forEach(e => {
            e.classList.add('dark-theme')
        });
        localStorage.setItem('theme', '☀️')
    }

    btn.addEventListener('click', (e) => {
        if (btn.textContent === ligth) {
            ligthTheme()
            console.log('dia')

        } else if (btn.textContent === dark) {
            darkTheme()
            console.log('noche')
        }

    })



    // d.addEventListener('DOMContentLoaded', e => {
    console.log(localStorage.getItem('theme'))
    if (localStorage.getItem('theme') == null) localStorage.setItem('theme', '🌙')
    if (localStorage.getItem('theme') == '🌙') ligthTheme()
    if (localStorage.getItem('theme') == '☀️') darkTheme()

    // })


}