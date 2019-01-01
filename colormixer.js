var symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

function isHexColor (str) {
  return /^#[0123456789abcdef]{6}$/i.test(str)
}

function hexToNumber (x, y) {
  return symbols.indexOf(x) * 16 + symbols.indexOf(y)
}

function numberToHex (num) {
  return symbols[Math.floor(num / 16)] + symbols[num % 16]
}

function interpolate (x, y, pos) {
  return Math.ceil(x + (y-x) * pos)
}

function getRGBString(color){
	let c = color.rgb()
	return `(${c[0]}, ${c[1]}, ${c[2]})`
}

function getResultString(color){
	return `${color.hex()} ${getRGBString(color)}`
}

function getComplement(color){
	let c = color.rgb()
	let r = 255-c.red;
	let g = 255-c.green;
	let b = 255-c.blue;
	return chroma(r,g,b)
}

function hexToRGB (hex) {
  var r = hexToNumber(hex[1], hex[2])
  var g = hexToNumber(hex[3], hex[4])
  var b = hexToNumber(hex[5], hex[6])
  return new RGB(r, g, b)
}

function mixColors(color1,color2,pos,model){
	return chroma.mix(color1,color2,pos,model);
}

function getValue (sel) {
  return parseInt(document.querySelector('#' + sel).value)
}

function setRes (num, color) {
  let hexColor = color.hex()
  let complementColor = getComplement(color).hex()
  document.querySelector(`#color${num}t`).value = hexColor
  document.querySelector(`#rgb${num}`).innerText = getRGBString(color)
  var res = document.querySelector(`#color${num}`)
  res.style.backgroundColor = hexColor
  res.style.borderColor = complementColor
}

function setResult(num,color){
  let hexColor = color.hex()
  let complementColor = getComplement(color).hex()
  document.querySelector(`#color${num}t`).innerText = getResultString(color)
  var res = document.querySelector(`#color${num}`)
  res.style.backgroundColor = hexColor
  res.style.borderColor = complementColor
}

function getPropFromPos (pos) {
	return pos+"/255"
}

function colorEdit () {
  if (isHexColor(this.value)) editMix()
}

function bodyLoad () {
  ['r1', 'g1', 'b1', 'r2', 'g2', 'b2', 'pos'].forEach(
    function (elem) { document.querySelector('#' + elem).addEventListener('input', mix) }
  );
  ['color1t', 'color2t'].forEach(
    function (elem) { document.querySelector('#' + elem).addEventListener('input', colorEdit) }
  );
  ['rgb','hsl','hsv','lab','lch'].forEach(
  function(elem){ document.getElementById(elem).addEventListener('input',modelInput)}
  );
  mix()
}

function modelInput(){
	mix()
}

function setRGBSwatches (color, number) {
  document.querySelector(`#r${number}`).value = color.r
  document.querySelector(`#g${number}`).value = color.g
  document.querySelector(`#b${number}`).value = color.b
}

function editMix () {
  var pos = document.querySelector('#pos').value /256
  document.querySelector('#post').innerText = getPropFromPos(pos)
  let model = document.querySelector('input[name=model]:checked').value
  var color1 = document.querySelector('#color1t').value
  var color2 = document.querySelector('#color2t').value
  var rgb1 = hexToRGB(color1)
  var rgb2 = hexToRGB(color2)
  var rgb3 = (pos === 255) ? rgb2 : mixColors(color1, color2, pos,model)
  setRGBSwatches(rgb1, 1)
  setRGBSwatches(rgb2, 2)
  setRes(1, rgb1)
  setRes(2, rgb2)
  setResult(3, rgb3)
}

function getColorFromSliders(number){
	return chroma(getValue(`r${number}`),getValue(`g${number}`),getValue(`b${number}`))
}

function mix () {
  var rgb1 = new getColorFromSliders(1)
  var rgb2 = new getColorFromSliders(2)
  var pos = document.querySelector('#pos').value /256
  let model = document.querySelector('input[name=model]:checked').value
  document.querySelector('#post').innerText = getPropFromPos(document.querySelector('#pos').value)  
  var rgb3 = (pos === 255) ? rgb2 : mixColors(rgb1, rgb2, pos,model)
  setRes(1, rgb1)
  setRes(2, rgb2)
  setResult(3, rgb3)
}
