export const alignGroup={
    justifyLeft: {
        type: "button",
            class: "fa fa-align-left",
            events: {
            click: function () {
                let el = this.root.findBtn("justifyLeft");
                changeState(el);

                off(this.root.findBtn("justifyCenter"));
                off(this.root.findBtn("justifyRight"));
                off(this.root.findBtn("justifyFull"));
                this.root.exec('justifyLeft');
            }
        }

    },
    justifyCenter: {
        type: "button",
            class: "fa fa-align-center",
            events: {
            click: function () {
                let el = this.root.findBtn("justifyCenter");
                changeState(el);
                off(this.root.findBtn("justifyLeft"));
                off(this.root.findBtn("justifyRight"));
                off(this.root.findBtn("justifyFull"));
                this.root.exec('justifyCenter');
            }
        }
    },
    justifyRight: {
        type: "button",
            class: "fa fa-align-right",
            events: {
            click: function () {
                let el = this.root.findBtn("justifyRight");
                changeState(el);
                off(this.root.findBtn("justifyLeft"));
                off(this.root.findBtn("justifyCenter"));
                off(this.root.findBtn("justifyFull"));
                this.root.exec("justifyRight");
            }
        }

    },
    justifyFull: {
        type: "button",
            class: "fa fa-align-justify",
            events: {
            click: function () {
                let el = this.root.findBtn("justifyFull");
                changeState(el);
                off(this.root.findBtn("justifyLeft"));
                off(this.root.findBtn("justifyRight"));
                off(this.root.findBtn("justifyCenter"));
                this.root.exec("justifyFull");
            }
        }

    }
}