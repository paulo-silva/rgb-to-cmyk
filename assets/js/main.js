document.addEventListener('DOMContentLoaded', function() {
  
  let colorsInput = document.getElementsByClassName('color-input')
    , totalColorsInputs = colorsInput.length
    , colorConverter = new ColorConverter()
  ;

  for (let i = 0; i < totalColorsInputs; i++) {

    colorsInput[i].addEventListener('input', function(event) {
      let colorFormat = event.currentTarget.parentNode.parentNode.dataset.format;

      calculateColorsValues(colorFormat);

    }); 
  }

  function calculateColorsValues(colorFormat) {

    let values = 'rgb'
      , sumColor = 0
    ;
    if (colorFormat === 'rgb') {
      let red = parseInt(document.querySelector('[data-color=red]').value | 0)
        , green = parseInt(document.querySelector('[data-color=green]').value | 0)
        , blue = parseInt(document.querySelector('[data-color=blue]').value | 0)
      ;

      sumColor = red + green + blue;

      values = colorConverter.rgbToCmyk(red, green, blue);
      document.body.style.backgroundColor = `rgb(${red},${green},${blue})`;
      colorFormat = 'cmyk';
    } else if (colorFormat === 'cmyk') {
      let cyan = document.querySelector('[data-color=cyan]').value
        , magenta = document.querySelector('[data-color=magenta]').value
        , yellow = document.querySelector('[data-color=yellow]').value
        , black = document.querySelector('[data-color=black]').value
      ;
      values = colorConverter.cmykToRgb(cyan, magenta, yellow, black);
      document.body.style.backgroundColor = `rgb(${values.red},${values.green},${values.blue})`;
      sumColor = values.red + values.green + values.blue;
      colorFormat = 'rgb';
    } else {
      alert(`Formato ${colorFormat.toUpperCase()} inválido`);
      return;
    }

    if (sumColor > 500) {
      document.body.classList.add('dark');
      document.body.classList.remove('clean');
    } else {
      document.body.classList.add('clean');
      document.body.classList.remove('dark');
    }
    fillColorsInputs(colorFormat, values);

  }

  function fillColorsInputs(colorFormat, values) {
    
    for (let i in values) {
      document.getElementById(`${colorFormat}_${i}`).value = values[i];
    }
  }

  document.getElementById('swapColorFormat').addEventListener('click', function(event) {
    let inputsWrapper = document.getElementById('inputsWrapper')
      , children = inputsWrapper.children
      , newForm = []
      , firstElement = children[0]
      , swapElement = children[children.length - 2]
      , lastElement = children[children.length - 1]
    ;

    disableInputs(lastElement, firstElement);
    inputsWrapper.innerHTML = '';
    inputsWrapper.appendChild(lastElement);
    inputsWrapper.appendChild(swapElement);
    inputsWrapper.appendChild(firstElement);

  });

  function disableInputs(last, first) {
    let lastChildren = last.children
      , firstChildren = first.children
      , data = [
        { disabled: true, children: firstChildren },
        { disabled: false, children: lastChildren }
      ]
    ;

    for (let i = 0; i < data.length; i++) {
      disable = data[i].disabled
      for (let j = 0; j < data[i].children.length; j++) {
        data[i].children[j].children[0].readOnly = disable;
      }
    }

  }

});