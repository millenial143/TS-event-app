import Component from '../../index';
import './Button.css';


class Button extends Component{
    private eventFunction; // функция для кнопки
    private text; // текст кнопки
    constructor(eventFunction:() => void , text:string, classList:string = 'buttons') {
        super(classList);
        this.eventFunction = eventFunction;
        this.text = text;
    }

    render() {
        let element = document.createElement('button');
        element.innerHTML = this.text;

        element.addEventListener('click', (e) => {
            e.preventDefault();
            this.eventFunction();
        })

        this.container.append(element)
        return this.container;
    }

}
export default Button;
