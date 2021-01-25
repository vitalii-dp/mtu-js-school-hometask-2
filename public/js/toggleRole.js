const tableBody = document.getElementById('table-body');
tableBody.addEventListener('click', async (e) => {
  if (e.target.tagName === 'BUTTON') {
    const userId = e.target.parentNode.parentNode.children[0].firstChild.data
    const response = await fetch('/admin/toggleRole', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId})
    }).then(res => location.reload())
  } else {
    return
  }
})