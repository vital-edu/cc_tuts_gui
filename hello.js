var holochain_connection = holochainclient.connect({
  url: 'ws://localhost:8888',
})

function hello() {
  holochain_connection.then(({ callZome, close }) => {
    callZome('test-instance', 'hello', 'hello_holo')({ args: {} })
      .then((result) => showOutput(result, 'output'))
  })
}

function showOutput(result, id) {
  let el = document.getElementById(id)
  let output = JSON.parse(result)
  if (output.Ok) {
    el.textContent = output.Ok;
  } else {
    alert(output.Err.Internal);
  }
}

function showPerson(result) {
  let el = document.getElementById('person_output')
  let output = JSON.parse(result)
  if (output.Ok) {
    el.innerText = output.Ok.name
  } else {
    alert(output.Err.Internal);
  }
}

function createPerson() {
  holochain_connection.then(({ callZome, close }) => {
    let name = document.getElementById('name').value
    callZome('test-instance', 'hello', 'create_person')({ person: { name } })
      .then((result) => showOutput(result, 'address_output'))
  })
}

function retrievePerson() {
  let address = document.getElementById('address_in').value
  holochain_connection.then(({ callZome, close }) => {
    callZome('test-instance', 'hello', 'retrieve_person')({
      address
    }).then((result) => showPerson(result))
  })
}

function update_port() {
  let port = document.getElementById('port').value
  holochain_connection = holochainclient.connect({
    url: 'ws://localhost:' + port
  })
}