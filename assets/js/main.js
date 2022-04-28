const input = document.querySelector('.input-tarefa')
const btn = document.querySelector('.btn-tarefa')
const lista = document.querySelector('.tarefas')

function criaLista() {
  const lista = document.createElement('li')
  return lista
}

function criaTarefa(txt) {
  const li = criaLista()
  li.innerHTML = txt
  lista.appendChild(li)
  limpaInput()
  btnApagar(li)
  salvarTarefas()
}

function limpaInput() {
  input.value = ''
  input.focus()
}

function btnApagar(li) {
  li.innerText += ' '
  const botaoApagar = document.createElement('button')
  botaoApagar.innerText = 'Apagar'
  botaoApagar.setAttribute('class', 'apagar')
  li.appendChild(botaoApagar)
}

input.addEventListener('keypress', (e) => {
  if(e.keyCode === 13) {
    if(!input.value) return
    criaTarefa(input.value)
  }
})

btn.addEventListener('click', () => {
  if(!input.value) return
  criaTarefa(input.value)
})

document.addEventListener('click', (e) => {
  const el = e.target

  if(el.classList.contains('apagar')) {
    el.parentElement.remove()
    salvarTarefas()
  }
})

function salvarTarefas() {
  const liTarefas = lista.querySelectorAll('li')
  const arrayTarefas = []

  for(let tarefa of liTarefas) {
    let tarefaTxt = tarefa.innerText
    tarefaTxt = tarefaTxt.replace('Apagar', '').trim()
    arrayTarefas.push(tarefaTxt)
  }

  const tarefasJSON = JSON.stringify(arrayTarefas)
  localStorage.setItem('tarefas', tarefasJSON)
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas')
  const arrayTarefas = JSON.parse(tarefas)

  for (let tarefa of arrayTarefas) {
    criaTarefa(tarefa)
  }
}
adicionaTarefasSalvas()