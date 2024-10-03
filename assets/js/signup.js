import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAIBSPeCOHjCj-nl-GjYCB1exuEIbrZahE",
    authDomain: "receitas-f30ab.firebaseapp.com",
    projectId: "receitas-f30ab",
    storageBucket: "receitas-f30ab.appspot.com",
    messagingSenderId: "617335034773",
    appId: "1:617335034773:web:bfe57b6868c77b99ea9c9c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const usuario = document.querySelector('#usuario');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const confirmSenha = document.querySelector('#confirmSenha');
const msgError = document.querySelector('#msgError');
const msgSuccess = document.querySelector('#msgSuccess');
const labelUsuario = document.querySelector('#labelUsuario');
const labelSenha = document.querySelector('#labelSenha');
const labelConfirmSenha = document.querySelector('#labelConfirmSenha');

let validUsuario = false;
let validSenha = false;
let validConfirmSenha = false;


usuario.addEventListener('keyup', () => {
    if (usuario.value.length < 5) {
        labelUsuario.style.color = 'red';
        labelUsuario.innerHTML = 'Usuário *Insira no mínimo 5 caracteres';
        usuario.style.borderColor = 'red';
        validUsuario = false;
    } else {
        labelUsuario.style.color = 'green';
        labelUsuario.innerHTML = 'Usuário';
        usuario.style.borderColor = 'green';
        validUsuario = true;
    }
});


senha.addEventListener('keyup', () => {
    if (senha.value.length < 6) {
        labelSenha.style.color = 'red';
        labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres';
        senha.style.borderColor = 'red';
        validSenha = false;
    } else {
        labelSenha.style.color = 'green';
        labelSenha.innerHTML = 'Senha';
        senha.style.borderColor = 'green';
        validSenha = true;
    }
});


confirmSenha.addEventListener('keyup', () => {
    if (senha.value !== confirmSenha.value) {
        labelConfirmSenha.style.color = 'red';
        labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
        confirmSenha.style.borderColor = 'red';
        validConfirmSenha = false;
    } else {
        labelConfirmSenha.style.color = 'green';
        labelConfirmSenha.innerHTML = 'Confirmar Senha';
        confirmSenha.style.borderColor = 'green';
        validConfirmSenha = true;
    }
});


async function cadastrar() {
    if (!validUsuario || !validSenha || !validConfirmSenha) {
        msgError.style.display = 'block';
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
        msgSuccess.innerHTML = '';
        msgSuccess.style.display = 'none';
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, senha.value);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            usuarioCad: usuario.value,
            emailCad: email.value
        });

        msgSuccess.innerText = "Usuário cadastrado com sucesso!";
        msgSuccess.style.display = 'block';
        msgError.style.display = 'none';

        setTimeout(() => {
            window.location.href = '../html/signin.html';
        }, 2000);
    } catch (error) {
        msgError.innerText = `Erro: ${error.message}`;
        msgError.style.display = 'block';
        msgSuccess.style.display = 'none';


        console.error("Erro ao cadastrar:", error);
    }
}


document.querySelector('.justify-center button').addEventListener('click', cadastrar);


document.querySelector('#verSenha').addEventListener('click', () => {
    const inputSenha = document.querySelector('#senha');
    inputSenha.type = inputSenha.type === 'password' ? 'text' : 'password';
});


document.querySelector('#verConfirmSenha').addEventListener('click', () => {
    const inputConfirmSenha = document.querySelector('#confirmSenha');
    inputConfirmSenha.type = inputConfirmSenha.type === 'password' ? 'text' : 'password';
});
