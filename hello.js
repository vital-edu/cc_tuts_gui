var holochain_connection = holochainclient.connect({
  url: 'ws://localhost:3401',
})

function hello() {
  holochain_connection.then(({ callZome, close }) => {
    callZome('test-instance', 'hello', 'hello_holo')({ args: {} })
      .then((result) => showOutput(result))
  })
}

function showOutput(text) {
  let span = document.getElementById('output')
  let parsedText = JSON.parse(text)
  span.textContent = parsedText.Ok;
}