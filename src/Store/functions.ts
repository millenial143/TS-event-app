import EventClass from './EventClass';
import App from "../App";

export function addEvent(
    title:string = 'Новое мероприятие',
    type:string = '',
    startDate:string = '',
    dateEnd:string = '',
    description:string = '',
    status:string = '',
    members:string[] = [],

):void{
    let newId = 0;
    while (localStorage.getItem('Event_' + newId.toString()) !== null){
        newId++
    }

    const event = new EventClass(
        newId.toString(),
        type,
        startDate,
        dateEnd,
        title,
        description,
        status,
        members,
    )

    localStorage.setItem('Event_'+event.id, JSON.stringify(event));
    if (Number(localStorage.getItem('max_id')) < Number(event.id)){
        localStorage.setItem('max_id', event.id);
    }
    App.changeHash(event.id);
}

export function updateEventProp( id:string, prop:string, val:string | string[]){
    let eventJson = localStorage.getItem('Event_'+id);
    if (eventJson !== null){
        let event = JSON.parse(eventJson);
        event[prop] = val;
        localStorage.setItem('Event_'+id, JSON.stringify(event));
    }
}

export function deleteEvent(id:string){
    localStorage.removeItem('Event_' + id);
}
