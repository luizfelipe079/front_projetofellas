var TOKEN_LOGIN

function login(){
    const campos = camposLogin()
    
    const result = loginService.login(campos).then((item) => {
        // window.location.href = "Consulta.html"
        setToken(item)
    }).catch(error => {
        alert(error)
    })
}

function getToken(){
    return this.TOKEN_LOGIN
}

function setToken(token){
    this.TOKEN_LOGIN = token
    console.log(this.TOKEN_LOGIN)
}

const loginService = {
    login: campos => {
        return callApi({
            method: "POST",
            url: "http://localhost:8080/v1/login",
            params: campos
        })
    },

    get: campos => {
        return callApi({
            method: "POST",
            url: "http://localhost:8080/v1/cachorros",
        })
    }
}
function camposLogin(){
    return {
        email: form.email().value,
        senha: form.senha().value
    }
}

const form = {
    email: () => document.getElementById("emailLogin"),
    senha: () => document.getElementById("passwordLogin")
}

function callApi({method, url, params}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        //xhr.setRequestHeader('Authorization', await firebase.auth().currentUser.getIdToken())
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '')
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                const json = this.responseText;
                console.log(this.status)
                if (this.status != 200) {
                    reject(json || 'Falha ao logar');
                } else {
                    resolve(json);
                }
            }
        };
        
        xhr.responseType = "text"
        xhr.send(JSON.stringify(params));
    })
}