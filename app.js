let contasClientes = [];

const validarSenha = (evento) => {
  if (evento.target.senha.value === evento.target.confirmacao.value) {
    return true;
  }
  return false;
};

const cadastrarConta = (evento) => {
  evento.preventDefault();

  if (validarSenha(evento)) {
    const conta = {
      nome: evento.target.nome.value,
      cpf: evento.target.cpf.value,
      celular: evento.target.celular.value,
      senha: evento.target.senha.value,
      conta: Math.floor(1000 + Math.random() * 90000),
      saldo: 0,
    };

    contasClientes.push(conta);
    alert(`Conta criada com sucesso! Número: ${conta.conta}`);
  } else {
    alert("Senhas não conferem");
  }
};

const form = document.getElementById("form");
form.addEventListener("submit", cadastrarConta);
