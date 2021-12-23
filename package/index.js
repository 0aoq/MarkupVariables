class MarkupVariableHandler {
    constructor() {
        this.variables = []

        // events
        this.events = {
            set: new CustomEvent('set-variable', {
                detail: {
                    variables: this.variables
                }
            })
        }

        // private functions
        this.markupify = () => {
            let html = document.documentElement.innerHTML
            let regex = /[v-vV-V]\!\{(.*?)\}/g // regex for v!{string}

            // replace all variables
            html = html.replaceAll(regex, (match, name) => {
                return `<val data-source="${match}" data-state="undefined(?)" hidden>${name}</val>`
            })

            document.documentElement.innerHTML = html
        }

        this.replaceVariables = function() {
            // replace all variables in the current page
            for (let variable of this.variables) {
                document.querySelectorAll(`val[data-source="v!{${variable.name}}"][data-state="undefined(?)"]`).forEach(element => {
                    element.setAttribute('data-state', 'defined')
                    element.setAttribute('data-source', '[revoked]')
                    element.removeAttribute('hidden')

                    element.innerHTML = variable.value
                })
            }
        }

        // run
        this.markupify()
    }

    // public functions
    set(props) {
        this.variables.push({ name: props.name, value: props.value })

        // replace all variables in the current page
        this.replaceVariables()

        // dispatch event
        document.dispatchEvent(this.events.set)
    }

    get(name) {
        // get variable by name
        for (let variable of this.variables) {
            if (variable.name === name) {
                return variable.value
            }
        }
    }

    getAll() {
        // replace all variables in the current page
        this.replaceVariables()

        return this.variables
    }

    clear() {
        this.variables = []
    }

    // event listeners
    on(event, callback) {
        switch (event) {
            case 'set':
                document.addEventListener('set-variable', callback)
                break
            default:
                console.warn('Invalid event.')
                break
        }
    }
}