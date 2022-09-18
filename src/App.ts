import Table from "./Components/Pages/Table/Table";
import EventPage from "./Components/Pages/EventPage/EventPage";

class App {
    private container: HTMLElement | null;
    private table: Table;
    //bind
    private renderPage;

    private static appHash = '#App';
    private static url = location.protocol + '//' + location.host + location.pathname + App.appHash;
    static eventTypeArray = [
        '',
        'Конференция',
        'Презентация',
        'Форум',
        'Круглый стол',
        'Тренинг',
        'Семинар',
    ]

    static eventStatusArray = [
        '',
        'Запланировано',
        'Выполняется',
        'Завершено',
    ]


    constructor() {
        this.container = document.querySelector('App');
        this.table = new Table();
        this.renderPage = this.renderNewPage.bind(this);
    }

    static changeHash(id:string|null){ // смена хеша
        if (id != null){
            document.location.href = App.url+ `/` + id;
        }else{
            document.location.href = App.url;
        }

    }

    private renderNewPage(hashId:string,container:HTMLElement | null){ //рендер новой страницы
        // проверка на то что все мероприятия имеют обязательные свойства
        let error = false;
        for (let i = 0; i < localStorage.length; i++) {
            let item = localStorage.getItem('Event_' + i)
            if (item !== null) {
                if (!JSON.parse(item).type || !(JSON.parse(item).dateStart)) {
                    App.changeHash(i.toString());
                }
            }
        }


        // рендер страницы в звисимости от хеша
        if (hashId && container !== null){
            let eventData: string = '';
            for (let i = 0; i < localStorage.length; i++){
                const localData = localStorage.getItem('Event_' + hashId);
                if (localData !== null){
                    eventData = localData;
                }
            }
            if (eventData){
                container.innerHTML = '';
                container.append(new EventPage(eventData).render())
            }
        }else if (container !== null){
            container.innerHTML = '';
            container.append(new Table().render())
        }
    }

    private addPageChange(){ // добавление лисенера смены хеша
        let hashId:string = '';
        let container = this.container;
        let renderPage = this.renderPage;
        window.addEventListener('hashchange',function (e){
            hashId = window.location.hash.slice(App.appHash.length + 1);
            renderPage(hashId, container);

        })

    }

    start(){
        this.addPageChange();
        this.renderNewPage(window.location.hash.slice(App.appHash.length + 1),this.container);
    }
}


export default App