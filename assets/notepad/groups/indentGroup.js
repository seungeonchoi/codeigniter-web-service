export const indentGroup = {
    indent: {
        type: "button",
            class: "fa fa-indent",
            events: {
            click: function () {
                this.root.exec("indent");
            }
        }

    },
    outdent: {
        type: "button",
            class: "fa fa-outdent",
            events: {
            click: function () {
                this.root.exec("outdent");
            }
        }

    }
}