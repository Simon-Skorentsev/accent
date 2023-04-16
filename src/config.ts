export const itemsPerPage = 6;
export const layoutPading = {horizontal: 40, vertical: 20}
export const layoutMaxWidth = 1024;

export const colors = {
    cyan: "#08FDD8",
    cyanRgba: makeRgba("8,253,216"),
    cyanDark: "#49c5b6",
    dark: "#1D1D1D",
    darkRgba: makeRgba("29,29,29"),
    gray: "#8d8d8d",
    white: "#FFF",
    whiteRgba: makeRgba("255,255,255"),
    background: "#1D1D1D",
}

function makeRgba(rgbNums: string) {
    return (opacity = 1) => {
        return `rgba(${rgbNums},${opacity})`;
    }
}