const binds = [
    {
        title: 'смена оружия на нож и обратно',
        command: 'bind v +knife',
        status: false
    },{
        title: 'смена оружия на нож и обратно',
        command: 'bind v +knife',
        status: true,
        hasParameter: true,
        defaultKey: 'q'
    }
]

const bindsContainer = document.getElementById("binds-container")

binds.forEach(bind => {
    const newNode = document.createElement('div')
    newNode.classList.add('bind')
    bind.status && newNode.classList.add('active')
    if (bind.hasParameter) {
        const title = document.createElement('p')
        title.textContent = bind.title
        const input = document.createElement('input')
        input.value = bind.defaultKey
        newNode.appendChild(title)
        newNode.appendChild(input)
    } else {
        newNode.textContent = bind.title
    }
    bindsContainer.appendChild(newNode)
})