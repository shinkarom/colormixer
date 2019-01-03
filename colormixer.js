const posMax = 255;

function getRGBString(color){
	let c = color.rgb()
	return `(${c[0]}, ${c[1]}, ${c[2]})`
}

function getResultString(color){
	return `${color.hex()} ${getRGBString(color)}`
}

function getComplement(color){
	let c = color.rgb()
	let r = 255-c[0];
	let g = 255-c[1];
	let b = 255-c[2];
	return chroma(r,g,b)
}

function getElement (sel) {
  return document.getElementById(sel)
}

function setSwatch (num, color) {
  let hexColor = color.hex()
  let complementColor = getComplement(color).hex()
  getElement(`color${num}t`).value = hexColor
  getElement(`rgb${num}`).innerText = getRGBString(color)
  let res = getElement(`color${num}`)
  res.style.backgroundColor = hexColor
  res.style.borderColor = complementColor
}

function setResultSwatch(num,color){
  let hexColor = color.hex()
  let complementColor = getComplement(color).hex()
  getElement(`color${num}t`).innerText = getResultString(color)
  let res = getElement(`color${num}`)
  res.style.backgroundColor = hexColor
  res.style.borderColor = complementColor
}

function colorEdit (e) {
  if (/^#[0123456789abcdef]{6}$/i.test(e.target.value)){ 
	mix(e.target.id)
  }
}

function bodyLoad () {
	getElement('pos').max = posMax;
	getElement('pos').value = Math.round(posMax/2);
  ['r1', 'g1', 'b1', 'r2', 'g2', 'b2', 'pos','rgb','hsl','hsv','lab','lch'].forEach(
    (elem)=> getElement(elem).addEventListener('input', ()=>mix(0))
  );
  ['change','keypress','paste','input'].forEach((elem)=>{
	 getElement('color1t').addEventListener(elem, colorEdit);
	getElement('color2t').addEventListener(elem, colorEdit); 
  })
  mix('')
}

function setSlidersFromColor (number, color) {
  getElement('r'+number).value = color.rgb()[0]
  getElement('g'+number).value = color.rgb()[1]
  getElement('b'+number).value = color.rgb()[2]
}

function getColorFromSliders(number){
	let r = parseInt(getElement('r'+number).value)
	let g = parseInt(getElement('g'+number).value)
	let b = parseInt(getElement('b'+number).value)
	return chroma(r,g,b)
}

function mix (param) {
  let pos = parseInt(getElement('pos').value)
  getElement('post').innerText = (posMax-pos) + ' / ' + pos
  let model = document.querySelector('input[name=model]:checked').value   		
	let rgb1,rgb2;
	if(param=='color1t'){
		rgb1 = chroma(getElement('color1t').value);
		setSlidersFromColor(1,rgb1)
	} else {
		rgb1 = getColorFromSliders(1);
	}		
	if(param=='color2t'){
		rgb2 = chroma(getElement('color2t').value);
		setSlidersFromColor(2,rgb2)
	} else {
		rgb2 = getColorFromSliders(2); 
	}	
  setSwatch(1, rgb1)
  setSwatch(2, rgb2)
  let rgb3 = chroma.mix(rgb1, rgb2, pos/posMax,model)  
  setResultSwatch(3, rgb3)
}
