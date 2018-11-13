var symbols = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]

function changePos(x,y,pos){	
 var diff=y-x;
 var percent= pos/256;
 var result = Math.ceil(x+diff*percent);
 return result;
}

function indexIn(num,array){
 for(var i=0;i<array.length;i++){
  if(array[i]==num) return i;
 }
 return -1;
}

function hexToNumber(x,y){
 return indexIn(x,symbols)*16 + indexIn(y,symbols);
}

function numberToHex(num){
 return symbols[Math.floor(num/16)]+symbols[num%16];
}

function hexToRGB(hex){
 var r = hexToNumber(hex[1],hex[2]);
 var g = hexToNumber(hex[3],hex[4]);
 var b = hexToNumber(hex[5],hex[6]);
 return [r,g,b];
}

function rgbToHex(r,g,b){
 return '#'+numberToHex(r)+numberToHex(g)+numberToHex(b);
}

function mixColors(r1,g1,b1,r2,g2,b2,pos){
 var r3=changePos(r1,r2,pos);
 var g3=changePos(g1,g2,pos);
 var b3=changePos(b1,b2,pos);
 return rgbToHex(r3,g3,b3);
}

function getValue(sel){
 return parseInt(document.querySelector('#'+sel).value);
}

function setRes(num,color){
 document.querySelector('#color'+num+'t').innerText = color;	
 var res = document.querySelector('#color'+num);
 res.innerText = color;
 res.style.color = color;
 res.style.backgroundColor = color;
}

function mix(){	
 var r1 = getValue('r1');
 document.querySelector('#r1t').innerText = r1; 
 var g1 = getValue('g1');
 document.querySelector('#g1t').innerText = g1; 
 var b1 = getValue('b1');
 document.querySelector('#b1t').innerText = b1; 
 var r2 = getValue('r2');
 document.querySelector('#r2t').innerText = r2; 
 var g2 = getValue('g2');
 document.querySelector('#g2t').innerText = g2; 
 var b2 = getValue('b2');
 document.querySelector('#b2t').innerText = b2;
 var pos = document.querySelector('#pos').value;
 document.querySelector('#post').innerText = pos;
 var color1 = rgbToHex(r1,g1,b1);
 var color2 = rgbToHex(r2,g2,b2);
 var color3;
 if (pos==255) color3=color2; else
color3 = mixColors(r1,g1,b1,r2,g2,b2,pos);
 setRes(1,color1);
 setRes(2,color2); 
 setRes(3,color3);
}