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

class RGB {
  constructor (r, g, b) {
    this.r = r
    this.g = g
    this.b = b
  }
  
  getComplement(){
	  let newR = 255 - this.r
	  let newG = 255 - this.g
	  let newB = 255 - this.b
	  return new RGB(newR,newG,newB)
  }
  
  toHex () {
    return '#' + numberToHex(this.r) + numberToHex(this.g) + numberToHex(this.b)
  }
  
  toRGBString(){
	  return `(${this.r}, ${this.g}, ${this.b})`
  }
  
  toResultString(){
	return `${this.toHex()} ${this.toRGBString()}`
  }
}

function changePos (x, y, pos) {
  var diff = y - x
  var result = Math.ceil(x + diff * pos)
  return result
}

function hexToRGB (hex) {
  var r = hexToNumber(hex[1], hex[2])
  var g = hexToNumber(hex[3], hex[4])
  var b = hexToNumber(hex[5], hex[6])
  return new RGB(r, g, b)
}

function mixColors (color1, color2, pos) {
  var r3 = changePos(color1.r, color2.r, pos)
  var g3 = changePos(color1.g, color2.g, pos)
  var b3 = changePos(color1.b, color2.b, pos)
  return new RGB(r3, g3, b3)
}

function getValue (sel) {
  return parseInt(document.querySelector('#' + sel).value)
}

function setRes (num, color) {
  let hexColor = color.toHex()
  let complementColor = color.getComplement().toHex()
  document.querySelector(`#color${num}t`).value = hexColor
  document.querySelector(`#rgb${num}`).innerText = color.toRGBString()
  var res = document.querySelector(`#color${num}`)
  res.style.backgroundColor = hexColor
  res.style.borderColor = complementColor
}

function setResult(num,color){
  let hexColor = color.toHex()
  let complementColor = color.getComplement().toHex()
  document.querySelector(`#color${num}t`).innerText = color.toResultString()
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
  )
  mix()
}

function setRGBSwatches (color, number) {
  document.querySelector(`#r${number}`).value = color.r
  document.querySelector(`#r${number}t`).innerText = color.r
  document.querySelector(`#g${number}`).value = color.g
  document.querySelector(`#g${number}t`).innerText = color.g
  document.querySelector(`#b${number}`).value = color.b
  document.querySelector(`#b${number}t`).innerText = color.b
}

function editMix () {
  var pos = document.querySelector('#pos').value /256
  document.querySelector('#post').innerText = getPropFromPos(pos)
  var color1 = document.querySelector('#color1t').value
  var color2 = document.querySelector('#color2t').value
  var rgb1 = hexToRGB(color1)
  var rgb2 = hexToRGB(color2)
  var color3 = (pos === 255) ? color2 : mixColors(rgb1, rgb2, pos)
  setRGBSwatches(rgb1, 1)
  setRGBSwatches(rgb2, 2)
  setRes(1, rgb1)
  setRes(2, rgb2)
  setResult(3, rgb3)
}

function setSliderText(color, number){
	document.querySelector(`#r${number}t`).innerText = color.r
	document.querySelector(`#g${number}t`).innerText = color.g
	document.querySelector(`#b${number}t`).innerText = color.b
}

function getColorFromSliders(number){
	return new RGB(getValue(`r${number}`),getValue(`g${number}`),getValue(`b${number}`))
}

function mix () {
  var rgb1 = new getColorFromSliders(1)
  var rgb2 = new getColorFromSliders(2)
  setSliderText(rgb1,1)
  setSliderText(rgb2,2)
  var pos = document.querySelector('#pos').value /256
  document.querySelector('#post').innerText = getPropFromPos(document.querySelector('#pos').value)  
  var rgb3 = (pos === 255) ? color2 : mixColors(rgb1, rgb2, pos)
  setRes(1, rgb1)
  setRes(2, rgb2)
  setResult(3, rgb3)
}
