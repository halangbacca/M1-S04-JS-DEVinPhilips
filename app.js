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

// Funcões operações
const trocarOperacao = (evento) => {
  const valor = document.getElementById("valor");

  valor.disabled = evento.target.value === "SALDO";
};

const obterConta = (conta) => {
  const contaCliente = contasClientes.find((c) => c.conta === conta);

  return contaCliente;
};

const sacar = (conta, valor) => {
  if (validarValor(valor)) {
    if (validarSaldo(conta, valor)) {
      let saldoAtual;
      const contasAtualizadas = contasClientes.map((c) => {
        if (c.conta === conta) {
          saldoAtual = c.saldo - valor;
          return { ...c, saldo: saldoAtual };
        }
        return c;
      });

      contasClientes = contasAtualizadas;

      alert(`Saque efetuado com sucesso! Saldo atual: ${saldoAtual}`);
    } else {
      alert("Saldo insuficiente");
    }
  } else {
    alert("Valor inválido");
  }
};

const depositar = (conta, valor) => {
  if (validarValor(valor)) {
    const contaCliente = { ...obterConta(conta) };
    contaCliente.saldo += valor;

    const contasAtualizadas = contasClientes.filter((c) => c.conta !== conta);
    contasAtualizadas.push(contaCliente);
    contasClientes = contasAtualizadas;

    alert(`Depósito efetuado com sucesso! Saldo atual: ${contaCliente.saldo}`);
  } else {
    alert("Valor inválido");
  }
};

const consultarSaldo = (conta) => {
  const contaCliente = obterConta(conta);

  alert(`Saldo atual: ${contaCliente.saldo}`);
};

const validarConta = (conta, senha) => {
  const contaCliente = obterConta(conta);

  return contaCliente && contaCliente.senha === senha ? true : false;
};

const validarValor = (valor) => {
  return !isNaN(valor) && valor > 0;
};

const validarSaldo = (conta, valor) => {
  const contaCliente = obterConta(conta);

  return contaCliente.saldo >= valor;
};

const efetuarOperacao = (evento) => {
  evento.preventDefault();

  const conta = parseInt(evento.target.conta.value);
  const senha = evento.target.senha.value;
  const valor = parseInt(evento.target.valor.value);

  const contaValida = validarConta(conta, senha);

  if (contaValida) {
    switch (evento.target.operacao.value) {
      case "Saque":
        sacar(conta, valor);
        break;
      case "Depósito":
        depositar(conta, valor);
        break;
      case "Saldo":
        consultarSaldo(conta);
        break;
      default:
        alert("Operação inválida");
    }
  } else {
    alert("Conta ou senha inválida");
  }
};

const operacao = document.getElementById("operacao");
operacao.addEventListener("change", trocarOperacao);

const formAcoes = document.getElementById("form-acoes");
formAcoes.addEventListener("submit", efetuarOperacao);
