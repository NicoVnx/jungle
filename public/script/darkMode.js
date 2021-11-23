

const html = document.querySelector("html")
const checkbox = document.getElementById("switch")

const swDark = document.getElementById("swDark")

const imgFb = document.getElementById("imgFb")
const imgGit = document.getElementById("imgGit")
const imgIg = document.getElementById("imgIg")



const btn = document.getElementById("switch")

const getStyle = (element, style) => window.getComputedStyle(element).getPropertyValue(style)


const initialColors = {
    bg: getStyle(html, "--bg"),
    bgHeader: getStyle(html, "--bg-header"),
    colorTxtHeader: getStyle(html, "--color-txtheader"),
    colorSub: getStyle(html, "--color-sub"),
    colorTxtOne: getStyle(html, "--color-txtone"),
    colorTxtTwo: getStyle(html, "--color-txttwo"),

    preTitle: getStyle(html, "pre-title"),

    colorTxtHomeDest: getStyle(html, "--color-txthomedest"),
    colorBorder: getStyle(html, "--color-border"),
    colorBorderTwo: getStyle(html, "--color-bordertwo"),

    labelN: getStyle(html, "--label-n"),
    labelH: getStyle(html, "--label-h"),
    labelC: getStyle(html, "--label-c"),


    bgFooter: getStyle(html, "--bg-footer"),
    footerTxt: getStyle(html, "--footer-txt"),

    bgHamb: getStyle(html, "--bg-hamb"),

    colorShadow: getStyle(html, "--color-shadow"),
}

const darkMode = {
    bg: "rgb(38, 38, 38)",
    bgHeader: "rgb(52, 46, 41)",
    colorTxtHeader: "rgb(183, 158, 127)",
    
    colorSub: "rgb(147, 134, 118)",
    colorTxtOne: "rgb(235, 192, 167)",
    colorTxtTwo: "rgb(183, 158, 127)",

    preTitle: "rgba(120, 120, 120, 0.82)",

    labelN: "rgb(80, 80, 80)",
    labelH: "rgb(135, 135, 135)",
    labelC: "rgb(210, 210, 210)",

    colorTxtHomeDest: "#88765b",
    colorBorder: "rgb(90, 90, 90)",
    colorBorderTwo: "rgb(50, 50, 50)",
    bgFooter: "rgb(255, 255, 255)",
    footerTxt: "rgb(30, 30, 30)",

    bgHamb: "rgb(25, 25, 25)",

    colorShadow: "rgba(0, 0, 0, 0.650)",
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()


const changeColors = (colors) => { Object.keys(colors).map(key => 
        
    html.style.setProperty(transformKey(key), colors[key]))

    
}

checkbox.addEventListener("change", ({target}) => {

    target.checked ? changeColors(darkMode) & Cookies.set('dark', true, { expires: 10000}) &
    swDark.classList.add('swOn') 
    : changeColors(initialColors) & Cookies.remove('dark') & swDark.classList.remove('swOn')
   
})
if(Cookies.get('dark')){
    
    checkbox.checked = true
    swDark.classList.add('swOn') 
    changeColors(darkMode)
}else{

    swDark.classList.remove('swOn')

}

    /*checkbox.addEventListener("change", ({target}) => {

    target.checked ? imgI.style.backgroundImage = "url('/img/airw.png')" : imgI.style.backgroundImage = "url('/img/air.png')"
    target.checked ? imgFb.src = "img/fb.png" : imgFb.src = "img/fbw.png"
    target.checked ? imgGit.src = "img/git.png" : imgGit.src = "img/gitw.png"
    target.checked ? imgIg.src = "img/insta.png" : imgIg.src = "img/instaw.png"

    target.checked ? imgDark.src = "/img/moon.png" : imgDark.src = "/img/sun.png"
target.checked ? imgHamb.src = "img/hambw.png" : imgHamb.src = "img/hamb.png"
    //target.checked ? darkLabel.src = "img/moon.png" : darkLabel.src = "img/sun.png"

    target.checked ? imgCrist.src = "img/cristw.png" : imgCrist.src = "img/crist.png"
    target.checked ? imgBust.src = "img/bustw.png" : imgBust.src = "img/bust.png"

    

    
   
})




    imgDark.src = "/img/moon.png"
    imgI.style.backgroundImage = "url('/img/airw.png')"
    imgFb.src = "img/fb.png"
    imgGit.src = "img/git.png"
    imgIg.src = "img/insta.png"
    imgHamb.src = "img/hambw.png"
    //darkLabel.src = "img/moon.png"

    imgCrist.src = "img/cristw.png"
    imgBust.src = "img/bustw.png"

    

    

else{
    imgDark.src = "/img/sun.png"
    imgFb.src = "img/fbw.png"
    imgGit.src = "img/gitw.png"
    imgIg.src = "img/instaw.png"
    imgHamb.src = "img/hamb.png"
    //darkLabel.src = "img/sun.png"

    imgCrist.src = "img/crist.png"
    imgBust.src = "img/bust.png"

    
   

}*/