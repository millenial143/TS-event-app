import Component from '../../index';
import Items from "../../Modules/Items/Items";
import Button from "../../Modules/Button/Button";
import Filter from "../../Modules/Filter/Filter";
import App from "../../../App";
import {addEvent} from "../../../Store/functions";
import './Table.css'

class Table extends Component{
    private itemsBlock;
    //binds
    private updateFunc;
    private addFunc;

    constructor(classList:string = 'table') {
        super(classList);
        this.itemsBlock = new Items(Table.getItems()).render();

        this.updateFunc = this.updateItems.bind(this);
        this.addFunc = this.addItem.bind(this);

    }

    private static getItems():string[]{ // получить массив отображаемых элементов (мероприятий)
        let itemsArray:string[] = [];

        for (let i = 0; i < Number(localStorage.getItem('max_id')) + 1; i++){
            let data = localStorage.getItem(`Event_${i}`);
            if (data !== null){
                itemsArray.push(data);
            }
        }
        return itemsArray;
    }

    addItem(){ // функция для кнопки "новое мероприятие"
        addEvent();
        this.updateItems();
    }

    updateItems(dateFrom:string = '', dateTo:string = '', types:string[] = App.eventTypeArray){ // функция для фильтра, убирает из массива ненужные значения в зависимости от возвращаемого фильтром значения
        this.itemsBlock.innerHTML = '';
        let itemsArray = Table.getItems();
        if (dateFrom){
            for (let i = 0; i < itemsArray.length; i++){
                if (new Date(JSON.parse(itemsArray[i]).dateStart) < new Date(dateFrom)){
                    itemsArray.splice(i, 1);
                    i--
                }
            }
        }
        if (dateTo){
            for (let i = 0; i < itemsArray.length; i++){
                if (new Date(JSON.parse(itemsArray[i]).dateStart) > new Date(dateTo)){
                    itemsArray.splice(i, 1);
                    i--
                }
            }
        }
        if (types){
            for (let i = 0; i < itemsArray.length; i++){
                if (types.indexOf(JSON.parse(itemsArray[i]).type) === -1){
                    itemsArray.splice(i, 1);
                    i--
                }
            }
        }
        itemsArray = itemsArray.sort((a, b) => new Date(JSON.parse(a).dateStart).getTime() - new Date(JSON.parse(b).dateStart).getTime());//сортировка по дате
        this.itemsBlock.append(new Items(itemsArray).render());
    }

    render() {
        let zeroRow = document.createElement('div');
        zeroRow.innerHTML = `<div>Название</div>
                    <div>Тип</div>  
                    <div>Дата начала</div>`
        zeroRow.classList.add('table_zerorow');

        let items = document.createElement('div');
        items.append(zeroRow);
        items.append(this.itemsBlock);

        let filterBlock = document.createElement('div');
        filterBlock.append(new Filter(this.updateFunc).render());
        filterBlock.append(new Button(this.addFunc, 'Новое мероприятие', 'table-add-button').render());

        this.container.append(items);
        this.container.append(filterBlock);
        this.updateItems();

        return this.container;
    }

}
export default Table;



