export const subGroup={

    subscript: {
        type: "button",
            class: "fa fa-subscript",
            events: {
            click: function () {
                let el = this.root.findBtn("subscript");
                changeState(el);
                this.root.exec("subscript");
            }
        }

    },
    superscript: {
        type: "button",
            class: "fa fa-superscript",
            events: {
            click: function () {
                let el = this.root.findBtn("superscript");
                changeState(el);
                this.root.exec("superscript");
            }
        }

    }
}