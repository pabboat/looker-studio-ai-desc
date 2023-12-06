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
  
    // Create the table.
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');
  
    data.tables.DEFAULT.headers.forEach(function (column) {
      const tableColumn = document.createElement('th');
      tableColumn.textContent = column.name;
      tableHeader.appendChild(tableColumn);
    });
  
    data.tables.DEFAULT.rows.forEach(function(row) {
      const tableRow = document.createElement('tr');
      row.forEach(function(cell) {
        const tableCell = document.createElement('td');
        if (typeof cell == 'number') {
          tableCell.textContent = new Intl.NumberFormat().format(cell);
        } else {
          tableCell.textContent = cell;
        }
        tableRow.appendChild(tableCell);
      });
      tableBody.appendChild(tableRow);
    });
    table.appendChild(tableHeader);
    table.appendChild(tableBody);
  
    // Set header color based on style control.
    tableHeader.style.backgroundColor = data.style.headerBg.value.color;
  
    // Render the table.
    container.appendChild(table);
  
  }
  
  // Subscribe to data and style changes. Use the table format for data.
  dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
  