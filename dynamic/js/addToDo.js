const addMoreLines = ()=>{
  let addLines = function(){
    console.log(`=============>${this.responseText}`);
    let lines = this.responseText;
    let node = document.createElement("FORM");
    let textNode = document.createTextNode(lines);
    node.appendChild(textNode);
    document.getElementById("form").appendChild(node);
  }
  let xhtml = new XMLHttpRequest();
  xhtml.addEventListener('load',addLines);
  xhtml.open('GET','/moreLines');
  xhtml.send();
}
