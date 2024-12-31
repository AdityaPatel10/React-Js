import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import Trial from './Trial.tsx'

// const NewElement = React.createElement(
//   'a',
//   {href: 'http://github.com/facebook/react', target: '_blank'},
//   'click to open react'
// )

interface MainElement{
  type: string,
  props : {href: string, target: string},
  children: string,
}

let child : string = "Click to open github react page...";

const MainElements : MainElement = {
  type: 'a',
  props: {
      href: 'http://github.com/facebook/react',
      target: '_blank'
  },
  children: `${child}`
}

const NewElement = React.createElement(
  MainElements.type,
  MainElements.props,
  MainElements.children,
)

const Ele = React.createElement(
  'a',
  {href: 'http://google.com/', target: '_blank'},
  'Google'
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  {Ele}
  <br />
    {NewElement}
  </>
    /* <Trial /> */

)
