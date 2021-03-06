var arrDespesas = []
var despesasFiltradas
imprimirDespesas(arrDespesas)
imprimirExtrato()

// PRIMEIRO
function imprimirDespesas(despesas) {
  console.log(despesas)
  let divDespesas = document.getElementById('despesas')
  divDespesas.innerHTML = '<p><u>Despesas Detalhadas</u></p>'

  // AQUI VEM A IMPLEMENTAÇÃO

  const lista_despesas = despesas.map(item => {
    return `<li>valor : ${item.valor} | tipo: ${item.tipo} | descrição: ${item.descricao}</li>`
  })
  console.log(lista_despesas)

  divDespesas.innerHTML += `<p>${lista_despesas}</p>`
}

// SEGUNDO
function imprimirExtrato() {
  let divExtrato = document.getElementById('extrato')
  let gastoTotal = 0
  let gastoAlimentacao = 0
  let gastoUtilidades = 0
  let gastoViagem = 0

  arrDespesas.forEach(item => {
    if (item.tipo === 'alimentação') {
      gastoAlimentacao = gastoAlimentacao + item.valor
    } else if (item.tipo === 'utilidades') {
      gastoUtilidades = gastoUtilidades + item.valor
    } else if (item.tipo === 'viagem') {
      gastoViagem = gastoViagem + item.valor
    }
    gastoTotal = gastoTotal + item.valor
  })

  // AQUI VEM A IMPLEMENTAÇÃO

  divExtrato.innerHTML = `<p>Extrato: Gasto Total: R$${gastoTotal} | Alimentação: R$${gastoAlimentacao} | 
       Utilidades: R$${gastoUtilidades} | Viagem: R$${gastoViagem}</p>`
}

function limparFiltros() {
  document.getElementById('tipoFiltro').value = ''
  document.getElementById('valorFiltroMin').value = ''
  document.getElementById('valorFiltroMax').value = ''

  despesasFiltradas = arrDespesas //arrumar aqui
}

function adicionarDespesa() {
  let valorCdt = document.getElementById('valorCadastro')
  let tipoCtd = document.getElementById('tipoCadastro')
  let descricaoCtd = document.getElementById('descricaoCadastro')

  if (
    validarValor(valorCdt) &&
    validarTipo(tipoCtd) &&
    validarDescricao(descricaoCtd)
  ) {
    let novaDespesa = {
      valor: Number(valorCdt.value),
      tipo: tipoCtd.value,
      descricao: descricaoCtd.value
    }

    arrDespesas.push(novaDespesa)

    valorCdt.value = ''
    tipoCtd.value = ''
    descricaoCtd.value = ''

    limparFiltros()
    imprimirDespesas(arrDespesas)
    imprimirExtrato()
  } else {
    alert('`Faltou algum valor ou algum valor é um número negativo`')
  }
}

// TERCEIRO
function filtrarDespesas() {
  let tipoFiltro = document.getElementById('tipoFiltro').value
  let valorMin = Number(document.getElementById('valorFiltroMin').value)
  let valorMax = Number(document.getElementById('valorFiltroMax').value)

  if (tipoFiltro !== 'todos') {
    despesasFiltradas = arrDespesas.filter(item => item.tipo === tipoFiltro)
  } else if (valorMax) {
    despesasFiltradas = arrDespesas.filter(item => item.valor <= valorMax)
  } else if (valorMin) {
    despesasFiltradas = arrDespesas.filter(item => item.valor >= valorMin)
  } else {
    despesasFiltradas = arrDespesas
  }

  imprimirDespesas(despesasFiltradas)
}

// FunÇoes que fazem validaÇoes dos inputs de criaÇao de despesas

// NÃO SE PREOCUPEM EM ENTENDER ESSAS FUNÇÕES

function validarValor(valor) {
  if (valor.value.length > 0 && parseInt(valor.value) > 0) {
    return true
  }
  return false
}

function validarTipo(tipo) {
  if (tipo.value !== '') {
    return true
  }
  return false
}

function validarDescricao(texto) {
  if (texto.value.replace(/ /g, '').length !== 0) {
    return true
  }
  return false
}
