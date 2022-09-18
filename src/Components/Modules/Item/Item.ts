import Component from "../../index";
import App from "../../../App";
import './Item.css'

class Item extends Component{
    private itemData; // данные о мероприятиии
    constructor(itemData:string, classList:string = 'item') {
        super(classList);
        this.itemData = itemData;
    }


    render(): HTMLElement {
        let data = JSON.parse(this.itemData);
        let strDate = data.dateStart.split('-');
        let str = strDate.reverse().join('.')
        this.container.innerHTML = `
                    <div>${data.title}</div>
                    <div>${data.type}</div>  
                    <div>${str}</div>`
        this.container.setAttribute('key', data.id);
        this.container.addEventListener('click', function (e){
            let elem = e.currentTarget as HTMLElement;
            App.changeHash(elem.getAttribute('key')); // меняет хеш при нажатии
        })

        return this.container;
    }

}
export default Item;
