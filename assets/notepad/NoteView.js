export default class NoteView{
    constructor(model){
        this.addTaskEvent = new Event(this);
        this.selectTaskEvent = new Event(this);

    }
}
