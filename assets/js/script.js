const textarea = document.querySelector('textarea')
const voiceList = document.querySelector('select')
const speechBtn = document.querySelector('button')

let synth = speechSynthesis
let isSpeaking = true

voices()

function voices() {
    for(let voice of synth.getVoices()) {
        let selected = voice.name === 'Google português do brasil' ? 'selected' : ''
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
        voiceList.insertAdjacentHTML('beforeend', option)
    }
}

synth.addEventListener('voiceschanged', voices)

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text)
    for(let voice of synth.getVoices()) {
        if(voice.name === voiceList.value) {
            utterance.voice = voice
        }
    }
    synth.speak(utterance)
}

speechBtn.addEventListener('click', e => {
    e.preventDefault()
    if(textarea.value !== '') {
        if(!synth.speaking) {
            textToSpeech(textarea.value)
        }

        if(textarea.value.length > 80) {
            setInterval(() => {
                if(!synth.speaking && !isSpeaking) {
                    isSpeaking = true
                    speechBtn.innerText = 'Converter para Fala'
                } else { }
            }, 500)
            if(isSpeaking) {
                synth.resume()
                isSpeaking = false
                speechBtn.innerText = 'Pausar a Fala'
            } else {
                synth.pause()
                isSpeaking = true
                speechBtn.innerText = 'Retomar a Fala'
            }
        } else {
            speechBtn.innerText = 'Converter para Fala'
        }
    }
})