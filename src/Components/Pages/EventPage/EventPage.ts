import Component from '../../index';
import Input from "../../Modules/Input/Input";
import Button from "../../Modules/Button/Button";
import App from "../../../App";
import List from "../../Modules/List/List";
import {deleteEvent, updateEventProp} from "../../../Store/functions";
import './EventPage.css'

class EventPage extends Component{
    private eventData; // данные о мероприятии открытом на странице
    private eventObj; //
    private eventType; //
    private eventStart; // данные о мероприятии открытом на странице
    //изменяемые элементы
    private typeElem; // инпут типа
    private dateElem;// инпут даты
    // binds
    private updateFunc;
    private deleteFunc;
    private returnFunc;

    constructor(eventData:string, classList:string = 'event-page') {
        super(classList);
        this.eventData = eventData;
        this.eventObj = JSON.parse(this.eventData);
        this.eventType = (this.eventObj as any)?.type;
        this.eventStart = (this.eventObj as any)?.dateStart;

        this.updateFunc = this.updateEventValue.bind(this);
        this.deleteFunc = this.deleteEvent.bind(this);
        this.returnFunc = this.returnToMainPage.bind(this);

        this.dateElem = new Input(this.updateFunc, 'Дата начала',     'dateStart',    JSON.parse(this.eventData).dateStart,   'date').render()
        this.typeElem = new Input(this.updateFunc, 'Тип',             'type',         JSON.parse(this.eventData).type,        'select', App.eventTypeArray).render()
        this.dateElem.addEventListener('input', (e) => {
            (e.currentTarget as HTMLInputElement).classList.remove('red-bottom-border')
        })
        this.typeElem.addEventListener('input', (e) => {
            (e.currentTarget as HTMLInputElement).classList.remove('red-bottom-border')
        })

    }

    updateEventValue(prop:string, val:string | string[]){ // для инпутов, обновляет мероприятие в localstorage
        if (typeof val === 'string'){
            if (prop === 'dateStart'){
                this.eventStart = val;
            }

            if (prop === 'type'){
                this.eventType = val;
            }
        }

        const event = JSON.parse(this.eventData);
        updateEventProp(event.id, prop, val)
    }

    returnToMainPage(){ // вернуться на главную, хеш не будет изменен если не заполнены тип и дата начала
        if (this.eventType && this.eventStart){
            App.changeHash(null);
        }else{
            if (!this.eventType){
                this.typeElem.classList.add('red-bottom-border');
            }
            if (!this.eventStart){
                this.dateElem.classList.add('red-bottom-border');
            }
        }
    }

    deleteEvent(){ // для кнопки "удалить мероприятие"
        deleteEvent((this.eventObj as any)?.id)
        App.changeHash(null);
    }

    render(): HTMLElement {
        let buttons = document.createElement('div');
        buttons.append(new Button(this.returnFunc, 'К мероприятиям').render())
        buttons.append(new Button(this.deleteFunc, 'Удалить мероприятие', ).render())

        let inputs = document.createElement('div');
        inputs.append(new Input(this.updateFunc, 'Название',        'title',            JSON.parse(this.eventData).title,       'text').render())
        inputs.append(this.typeElem);
        inputs.append(this.dateElem);
        inputs.append(new Input(this.updateFunc, 'Дата Окончания',  'dateEnd',          JSON.parse(this.eventData).dateEnd,     'date').render())
        inputs.append(new Input(this.updateFunc, 'Статус',          'status',           JSON.parse(this.eventData).status,      'select', App.eventStatusArray).render())
        inputs.append(new Input(this.updateFunc, 'Описание',        'description',      JSON.parse(this.eventData).description, 'text').render())
        inputs.append(new List(this.updateFunc, 'Список участников','members',          JSON.parse(this.eventData).members,     'list', (this.eventObj as any).members, 'event-page-list').render())

        this.container.append(inputs);
        this.container.append(buttons);
        return this.container;
    }

}
export default EventPage;
