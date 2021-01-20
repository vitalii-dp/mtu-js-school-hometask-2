$('th').click(function () {
  const table = $(this).parents('table').eq(0)
  let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
  this.asc = !this.asc
  if (!this.asc) {
    rows = rows.reverse()
  }
  for (let i = 0; i < rows.length; i++) {
    table.append(rows[i])
  }
})

function comparer(index) {
  return function (a, b) {
    const valueA = getCellValue(a, index)
    const valueB = getCellValue(b, index)
    return $.isNumeric(valueA) && $.isNumeric(valueB) ? valueA - valueB : valueA.toString().localeCompare(valueB)
  }
}

function getCellValue(row, index) {
  return $(row).children('td').eq(index).text()
}