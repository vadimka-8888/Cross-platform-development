import {MiniMaple} from "../src/miniMaple";

document.addEventListener('DOMContentLoaded', setup)

function setup() {
    document.getElementById('demoButton').onclick = addSomething;
}

function addSomething(){
    const someDummyDiv = document.createElement('div');
    someDummyDiv.classList.add('generated');
    const count = document.getElementsByClassName('generated').length;
    someDummyDiv.innerHTML = `I was created by JS! There are already ${count} of my friends!`;
    const container = document.getElementById('container');
    container.appendChild(someDummyDiv);
}

const button = document.getElementById('diffButton')
button.addEventListener('click', differentiate)

function differentiate()
{
    const input = document.getElementById('input')
    const output = document.getElementById('output')
    const diff = MiniMaple()
    const text = input.value
    const answer = diff.func(text)
    output.textContent = answer
}
