
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', function(event){
    event.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address='+location).then(function(response){
        response.json().then(function(data){
            if(data.error){
                messageOne.textContent = 'Error';
                messageTwo.textContent = data.error;
            }
            else{
                messageOne.textContent = data.local;
                messageTwo.innerHTML = 'Min temperature: '+data.tempMin+'ºC<br>'+'Max temperature: '+data.tempMax+'ºC';
            }
        })
    })
})