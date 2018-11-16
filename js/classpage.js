function getQuestion(name) {
  var ref = firebase.firestore().collection("Courses/" + name + "/Questions");
  var id = 1;
  var section = document.getElementById("qa_section");
  ref.get().then((list) => {
    list.forEach((question) => {
      var post = document.createElement("BUTTON");
      post.setAttribute("style", "display:block;");
      post.setAttribute("id", id.toString());
      post.appendChild(document.createTextNode(question.id));
      section.appendChild(post);
      
      post.addEventListener("click", (e) => {
        window.location.href = "Project/../question/question" + (e.target.id) + ".html";
      });
      id++;
    });
  });
}