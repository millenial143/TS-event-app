import Component from '../../index';
import Item from "../Item/Item";
import './Items.css'

class Items extends Component{
    private itemsArray:string[]; // массив мероприятий которые надо вывести
    constructor(itemsArray:string[], classList:string = 'items') {
        super(classList);
        this.itemsArray = itemsArray;
    }

    render() {
        for (let i = 0; i < this.itemsArray.length; i++){
            const itemData = this.itemsArray[i];
            let item = new Item(itemData);
            this.container.append(item.render());
        }

        if (this.itemsArray.length === 0){
            this.container.innerHTML = '<div class="noEvents">Нет мероприятий</div>'
        }

        return this.container;
    }

}
export default Items;
