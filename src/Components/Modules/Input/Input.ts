import Component from "../../index";
import './Input.css'

class Input extends Component{
    private label:string;   // текст инпута
    private type:string; // тип инпута
    private selectData:string[]; // массив для select
    private startValue: string; // начальное значение
    private inputProperty:string; // изменяемое свойство, передается в eventFunction
    private eventFunction;  // функция для инпута
    constructor(eventFunction: (prop:string, val:string) => void, label:string, inputProperty:string = '',startValue:string = '', type:string = 'text', selectData:string[] = [], classList:string = 'event-page-input') {
        super(classList);
        this.label = label;
        this.type = type;
        this.selectData = selectData;
        this.eventFunction = eventFunction;
        this.startValue = startValue;
        this.inputProperty = inputProperty;
    }

    private renderDefaultInput(){ //  innerHTML для блока инпута
        if (this.type === 'checkbox'){
            return `
                <input value="${this.startValue}" type="${this.type}">
                <label>${this.label}</label>
                `;
        }
        return `<label>${this.label}</label>
                <input value="${this.startValue}" type="${this.type}">
                `;
    }

    private renderInputSelect(){ //  innerHTML для блока select инпута
        let opts = '';
        for (let k = 0;k < this.selectData.length; k++){
            let sel = '';
            if (this.selectData[k] === this.startValue){
                sel = 'selected'
            }
            opts = opts + `<option value="${this.selectData[k]}" ${sel}>${this.selectData[k]}</option>` + '\n';
        }

        return `<label>${this.label}</label>
                <select name="sel" id="0">
                ${opts}
                </select>
                `;
    }

    private addListener(){ // добавить лисенер на контейнер, для исполнения eventFunction
        this.container.addEventListener('input', (e) =>{
            if (e.target !== null){
                const elem = e.target as HTMLInputElement;
                if (this.type === 'checkbox'){
                    this.eventFunction(this.inputProperty, elem.checked.toString());
                }else{
                    this.eventFunction(this.inputProperty, elem.value);
                }
            }
        })
    }

    render() {
        if (this.type === 'select'){
            this.container.innerHTML = this.renderInputSelect();
        }else {
            this.container.innerHTML = this.renderDefaultInput();
        }
        this.addListener();
        return this.container;
    }

}
export default Input;