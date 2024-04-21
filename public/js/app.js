const generateButton = document.querySelector('#generateButton')
const quoteTextEl = document.querySelector('#quote')
const authorTextEl = document.querySelector('#author')
const copyButton = document.querySelector('#copyButton')
const speechButton = document.querySelector('#speechButton')
synth = speechSynthesis


fetch('/api/quotes/get')
        .then(res => res.json())
        .then(data => {
            quoteTextEl.innerHTML = '<i class="fa-solid fa-quote-left"></i>' + data.text + '<i class="fa-solid fa-quote-right"></i>'
            authorTextEl.innerText = data.author
        })



copyButton.addEventListener('click', function() { 
    navigator.clipboard.writeText(`${quoteTextEl.innerText}`);
});

speechButton.addEventListener('click', function() { 
    let utterance = new SpeechSynthesisUtterance(`${quoteTextEl.innerText}`)
    synth.speak(utterance)
});


generateButton.addEventListener('click', () => {
    generateButton.innerText = "Loading...";
    generateButton.disabled = true;
    generateButton.style.backgroundColor = '#ffa8b0'

    setTimeout(function() {
        fetch('/api/quotes/get')
            .then(res => res.json()) 
            .then(data => {
                quoteTextEl.innerHTML = '<i class="fa-solid fa-quote-left"></i>' + data.text + '<i class="fa-solid fa-quote-right"></i>';
                authorTextEl.innerText = data.author;

                generateButton.innerText = "Generate Quote";
                generateButton.style.backgroundColor = 'rgb(244 53 67)'
                generateButton.disabled = false;
            })
    }, 2000);
});
