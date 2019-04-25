import * as menus from './groups';
export const menu_list = {

    rollBack: {
        undo: {
            type: "button",
            class: "fa fa-undo",
            events: {
                click: function () {
                    this.root.exec("undo");
                }
            }

        },
        redo: {
            type: "button",
            class: "fa fa-repeat",
            events: {
                click: function () {
                    this.root.exec("redo");
                }
            }

        }
    },

    insertList: {
        insertUnorderedList: {
            type: "button",
            class: "fa fa-list-ul",
            events: {
                click: function () {
                    let el = this.root.findBtn("insertUnorderedList");
                    changeState(el);
                    this.root.exec("insertUnorderedList");
                }
            }

        },
        insertOrderedList: {
            type: "button",
            class: "fa fa-list-ol",
            events: {
                click: function () {
                    let el = this.root.findBtn("insertOrderedList");
                    changeState(el);
                    this.root.exec("insertOrderedList");
                }
            }

        }
    },

    paraGraph: {
        insertParagraph: {
            type: "button",
            class: "fa fa-paragraph",
            events: {
                click: function () {
                    this.root.exec("insertParagraph");
                }
            }

        }
    }
    ,
    /*
    hSize: {
        formatBlock: {
            type: "select",
            class: "",
            events: {
                change: function () {
                    execArg('formatBlock', this.value);
                }
            },
            option: ["H1", "H2", "H3", "H4", "H5", "H6"]

        }
    },
    */
    linkFunc: {
        createLink: {
            type: "button",
            class: "fa fa-link",
            events: {
                click: function () {
                    this.root.execArg('createLink', prompt('Enter a URL', 'http://'));
                }
            }

        },
        unlink: {
            type: "button",
            class: "fa fa-unlink",
            events: {
                click: function () {
                    this.root.exec("unlink");

                }
            }

        }
    }
    ,
    sourceGroup: {
        source: {
            type: "button",
            class: "fa fa-code",
            events: {
                click: function () {
                    this.root.source();
                }
            }

        }
    },

    fontConfig: {
        fonttype: {
            type: "select",
            class: "fonttype",
            text : "Arial",

            option: ["Arial", "Comic Sans Ms", "Courier", "Times New Roman", "Verdana"],
            subdiv : {
                class: "subdiv",
                render : function (subdiv) {
                    let tmp = document.createElement("div");
                    tmp.innerText = "Arial";
                    tmp.className = this.class;
                    let inode = document.createElement("i");
                    inode.className = "fa fa-caret-down";
                    inode.style.float="right";
                    inode.style.fontSize="14px";
                    tmp.appendChild(inode);
                    subdiv.view = tmp;
                    subdiv.addEvent('click', function (e) {
                        let vi = this.parent.dropdown.view.style.visibility;
                        if(vi === "" || vi === "hidden"){
                            this.parent.dropdown.view.style.visibility = 'visible';
                        }else{
                            this.parent.dropdown.view.style.visibility = 'hidden';
                        }

                    });

                }
            },
            dropdown: {
                id: "dropdown",
                class: "dropdown",
                render: function (arr, dropdown) {
                    let tmp = document.createElement("div");
                    tmp.className = this.class;
                    let ul = document.createElement("ul");
                    arr.forEach(function (item, index) {
                        let li = document.createElement("li");
                        li.style.fontFamily = item;
                        li.innerHTML = item;
                        let list = new List(li);
                        dropdown.addList(list);
                        list.addEvent('click', function () {
                            let display = this.root.findBtn('fonttype');
                            let dropdown_view = this.parent.view;
                            display.childNodes[0].childNodes[0].nodeValue = this.view.innerHTML;
                            dropdown_view.style.visibility = "hidden";
                            let body = this.root.editor.view.contentDocument.body;
                            this.root.doRestore();
                            this.root.execArg('fontName', this.view.innerHTML);
                        })
                    })
                    tmp.appendChild(ul);
                    return tmp;
                }
            }
        },
        /*
        fontsize: {
            type: "select",
            class: "",
            events: {
                click: function () {
                    execArg('fontSize', this.value);
                }
            },
            option: ["1", "2", "3", "4", "5", "6"]
        },

        forecolor: {
            type: "color",
            class: "",
            events: {
                click: function () {
                    execArg('foreColor', this.value);
                }
            }
        },

        background: {
            type: "color",
            class: "",
            events: {
                click: function () {
                    execArg('hiliteColor', this.value);
                }
            }
        }
         */
    }
    ,
    fileGroup: {
        image: {
            type: "button",
            class: "fa fa-file-image-o",
            events: {
                click: function () {
                    invoke(this.root.findBtn('inputfile'));
                }
            }
        }

    },
    hiddenGroup: {
        inputfile: {
            type: "file",
            class: "",
            events: {
                change: function () {
                    loadImg();
                }
            }
        }
    }

};