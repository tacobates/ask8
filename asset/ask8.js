var as = [
   "Yes.","Signs point to yes.","As I see it, yes.","You may rely on it.","Without a doubt.",
   "It is decidedly so.","Yes - definitely.","It is certain.","Outlook good.","Go for it!",
   "Looks good to me!","Looking good!","Probably.","Yes, in due time.",
   "Most likely.","Outlook so so.","You will have to wait.",
   "Concentrate and ask again.","Reply hazy, try again.","Better not tell you now.",
   "Cannot predict now.","Ask again later.",
   "My reply is no.","My sources say no.","Outlook not so good.","Don't count on it.",
   "Very doubtful.","Definitely not.","I have my doubts.","Don't bet on it.","Forget about it.",
   "Who knows?","Are you kidding?",

   "Surely it will be so.",
   "No.","Certainly not.",
   "ROFL! Good one ;)",
   "Do you really want to know?",
   "You already know the answer.",
];
var qs = {}; //Hash of questions already asked (minus anything not a-z0-9)
var question = null;

function init() {
  question = document.getElementById('q');
  question.onkeypress=function(e){ if(e.which==13 || e.keyCode== 13) ask(); };
  question.focus();
}

function ask() {
   var a = randA(); //Start with a default answer
   var q = question.value.replace(/[^a-z0-9 ]/gi, ' ');
   var qLow = q.toLowerCase();
   var qHash = qLow.replace(/ /g, '');

   if (q.match(/^\s*$/)) { //Blank answers shouldn't get "duplicate" results
      a = randBlank();
   } else if (qHash in qs) { //Disregard repeat questions
     a = randDuplicate();
   } else {
     qs[qHash] = true;
	 // Replace Answers about Mormonism
     if (qLow.match(/\b(jo(e|seph) smith|gold(en)? plates?)\b/i)) {
        a = randSmith();
     } else if (qLow.match(/\b((president|russell( m(arion)?)?) nelson|(president|thomas( s(pencer)?)?) monson|(president|gordon( b)?) hinc?kle?y)\b/i)) {
        a = randProphet();
     } else if (qLow.match(/\b(book of mormon|nephi|mosiah|ammon|helaman|ether|moroni|lehi|laman|lemuel|laban|zelph|alma|enos|jarom|omni)\b/i)) {
        a = randBOM();
     } else if (qLow.match(/\b(lds|mormons?)\b/i)) {
        a = randLDS();
     }
	 // Replace Answers about Politics
     else if (qLow.match(/\b(republicans?|democrats?|elections?|voting|vote(d|r)?s?|trump|biden|pelosi|kamala|newsom|buttigieg)\b/i)) {
        a = randPolitics();
     }
   }

   document.getElementById('a').innerHTML = a;
}

function randX(a) { return a[Math.floor(Math.random() * a.length)]; }
function randA() { return randX(as); }
function randBlank() {
   var a = ["Very funny. How about you ask a real question.",
      "Seriously, ask a question.",
      "I see a device in front of you capable of entering words. Use it!",
      "Why would you click ask when you haven't entered a question?",
      "You're getting on my nerves.",
      "You done yet?",
      "Ready to take this seriously?",
      "You will die an ignominious death... unless you actually enter a legitimate question.",
   ];
   return randX(a);
}
function randDuplicate() {
   var a = ["You've already asked that question.",
      "How about you ask something new.",
      "I grow weary of repetition.",
      "Did you not pay attention to the answer the first time?",
      "You're getting on my nerves.",
      "Ask something else. I don't like to repeat.",
      "Did I stutter last time?",
      "Death comes to us all... but more quickly to those who keep asking the same thing.",
      "You're like a broken record.",
   ];
   return randX(a);
}
function randLDS() {
   var a = ["Mormonism's a cult. Run!",
      "You do realize that the LDS church is demonstrably not divine, right?",
      "You will find your answer at MormonThink.com",
      "The LDS church gathers billions of dollars each year in tithing. Seem like god to you?",
   ];
   return randX(a);
}
function randSmith() {
   var a = ["You do know Joseph Smith was convicted of fraud, right?",
      "Oh Joe. He sure had his way with the ladies, am I right?",
      "When 1 wife just isn't enough...",
      "If you haven't read \"The Late War\" you really should. Joe Smith sure did.",
   ];
   return randX(a);
}
function randPolitics() {
   var a = ["I don't do politics.",
      "Let's not get political.",
      "Politics is too controversial. How about a different question?",
      "I'm too scared to give political advice.",
   ];
   return randX(a);
}
function randProphet() {
   var a = ["Oh these so-called prophets. You can't trust 'em.",
      "If god spoke directly to you, would you act in the way these supposed prophets do?",
      "False prophet. Next question.",
   ];
   return randX(a);
}
function randBOM() {
   var a = ["The Book of Mormon is fiction.",
      "Why are you curious about such a plagiarized and false book?",
      "All you need to know about Mormonism is that it's a fraud.",
   ];
   return randX(a);
}