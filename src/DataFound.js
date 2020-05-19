import React, { Component } from 'react';
import './App.css';
import empty from './em.svg';
class DataFound extends Component {
    constructor(props) {
        super(props);
        this.state = { operator: [] }
        this.InputValueChange = this.InputValueChange.bind(this);
        this.masterDivClass =  '';
    }

    componentDidMount(){
        if(localStorage.getItem("operatorValue") != null){
            let storedValue = JSON.parse(localStorage.getItem("operatorValue"));
            this.setState({ operator: storedValue });      
        }  
    }

    InputValueChange(action, event, index, value) {
        var InValueChanges = this.state.operator;
        var source = '';
        switch (action) {
            case 'plusClick':
                InValueChanges[index].showIconDiv = !InValueChanges[index].showIconDiv;
                break;
            case 'rightClickPlus':
            case 'rightClickAction':
                InValueChanges[index].rightIcon = !InValueChanges[index].rightIcon;
                InValueChanges[index].rightIconValue = 'plus';
                break;
            case 'buttonChanges':
                InValueChanges[index].operation = event.target.value == 'and' ? 'or' : 'and';
                break;
            case 'textChanges':
                InValueChanges[index].title = event.target.value;
                break;
            case 'removeItem':
                InValueChanges.splice(index, 1);
                break;
            case 'updateIconValue':
                InValueChanges[index].icon = event.currentTarget.getAttribute('attr');
                InValueChanges[index].showIconDiv = 'false';
                break;
            case 'dbClick':
                InValueChanges[index].readonly = !InValueChanges[index].readonly;
                break;
            case 'rightClickBrack':
                this.ConditionalOperatorCheck(event,index,value);
                InValueChanges[index].rightIconValue = event.currentTarget.getAttribute('attr');
                InValueChanges[index].rightIcon = 'false';
                break;
            default:
                break;
        }
        this.setState({ operator: InValueChanges });
        this.CreateStorage(InValueChanges);
    }

    CreateStorage(value) {
        localStorage.setItem("operatorValue",JSON.stringify(value));
    }
   
    ConditionalOperatorCheck(ev,index,currentValue) {
        let previosValue = document.querySelectorAll('.masterDiv .ButtonDiv button');
        previosValue = previosValue[document.querySelectorAll('.masterDiv .ButtonDiv button').length-2].value;
        var element = document.getElementById("drag"+index);
        element.classList.remove("borderbox");     
        if(currentValue == previosValue){
            element.classList.add("borderbox");     
            this.masterDivClass =  '';
        }else{
            this.masterDivClass =  'borderMainbox';
            element.classList.remove("borderbox");     
        }
    }

    Addcondition = () => {
        this.masterDivClass =  '';
        var InValueChanges = this.state.operator;
        if(InValueChanges.length>7){
            alert("Limit Exceed!! ");
            return true;
        }
        InValueChanges.push({ title: 'New Condtion Name', operation: 'and', icon: 'plus', showIconDiv: true, rightIcon: true, rightIconValue: 'plus', readonly: 'false'});
        this.setState({ operator: InValueChanges });
    }

    AllowDrop = (ev) => {
        ev.preventDefault();
    }

    Drag = (ev) => {
        ev.dataTransfer.setData("src", ev.target.id);
    }

    Drop = (ev) => {
        ev.preventDefault();
        var src = document.getElementById(ev.dataTransfer.getData("src"));
        var srcParent = src.parentNode;
        var tgt = ev.currentTarget.firstElementChild;
        ev.currentTarget.replaceChild(src, tgt);
        srcParent.appendChild(tgt);
    }

    render() {
        let StateValue = this.state.operator;
        return (
            <div className="ButtonClass">
                {StateValue.length > 0 &&
                    <span>
                        <a href="#" onClick={this.Addcondition}><i className="fa fa-plus" aria-hidden="true" ></i> New Condition</a><br />
                    </span>
                }
                <div className={this.masterDivClass}>
                {
                    this.state.operator.length > 0 ? this.state.operator.map((item, index) => (
                        <div className="masterDiv">
                            <div id={'div' + index} onDrop={this.Drop} onDragOver={this.AllowDrop}>
                                <div id={'drag' + index} draggable="true" onDragStart={this.Drag} className=" cls-edit row">
                                    <div className={item.showIconDiv ? 'col-md-1 paddinClass' : 'col-md-2 paddinClass'}>
                                        <span className={item.showIconDiv ? 'Show' : 'Hide'}>
                                            {item.icon != 'other' ?
                                                <a href="#" onClick={(event) => this.InputValueChange('plusClick', event, index)}><i className={'fa fa-' + item.icon + ' Icon'} aria-hidden="true" ></i></a>
                                                : <a onClick={(event) => this.InputValueChange('plusClick', event, index)} href="#" className="Icon" value="other"> ( </a>
                                            }
                                        </span>
                                        <span className={item.showIconDiv ? 'Hide' : 'Show'}>
                                            <a href="#" onClick={(event) => this.InputValueChange('removeItem', event, index)} ><i id={index} className="fa fa-ban Icon " aria-hidden="true" ></i></a>
                                            <a href="#" attr="exclamation" onClick={(event) => this.InputValueChange('updateIconValue', event, index)} ><i className="fa fa-exclamation Icon" aria-hidden="true" ></i></a>
                                            <a href="#" attr="other" onClick={(event) => this.InputValueChange('updateIconValue', event, index)} className="Icon"> (</a>
                                            <a href="#" attr="other" onClick={(event) => this.InputValueChange('updateIconValue', event, index)} className="Icon"> ( </a>
                                            <a href="# " attr="exclamation" onClick={(event) => this.InputValueChange('updateIconValue', event, index)}><i className="fa fa-exclamation Icon" aria-hidden="true" ></i></a>
                                        </span>
                                    </div>
                                    <div className={item.showIconDiv ? 'col-md-9 mobilesmcenter ' : 'col-md-8 mobilesmcenter'}  >
                                        <input maxlength="25" type="text" id={'inputValue_'+index} key={index} value={item.title} className="Input-field " onChange={(event) => this.InputValueChange('textChanges', event, index)} name="data" readOnly={item.readonly} onDoubleClick={(event) => this.InputValueChange('dbClick', event, index)} />
                                    </div>
                                    <div className="col-md-2 text-right mobilesmtwo">
                                        <span className={item.rightIcon ? 'Show' : 'Hide'}>
                                            {item.rightIconValue != 'other' ?
                                                  <a href="#" onClick={(event) => this.InputValueChange('rightClickPlus', event, index)}><i className={'fa fa-' + item.rightIconValue + ' Icon'} aria-hidden="true" ></i></a>
                                                : <a href="#" onClick={(event) => this.InputValueChange('rightClickPlus', event, index)} className="Icon" value="other"> ) </a>
                                            }
                                        </span>
                                        <span className={item.rightIcon ? 'Hide' : 'Show'}>
                                            <a attr="other" onClick={(event) => this.InputValueChange('rightClickBrack', event, index, item.operation)} href="#" > ) </a>
                                            <a href="#" onClick={(event) => this.InputValueChange('rightClickAction', event, index)} ><i id={index} className="fa fa-ban Icon " aria-hidden="true" ></i></a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="ButtonDiv">
                                <button className="btn btn-light BtnWidht" onClick={(event) => this.InputValueChange('buttonChanges', event, index)} value={item.operation}>{item.operation}</button>
                            </div>
                        </div>
                    )) :
                        <div id="artiststhumbnail">
                            <img src={empty} className="Nodata" alt="No Condition" /><br />
                            <span className="">No Condition</span><br />
                            <a href="#" onClick={this.Addcondition}><i className="fa fa-plus" aria-hidden="true" ></i> New Condition</a>
                        </div>
                }
                </div>
            </div>);
    }
}
export default DataFound;