function buttonDown(){
    //console.log("test");
    axios.get('http://localhost:3000/test').then(
        (response) => {
            let result = response.data;
            console.log(result);
        }
    );

    axios.get('/demo').then(
        (response) => {
            let result = response.data;
            console.log(result);
        }
    );

    axios.post('/auth', {
        username: 'Fred',
        password: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

function register(){
  console.log("Poteka registracija");
  let username = document.getElementById("upIme").value;
  let password = document.getElementById("geslo").value;
  console.log(username + " " + password);

  axios.post('/register', {
    username: username,
    password: password
  })
  .then(function (response) {
    console.log(response.data);
    if(response.data);
    else window.alert("Uporabniško ime je že v uporabi!");
  })
  .catch(function (error) {
    console.log(error);
  });

}

function login(){
  let username = document.getElementById("vpisnoIme").value;
  let password = document.getElementById("vpisnoGeslo").value;
  
  axios.post('/authorisation', {
    username: username,
    password: password
  })
  .then(function (response) {
    if(response.data);
    else window.alert("Vaše uporabniško ime in/ali geslo se ne ujemata!");
  })
  .catch(function (error) {
    console.log(error);
  });
}