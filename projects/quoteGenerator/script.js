function createQuote(q, num) {
  
  for (var i = 0; i < num; ++i) {
    var quote = '';
    
     for (var p in q) {
      if (q.hasOwnProperty(p)) {
        quote += ' '+ q[p][Math.floor(Math.random()*q[p].length)]
      }
    }
    document.getElementById("intro").innerHTML+=quote + "<br>";
  }
}


var firstTest = {
    a: ["When you go to the shops,", "If you go to the park,", "If you go out on Saturday night,", "If it is early in the morning,", "If you forget to bring an umbrella,", "If you think about it long enough,"],
    b: ["please don't forget", "remember to bring", "you should take", "and the sun is shining,", "and the rain is falling,", "and a storm is coming," ],
    c: ["your umbrella.", "something nice to wear.", "a bunch of flowers.", "you might avoid getting wet.", "you might need to have a lie down.", "you will have some good luck today."]
    
};

var secondTest = {
    a:["If it is early in the morning,", "If you forget to bring an umbrella,", "If you think about it long enough,"],
    b: ["and the sun is shining,", "and the rain is falling,", "and a storm is coming," ],
    c: ["you might avoid getting wet.", "you might need to have a lie down.", "you will have some good luck today."]
    
};


function quantity(q) {
    document.getElementById("intro").innerHTML="";
    var num = sentenceQuantity.value;
    createQuote(q, num);
}
