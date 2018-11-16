var ref = firebase.firestore().collection("Courses/CSE 170/Questions");
var size = 0;

function makePage(id) {
  getQuestion(id);
  getAnswer(id);
}

function getQuestion(id) {
  ref.doc("Question " + id).get().then((result) => {
    displayQuestion(result);
  });
}

function getAnswer(id) {
  var ansSection = document.getElementById("answers");
  var header = document.createElement("H2");
  header.setAttribute("align", "center");
  ansSection.appendChild(header.appendChild(document.createTextNode("Answers:")));

  ref.doc("Question " + id).collection("Answers").get().then((list) => {
    list.forEach((ans) => {
      displayAnswer(ans, ansSection);
    });
    size = list.size + 1;
    postAnswer(id);
  });
}

function displayQuestion(data) {
  var title = document.getElementById("title");
  title.innerHTML = data.get("question");
}

function displayAnswer(data, section) {
  var ans = document.createElement("P");
  ans.appendChild(document.createTextNode(data.get("value")));
  section.appendChild(ans);
}

function postAnswer(id) {
  var ansSection = document.getElementById("answers"); 
  var divSubmit = document.createElement("DIV");
  
  var myAns = document.createElement("INPUT");
  myAns.setAttribute("type", "text");
  myAns.setAttribute("id", "myans");
  myAns.setAttribute("placeholder", "Answer this question!");
  
  var submitBtn = document.createElement("BUTTON");
  submitBtn.setAttribute("type", "submit");
  submitBtn.appendChild(document.createTextNode("Submit"));
  
  submitBtn.addEventListener("click", (e) => {
    var newAns = ref.doc("Question " + id).collection("Answers").doc("Answer " + size);
    newAns.set({value: myAns.value, id: size}).then(() => {
      window.location.reload(true);
    });
  });
  
  divSubmit.appendChild(myAns);
  divSubmit.appendChild(submitBtn);
  ansSection.appendChild(divSubmit);
}