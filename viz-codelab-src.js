function drawViz(data) {

  // Container setup.
  let container = document.getElementById('container');
  if (container) {
    container.textContent = '';
  } else {
    container = document.createElement('div')
    container.id = 'container'
    document.body.appendChild(container);
  }

  // Render the viz.
  container.textContent = 'Hello, viz world!';

}

// Subscribe to data and style changes. Use the table format for data.
dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
