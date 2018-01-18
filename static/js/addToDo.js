const addMoreLine = function() {
  let form = document.getElementById("addTextBox");
  let textBox = document.createElement("textarea");
  let newLine = document.createElement("br")
  textBox.name="items";
  textBox.rows="1";
  textBox.cols="80";
  form.appendChild(textBox);
  form.appendChild(newLine);
}
