const root = document.getElementById('root');

function Mainfunction(mainElements, root){
    const element = document.createElement(mainElements.type);
    element.innerHTML = mainElements.children;

    /* 
    element.setAttribute('href', mainElements.props.href);
    element.setAttribute('target', mainElements.props.target);
    */

    for (const i in mainElements.props){
        if(i==='children') continue;
        element.setAttribute(i, mainElements.props[i])
    }
    root.appendChild(element);
}

const mainElements = {
    type: 'a',
    props: {
        href: 'http://github.com/dashboard/',
        target: '_blank'
    },
    children: 'Click to open github'
}

Mainfunction(mainElements, root)