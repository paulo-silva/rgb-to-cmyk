/**
 * Classe responsável por converter RGB para CMYK ou CMYK para RGB
 * @author  Paulo H. da Silva
 */
class ColorConverter {

  /**
   * Converte RGB para CMYK
   * @param  {integer} red   Código referente a quantidade de vermelho
   * @param  {integer} green Código referente a quantidade de verde
   * @param  {integer} blue  Código referente a quantidade de azul
   * @return {object}        Valores de ciano, magenta, amarelo e preto
   * @author Paulo H. da Silva
   */
  rgbToCmyk(red, green, blue) {

    red = (parseInt(red) | 0) / 255;
    green = (parseInt(green) | 0) / 255;
    blue = (parseInt(blue) | 0) / 255;

    let black = 1 - Math.max(red, green, blue)
      , cyan = ( (1 - red - black) / (1 - black) )
      , magenta = ( (1 - green - black) / (1 - black) )
      , yellow = ( (1 - blue - black) / (1 - black) )
    ;

    return {
      cyan: parseFloat(cyan | 0).toFixed(3),
      magenta: parseFloat(magenta | 0).toFixed(3),
      yellow: parseFloat(yellow | 0).toFixed(3),
      black: parseFloat(black | 0).toFixed(3)
    };
  }

  /**
   * Converte CMYK para RGB
   * @param  {integer} cyan     Código referente a quantidade de ciano
   * @param  {integer} magenta  Código referente a quantidade de magenta
   * @param  {integer} yellow   Código referente a quantidade de amarelo
   * @param  {integer} black    Código referente a quantidade de preto
   * @return {object}           Valores de vermelho, verde e azul
   */
  cmykToRgb(cyan, magenta, yellow, black) {
    let red = 255 * (1 - parseInt(cyan) | 0)* (1 - black)
      , green = 255 * (1 - parseInt(magenta) | 0) * (1 - black)
      , blue = 255 * (1 - parseInt(yellow) | 0) * (1 - black)
    ;

    return {
      red: 255 - cyan,
      green: 255 - magenta,
      blue: 255 - yellow
    };
  }
}
