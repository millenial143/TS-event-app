abstract class Component{
    protected container: HTMLElement;
    constructor(className:string) {
        this.container = document.createElement('div');
        this.container.classList.add(className);
    }

    abstract render():HTMLElement;
}

export default Component