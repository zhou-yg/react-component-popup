let React = require('react');
let ReactDOM = require('react-dom');

let body = document.querySelector('body');

const popupStyle = {
}

const blackBgStyle = {
  zIndex:5000,
  backgroundColor: '#000000',
  opacity: '0.8',
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
}

const contentStyle = {
  zIndex:10000,
  position: 'fixed',
  left: '50%',
  top:'50%',

  transform: 'translate(-50%,-50%)'
}

class Popup extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      style:props.style
    }
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  close(e){
    if(e.target.className === 'black-bg'){
      this.props.close();
    }
  }

  render() {
    return (
      <div className="popup" onClick={this.close.bind(this)}>
        <div className="black-bg" style={blackBgStyle}></div>
        <div ref="content" className="content" style={Object.assign({},contentStyle,this.state.style)}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

let container = ()=>{
  return document.createElement('div');
};

module.exports = (reactElement,style={}) => {

  let isRemoved = false;

  let div = container();
  body.appendChild(div);


  let close = ()=>{
    requestAnimationFrame(()=> {

      if (!isRemoved) {
        isRemoved = true;

        ReactDOM.unmountComponentAtNode(div);
        requestAnimationFrame(()=> {
          div.remove();
        });
      }
    });
  };


  ReactDOM.render(
    <Popup style={style} close={close}>
      {React.cloneElement(reactElement,{
        close:close
      })}
    </Popup>,
    div
  );



  return close;
};