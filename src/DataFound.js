import React, { Component } from 'react';
import './App.css';
import empty from './em.svg';
class DataFound extends Component {
    constructor() {
        super();
        this.state = {
            operator: [
            ],
        }
        this.InputValueChange = this.InputValueChange.bind(this);
    }

    InputValueChange(action,event,index) {
        let key = event.target.id;
        var InValueChanges = this.state.operator; 
        switch (action) {
            case 'plusClick':
                InValueChanges[key].showIconDiv = false;
                break;
            case 'rightClickPlus':
                InValueChanges[index].rightIcon = !InValueChanges[index].rightIcon;
                break;
            case 'buttonChanges':
                InValueChanges[key].operation = event.target.value == 'and' ? 'or' : 'and';
                break;
            case 'textChanges':
                InValueChanges[key].title = event.target.value;
                break;
            case 'removeItem':
                InValueChanges.splice(key,1);
                break;
            case 'updateIconValue':
                InValueChanges[index].icon = event.currentTarget.getAttribute('attr');
                InValueChanges[index].showIconDiv = 'false';                
                break;
            case 'dbClick':
                InValueChanges[index].readonly = !InValueChanges[index].readonly;
                break;
            default:
                break;
        }
        console.log(InValueChanges,'InValueChanges');
        this.setState({ operator: InValueChanges });
    }

    Addcondition = () => {
        var InValueChanges = this.state.operator;
        InValueChanges.push({ title: 'New Condtion Name', operation: 'and', icon: 'plus',showIconDiv: true ,rightIcon: true,rightIconValue: 'plus',readonly:'false'});
        this.setState({ operator: InValueChanges });
    }
    render() {
        let StateValue =this.state.operator;
        return (
            <div className="ButtonClass">
                {StateValue.length> 0 && 
                <span>
                    <a href="#" onClick={this.Addcondition}><i className="fa fa-plus" aria-hidden="true" ></i> New Condition</a><br/>
                    </span>
                }
                {
                this.state.operator.length > 0 ?  this.state.operator.map((item, index) => (
                    <div className= "masterDiv">
                        <div className=" cls-edit row">
                            <div className={item.showIconDiv ? 'col-md-1 paddinClass' : 'col-md-2 paddinClass'}>
                                <span className={item.showIconDiv ? 'Show' : 'Hide'}>
                                {item.icon != 'other' ?
                                    <a href="#"   onClick={(event)=>this.InputValueChange('plusClick',event)}><i id={index} className={'fa fa-' + item.icon + ' Icon'} aria-hidden="true" ></i></a>
                                    : <a href="#" className="Icon"  value="other"> ( </a>
                                }
                                </span>
                                <span className={item.showIconDiv ? 'Hide' : 'Show'}>
                                    <a href="#"  onClick={(event)=>this.InputValueChange('removeItem',event,index)} ><i id={index} className="fa fa-ban Icon "  aria-hidden="true" ></i></a>
                                    <a href="#"  attr="exclamation" onClick={(event)=>this.InputValueChange('updateIconValue',event,index)} ><i    className="fa fa-exclamation Icon"   aria-hidden="true" ></i></a>
                                    <a href="#" attr="other" onClick={(event)=>this.InputValueChange('updateIconValue',event,index)} className="Icon"> (</a>
                                    <a href="#" attr="other" onClick={(event)=>this.InputValueChange('updateIconValue',event,index)} className="Icon"> ( </a>
                                    <a href="# " attr="exclamation" onClick={(event)=>this.InputValueChange('updateIconValue',event,index)}><i className="fa fa-exclamation Icon"  aria-hidden="true" ></i></a>
                                </span>
                            </div>
                            <div className={item.showIconDiv ? 'col-md-9 ' : 'col-md-8 '}  > 
                                {/* <input type="text" id={index} key={index} value={item.title}  disabled className="Input-field" onChange={(event)=>this.InputValueChange('textChanges',event)} name="data" /> */}
                                <input type="text" id={index} key={index} value={item.title}  className="Input-field" onChange={(event)=>this.InputValueChange('textChanges',event)} name="data" readOnly={item.readonly}  onDoubleClick={(event)=>this.InputValueChange('dbClick',event,index)}/>
                            </div>
                            <div className="col-md-2 text-right">
                                <span className={item.rightIcon ? 'Show' : 'Hide'}>
                                    <a href="#"  onClick={(event)=>this.InputValueChange('rightClickPlus',event,index)} ><i className={'fa fa-plus Icon'} aria-hidden="true" ></i></a>
                                </span>
                                <span className={item.rightIcon ? 'Hide' : 'Show'}>
                                    <a href="#" > ) </a>
                                    <a href="#"  onClick={(event)=>this.InputValueChange('rightClickPlus',event,index)} ><i id={index} className="fa fa-ban Icon "  aria-hidden="true" ></i></a>
                                </span>
                            </div>
                        </div>
                        <div className="ButtonDiv">
                            <button className="btn btn-light BtnWidht" onClick={(event)=>this.InputValueChange('buttonChanges',event)} id={index} value={item.operation}>{item.operation}</button>
                        </div>
                    </div>
                )) : 
                <div id="artiststhumbnail">
                    <img src={empty} className="Nodata" alt="No Condition" /><br />
                    <span className="">No Condition</span><br />
                    <a href="#" onClick={this.Addcondition}><i className="fa fa-plus" aria-hidden="true" ></i> New Condition</a>
                </div>
                }
            </div>);
    }
}
export default DataFound;