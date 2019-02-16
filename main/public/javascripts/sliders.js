var slider1 = document.getElementById ("myRange1");
var slider2 = document.getElementById ("myRange2");
var slider3 = document.getElementById ("myRange3");
var output1 = document.getElementById ("demo1");
var output2 = document.getElementById ("demo2");
var output3 = document.getElementById ("demo3");

output1.innerHTML = slider1.value;
output2.innerHTML = slider2.value;
output3.innerHTML = slider3.value;

slider1.oninput = function(){
  output1.innerHTML = this.value
}

slider2.oninput = function(){
  output2.innerHTML=this.value
}

slider3.oninput = function(){
  output3.innerHTML=this.value
}
