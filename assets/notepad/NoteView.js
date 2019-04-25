export default class NoteView{
    constructor(model,container){

        this.addTaskEvent = new Event(this);
        this.selectTaskEvent = new Event(this);
        this.textarea = elem;
        this.root = this;
        this.rootdiv = "";
        this.menudiv = "";
        this.editor = "";
        this.init = false;
        this.width = width;
        this.height = height;
        this.textmode = true;
        this.saveSelection="";
        this.savedSelection="";
        this.restoreSelection="";
    }
}
