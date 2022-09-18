import Component from "../../index";
import Button from "../Button/Button";
import Input from "../Input/Input";
import './List.css';


class List extends Component{
    private listData; // массив значений обьекта
    private selectedItem; //выбраный элемент в select
    private newItemText; // значение нового элемента, который возможно будет добавлен в listData
    private eventFunction; // возвращает массив значений из листа
    private inputProperty; // свойство предка которое изменяет list
    //изменяемые элементы
    private deleteButton; // кнопка удаления элемента из списка
    private listElement; // сожержит перерисовываемый select
    private textInput; // инпут для нового элемента
    private addbutton; // кнопка добавления в список

    //binds
    private updateDataFunc;
    private addFunction;
    private deleteFunction;


    constructor(eventFunction: (prop:string, val:string | string[]) => void, label:string, inputProperty:string = '',startValue:string = '', type:string = 'text', selectData:string[] = [], classList:string = 'event-page-input') {
        super(classList);

        this.listData = selectData;
        this.inputProperty = inputProperty;
        this.eventFunction = eventFunction;

        this.updateDataFunc = this.updateTextData.bind(this);
        this.addFunction = this.addToList.bind(this);
        this.deleteFunction = this.deleteFromList.bind(this);

        this.selectedItem = ''
        this.newItemText = '';

        // нинициализанция изменяемых элементов
        this.textInput = document.createElement('div');
        this.textInput.append(new Input(this.updateDataFunc, 'Новый участник', 'members', this.selectedItem, 'text').render());
        this.addbutton = new Button(this.addFunction, 'Добавить').render();
        this.addbutton.classList.add('opacity');
        this.deleteButton = new Button(this.deleteFunction, 'Удалить').render();
        this.deleteButton.classList.add('opacity');
        this.listElement = document.createElement('div');
        this.listElement.addEventListener('input',(e) => {
            this.selectedItem = (e.target as HTMLInputElement).value;
        })


    }

    private renderList(){ // peрендер multiple select
        this.deleteButton.classList.add('opacity');
        let opts = '';
        for (let i = 0; i < this.listData.length; i++){
            let sel = '';
            if (this.selectedItem === this.listData[i]){
                sel = 'selected';
            }
            opts = opts + `<option value="${this.listData[i]}" ${sel}>${this.listData[i]}</option>` + '\n';
        }

        this.listElement.innerHTML = `
                <select name="sel" id="0" multiple>
                    ${opts}
                </select>
                `;
        let elem =  this.listElement.querySelector('select');
        if (elem){ // "уданить" неактивно после ререндера тк нет выбранного элемента
            elem.addEventListener('input', (e) => {
                if ((e.target as HTMLInputElement).value){
                    this.deleteButton.classList.remove('opacity');
                }
            })
        }


    }

    private addListenerToChangeButton(){ // новый лисенер на this.textInput, при ререндере
        let element = this.textInput.querySelector('input');
        if (element !== null){
            element.addEventListener('input', (e) => { // меняем кнопку если добавить элемент нельзя
                if (this.listData.indexOf((e.target as HTMLInputElement).value) !== -1 || !(e.target as HTMLInputElement).value) {
                    this.addbutton.classList.add('opacity');

                }else{
                    this.addbutton.classList.remove('opacity');
                }
            })
        }
        this.addbutton.classList.add('opacity');
    }

    addToList(){ // добавление нового значения в массив экземпляра (this.listData) и ререндер select в котором выводится this.listData
        if (this.listData.indexOf(this.newItemText) == -1 && this.newItemText) {
            this.listData.push(this.newItemText);
            this.eventFunction(this.inputProperty, this.listData);
        }
        this.textInput.innerHTML = '';
        this.textInput.append(new Input(this.updateDataFunc, 'Участник', 'members', '', 'text').render());
        this.addListenerToChangeButton();
        this.renderList();
    }

    deleteFromList(){ // удаление значения this.selectedItem в массивe экземпляра (this.listData) и ререндер select в котором выводится this.listData
        if (this.selectedItem){
            this.listData.splice(this.listData.indexOf(this.selectedItem), 1);
        }
        this.selectedItem = this.listData[-1];
        this.eventFunction(this.inputProperty, this.listData);
        this.renderList();
    }

    updateTextData(prop:string, val:string|string[]){ // обновление this.newItemText
        if (typeof val === 'string'){
            this.newItemText = val;
        }
    }

    render(): HTMLElement {
        this.addListenerToChangeButton();
        let title = document.createElement('div');
        this.container.append(title)
        title.innerHTML = 'Участники:';
        this.container.append(this.listElement);
        this.renderList();
        this.container.append(this.textInput);
        let buttons = document.createElement('div');
        buttons.classList.add('list-buttons')
        buttons.append(this.addbutton);
        buttons.append(this.deleteButton);

        this.container.append(buttons);
        return this.container;
    }

}
export default List;
