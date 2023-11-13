const binds = [
    {
        title: 'прыжок на колесико и пробел',
        command: 'bind "mwheeldown" +jump; bind "mwheelup" +jump; bind "space" +jump;',
    }, {
        title: 'смена оружия на нож и обратно',
        command: 'alias +knife slot3; alias -knife lastinv; bind BIND_KEY +knife;',
        hasParameter: true,
        key: 'q'
    }, {
        title: 'jump throw',
        command: 'alias "+boing" "+jump"; alias "+ding" "-attack; -attack2"; alias "+dong" "-jump"; bind BIND_KEY "+boing; +ding; +dong";',
        hasParameter: true,
        key: 'v'
    }, {
        title: 'показать FPS',
        command: 'cl_showfps 1;'
    }, {
        title: 'duck jump',
        command: 'alias +djump "+jump; +duck"; alias -djump "-jump; -duck"; bind "SPACE" "+djump";'
    }
]

let selectedBinds = []

const bindsContainer = document.getElementById("binds-container")
const output = document.getElementById('output')

output.onclick = () => {
    const text = output.textContent;

    text && navigator.clipboard.writeText(text)
        .then(() => {
            output.classList.add('success')
            setTimeout(() => output.classList.remove('success'), 100)
        })
        .catch(err => {
            console.error("Не удалось скопировать текст в буфер обмена: ", err);
        });
};

const renderBinds = () => {
    bindsContainer.innerHTML = null

    binds.forEach(bind => {
        const newNode = document.createElement('div')
        newNode.classList.add('bind')
        const active = selectedBinds.find(({title}) => title === bind.title)

        newNode.onclick =  () => {
            active
                ? selectedBinds = selectedBinds.filter(({title}) => title != bind.title)
                : selectedBinds.push(bind)
            renderBinds()
            renderOutput()
        }

        active && newNode.classList.add('active')

        if (bind.hasParameter) {
            const title = document.createElement('p')
            title.textContent = bind.title
            const input = document.createElement('input')
            input.value = bind.key
            input.onclick = (e => e.stopPropagation())
            input.onchange = (e => {
                bind.key = e.target.value
                renderOutput()
            })
            newNode.appendChild(title)
            newNode.appendChild(input)
        } else {
            newNode.textContent = bind.title
        }

        bindsContainer.appendChild(newNode)
    })
}

const renderOutput = () => {
    if (!selectedBinds.length) {
        output.style.display = 'none';
        return
    }

    output.style.display = 'block'

    output.textContent = selectedBinds.map((bind) => {
        if (bind.hasParameter) {
            return bind.command.replace('BIND_KEY', bind.key)
        }
        return bind.command
    }).join('\n')
}

renderBinds()
renderOutput()