export const filegroup={
    bold: {
        type: "button",
            class: "fa fa-bold",
            events: {
            click: function () {
                let el = this.root.findBtn("bold");
                changeState(el);
                this.noteModel.exec('bold');
            }
        },
        tooltip: "bold"

    },
    italic: {
        type: "button",
            class: "fa fa-italic",
            events: {
            click: function () {
                let el = this.root.findBtn("italic");
                changeState(el);
                this.noteModel.exec('italic');
            }
        },
        tooltip: "italic"
    },
    underline: {
        type: "button",
            class: "fa fa-underline",
            events: {
            click: function () {
                let el = this.root.findBtn("underline");
                changeState(el);
                this.noteModel.exec('underline');

            }
        },
        tooltip: "underline"

    },
    strikeThrough: {
        type: "button",
            class: "fa fa-strikethrough",
            events: {
            click: function () {
                let el = this.root.findBtn("strikeThrough");
                changeState(el);
                this.noteModel.exec('strikeThrough');

            }
        }


    }
}