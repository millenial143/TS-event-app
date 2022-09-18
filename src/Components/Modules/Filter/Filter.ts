import Component from "../../index";
import App from "../../../App";
import Input from "../Input/Input";
import './Filter.css'

class Filter extends Component{
    private eventFunction // функция исполняемая при обновлении
    private types; // типы мероприятий
    private activeTypes; // выставленные типы
    private dateFrom;// выставленная дата
    private dateTo; // выставленная дата
    // binds
    private updateFunc;
    constructor(eventFunction: (dateFrom?: string, dateTo?: string, types?:string[]) => void, classList:string = 'filter') {
        super(classList);
        this.types = App.eventTypeArray;
        this.activeTypes = this.types;
        this.eventFunction = eventFunction;
        this.dateTo = '';
        this.dateFrom = '';

        this.updateFunc = this.updateFilterDate.bind(this);
    }

    updateFilterDate(prop:string, val:string){ // функция для инпутов фильтра, обновляет выставленные значения и исполняет eventFunction
        if (prop === 'dateFrom'){
            this.dateFrom = val;
        }
        if (prop === 'dateTo'){
            this.dateFrom = val;
        }
        if (val === 'true'){
            if (this.activeTypes.length == this.types.length){
                this.activeTypes = [];
            }

            this.activeTypes.push(this.types[Number(prop)])

        }
        if (val === 'false'){
            this.activeTypes.splice(this.activeTypes.indexOf(this.types[Number(prop)]), 1);

            if (this.activeTypes.length == 0){
                this.activeTypes = this.types;
            }
        }

        this.eventFunction(this.dateFrom, this.dateTo, this.activeTypes);
    }

    render() {
        let filterTitle = document.createElement('div');
        filterTitle.classList.add('filter-title');
        filterTitle.innerHTML = 'Фильтр';

        let dateFilter = document.createElement('div');
        dateFilter.classList.add('date-filter');
        dateFilter.append(new Input(this.updateFunc, 'От', 'dateFrom', '', 'date').render())
        dateFilter.append(new Input(this.updateFunc, 'До', 'dateTo', '', 'date').render())

        let typeFilter = document.createElement('div');
        for (let i = 1; i < this.types.length; i++){
            typeFilter.append(new Input(this.updateFunc, this.types[i], i.toString(), '', 'checkbox', [], 'type-filter').render())

        }

        this.container.append(filterTitle);
        this.container.append(dateFilter);
        this.container.append(typeFilter);
        return this.container;
    }

}
export default Filter;
