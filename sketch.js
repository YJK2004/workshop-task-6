let font;

let userInput;
let button;
let userLine;
let response;

let poem = [];


function preload(){
  font = loadFont('brushfont.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(156, 256, 140);

  textFont(font);

  userInput = createInput();
  userInput.position(width/2, 100);
  userInput.size(200);
  button = createButton('click');
  button.position(userInput.x, userInput.y + 21);
  button.mousePressed(newLine);
  button.size(80);
}

function draw() {
  writePoem();

  textSize(30);
  text("Finish the Story!", width/2, 90)
}

function newLine(){
  userLine = userInput.value();
  userInput.value('');
  poem.push(userLine);

  let words = RiTa.tokenize(userLine);
  response = '';
  for (x = 0; x < words.length; x++){
    if(RiTa.isNoun(words[x])){
      response += RiTa.randomWord({ pos: "nns"});
  } else {
    response += words[x];
  }
  response += ' ';
 }
 poem.push(response);

//  rhyming word
 let r = floor(random(0, words.length));
 let rhymes = RiTa.rhymesSync(words[r]);
 let changedWord = random(rhymes);
 words[r] = changedWord;
 userLine = RiTa.untokenize(words);

}

function writePoem(){
  textSize(20);
  for(x = 0; x < poem.length; x++){
    text(poem[x], 550, 170 + x * 20);
  }
}