export const contrastColors = {
    none: "#ee8181",
    AANontext: "#f7b87d",
    AA: "#ecdb79",
    AAA: "#cff7cf",
}

//https://www.uutilsynet.no/wcag-standarden/1411-kontrast-ikke-tekstlig-innhold-niva-aa/145
export const wcagRules = {
    contrastMin: 1,
    lowContrastMax: 3.0,
    aaNonTextMin: 3.0,
    aaNonTextMax: 4.5,
    aaTextMin: 4.5,
    aaTextMax: 7.0,
    aaaTextMin: 7.0,
    contrastMax: 21.0
}

export const colorBarFormats = {
 "HORIZONTAL" : "horizontal",
 "VERTICAL": "vertical"
}

export const numberOfColors = {
    "MIN" : 0,
    "MAX" : 8 //obs! Hvis du øker denne burde du øke farger i default color palette, eller endre metoden for å sende ut farge i contrast-calculations.js
}

export const defaultColorPalette = [ 
    "#1f1235", "#ffffff", "#ff6e6c", "#f3f3f3", "#e3615f", "#fbdd74", "#67568c", "#f4effc", "#1b1425" 
]

export const defaultColorPalettes = [
    ["#1f1235", "#ea5553", "#f3f3f3", "#fbdd74"],
    ["#FDF5DF", "#5EBEC4", "#F92C85", "#121635"],
    ["#A0AECD", "#000000", "#f3f3f3"],
    ["#490B3D", "#BD1E51", "#F1B814", "#ffffff", "#121212" ]
]