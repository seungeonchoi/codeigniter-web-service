import NoteModel from './NoteModel.js';
import NoteController from './NoteController.js';
import NoteView from './NoteView.js';
/**
 * Created by chou6 on 2017-08-04.
 */


window.addEventListener("DOMContentLoaded", function () {
    //init('textarea');
    createNotepad('textarea');
}, false);
function Notepad(elem,width,height) {
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

    if (window.getSelection && document.createRange) {
        this.saveSelection = function(containerEl) {
            var range = this.editor.view.contentWindow.document.getSelection().getRangeAt(0);
            var preSelectionRange = range.cloneRange();
            preSelectionRange.selectNodeContents(containerEl);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            var start = preSelectionRange.toString().length;
            return {
                start: start,
                end: start + range.toString().length
            }
        };

        this.restoreSelection = function(containerEl, savedSel) {
            var charIndex = 0, range = this.editor.view.contentWindow.document.createRange();
            range.setStart(containerEl, 0);
            range.collapse(true);
            var nodeStack = [containerEl], node, foundStart = false, stop = false;

            while (!stop && (node = nodeStack.pop())) {
                if (node.nodeType === 3) {
                    var nextCharIndex = charIndex + node.length;
                    if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                        range.setStart(node, savedSel.start - charIndex);
                        foundStart = true;
                    }
                    if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                        range.setEnd(node, savedSel.end - charIndex);
                        stop = true;
                    }
                    charIndex = nextCharIndex;
                } else {
                    var i = node.childNodes.length;
                    while (i--) {
                        nodeStack.push(node.childNodes[i]);
                    }
                }
            }

            var sel = this.editor.view.contentWindow.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    } else if (document.selection && document.body.createTextRange) {
        this.saveSelection = function(containerEl) {
            var selectedTextRange = this.editor.view.contentWindow.document.selection.createRange();
            var preSelectionTextRange = this.editor.view.contentWindow.document.body.createTextRange();
            preSelectionTextRange.moveToElementText(containerEl);
            preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
            var start = preSelectionTextRange.text.length;

            return {
                start: start,
                end: start + selectedTextRange.text.length
            }
        };

        this.restoreSelection = function(containerEl, savedSel) {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(containerEl);
            textRange.collapse(true);
            textRange.moveEnd("character", savedSel.end);
            textRange.moveStart("character", savedSel.start);
            textRange.select();
        };
    }

}
function Menudiv(menu) {
    this.root = "";
    this.view = menu;
    this.btngroups = [];
}
function Subdiv(div) {
    this.root = "";
    this.parent = "";
    this.view = "";
}
function Editor(editor){
    this.root = "";
    this.view = editor;
}
function Btngroup(view) {
    this.view = view;
    this.buttons = [];
}
function Button(name) {
    this.name = name;
    this.root = "";
    this.subdiv = "";
    this.parent = "";
    this.view = "";
    this.clickHandlers = [];
    this.dropdown = "";
}
function Dropdown(dropdown){
    this.name = name;
    this.root = "";
    this.parent = "";
    this.view = "";
    this.lists = [];
}
function List(list){
    this.name = name;
    this.root = "";
    this.parent = "";
    this.view = list;
}
Notepad.prototype = {
    source : function() {
        var editor = this.root.editor.view.contentDocument;
        var color = editor.body.style.backgroundColor;
        if (this.textmode) {
            editor.body.textContent = editor.body.innerHTML;
            editor.body.style.backgroundColor = "black";
            editor.body.style.color = "white";
            this.textmode = false;
            reset(editor);

        } else {
            editor.body.innerHTML = editor.body.textContent;
            editor.body.style.background = "white";
            editor.body.style.color = "black";
            this.textmode = true;

        }
    },
    doSave : function() {
        this.savedSelection = this.saveSelection( this.editor.view.contentDocument.body );
    },

    doRestore : function () {
        if (this.savedSelection) {
        this.restoreSelection(this.editor.view.contentDocument.body, this.savedSelection);
        }
    },

    execArg : function(command, arg) {
        console.log(arg);
        if(this.editor.view.contentDocument.body != document.activeElement){
            this.editor.view.contentDocument.body.focus();
        }
        if(this.textmode){
            console.log("textmode");
            this.editor.view.contentDocument.execCommand(command, false, arg);
        }

    },
    exec: function (command) {

        if(this.editor.view.contentDocument.body != document.activeElement){
            this.editor.view.contentDocument.body.focus();
        }
        if(this.textmode){
            console.log("true");
            this.editor.view.contentDocument.execCommand(command, false, null);
        }

    },
    setMenu: function (menudiv) {
        this.menudiv = menudiv;
        this.menudiv.root = this.root;
    },
    setEditor : function (editor) {
        this.editor = editor;
        this.editor.root = this.root;
    }
    ,
    addClickHandler: function (handler) {
        this.clickHandlers.push(handler);
    },
    render : function(){
        this.textarea.style.display = "none";
        var btngroups = this.menudiv.btngroups;
        btngroups.forEach(function (btngroup) {
            var buttons = btngroup.buttons;
            var btngroup_view = btngroup.view;
            buttons.forEach(function (button) {
                var button_view = button.view;
                if(button.subdiv != ""){
                    var subdiv_view = button.subdiv.view;
                    button_view.appendChild(subdiv_view);
                }
                if(button.dropdown != ""){
                    var dropdown = button.dropdown;
                    var dropdown_view = dropdown.view;
                    var ul = dropdown_view.childNodes[0];
                    var lists = dropdown.lists;
                    lists.forEach(function (list) {
                        ul.appendChild(list.view);
                    })
                    dropdown_view.appendChild(ul);
                    button_view.appendChild(dropdown_view);
                }
                btngroup_view.appendChild(button_view);
            });
            this.menudiv.view.appendChild(btngroup_view);
        },this);

        this.rootdiv.appendChild(this.menudiv.view);
        this.rootdiv.appendChild(this.editor.view);

        var parent = this.textarea.parentNode;
        parent.insertBefore(this.rootdiv, this.textarea.nextSibling);

        var editorText = this.editor.view.contentDocument;
        editorText.designMode = 'on';
        editorText.body.style.overflowX = "hidden";
        editorText.body.style.display = "block";
        editorText.body.style.wordBreak = "break-all";
        editorText.body.style.fontFamily = "Arial";
        if(browser() == "IE"){
            editorText.body.innerHTML = "<p></p>";
        }else{
            editorText.body.innerHTML = "<p><br></p>";
        }

        this.editor.view.style.width = (this.width - 30) + "px";
        this.editor.view.style.height = (this.height - this.menudiv.view.clientHeight) + "px";
    },
    findBtn : function(name){
        var button_view;
        var btngroups = this.menudiv.btngroups;
        btngroups.forEach(function (btngroup) {
            var done = false;
            var buttons = btngroup.buttons;
            buttons.forEach(function (button) {
                if(button.name == name){
                    button_view = button.view;
                    done = true;
                    return;
                }

            });
            if(done){
                return;
            }

        },this);
        return button_view;
    }
}
Menudiv.prototype = {
    setButtonGroups: function (arr) {
        this.btngroups = arr;
    },
    addButtonGroup: function (btngroup) {
        btngroup.root = this.root;
        this.btngroups.push(btngroup);
    }
}
Subdiv.prototype = {
    addEvent : function (name, func) {
        this.view.addEventListener(name,func.bind(this));
    }
}
Btngroup.prototype = {
    addButton: function (button) {
        button.root = this.root;
        this.buttons.push(button);
    }
}
Button.prototype = {
    addClickHandler: function (handler) {
        this.clickHandlers.push(handler);
    },
    addEvent : function (name, func) {
        this.view.addEventListener(name,func.bind(this));
    },
    setDropdown: function (dropdown) {
        dropdown.root = this.root;
        dropdown.parent = this;
        this.dropdown = dropdown;
    },
    addSubdiv : function (subdiv) {
        subdiv.root = this.root;
        subdiv.parent = this;
        this.subdiv = subdiv;
    }
}
Dropdown.prototype = {
    addEvent : function (name, func) {
        this.view.addEventListener(name,func.bind(this));
    },
    addList : function (list) {
        list.root = this.root;
        list.parent = this;
        this.lists.push(list);
    }
}
List.prototype = {
    addEvent : function (name, func) {
        this.view.addEventListener(name,func.bind(this));
    }
}
Editor.prototype = {
    addEvent : function (name, func) {
        this.view.contentDocument.addEventListener(name,func.bind(this));
    }
}

function createNotepad(id, mode,width,height) {
    if (!mode) {
        var rootdiv = document.createElement("div");
        rootdiv.className = "hycube_notepad";
        var menudiv = document.createElement("div");
        menudiv.className = "menudiv";
        if ((!width) && (!height)) {
            width = 500;
            height = 400;
        }
        var notepad = new Notepad(document.getElementById('textarea'), width, height);
        rootdiv.style.width = width + "px";
        rootdiv.style.height = height + "px";
        notepad.rootdiv = rootdiv;
        menudiv.style.width = (width - 40) + "px";
        var MenuObj = new Menudiv(menudiv);
        notepad.setMenu(MenuObj);
        var menu_list = {
            fontGroup: {
                bold: {
                    type: "button",
                    class: "fa fa-bold",
                    events: {
                        click: function () {
                            var el = this.root.findBtn("bold");
                            changeState(el);
                            this.root.exec('bold');
                        }
                    },
                    tooltip: "bold"

                },
                italic: {
                    type: "button",
                    class: "fa fa-italic",
                    events: {
                        click: function () {
                            var el = this.root.findBtn("italic");
                            changeState(el);
                            this.root.exec('italic');
                        }
                    },
                    tooltip: "italic"
                },
                underline: {
                    type: "button",
                    class: "fa fa-underline",
                    events: {
                        click: function () {
                            var el = this.root.findBtn("underline");
                            changeState(el);
                            this.root.exec('underline');

                        }
                    },
                    tooltip: "underline"

                },
                strikeThrough: {
                    type: "button",
                    class: "fa fa-strikethrough",
                    events: {
                        click: function () {
                            var el = this.root.findBtn("strikeThrough");
                            changeState(el);
                            this.root.exec('strikeThrough');

                        }
                    }


                }
            }
            ,
            alignGroup: {
                justifyLeft: {
                    type: "button",
                    class: "fa fa-align-left",
                    events: {
                        click: function () {
                            var el = this.root.findBtn("justifyLeft");
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
                            var el = this.root.findBtn("justifyCenter");
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
                            var el = this.root.findBtn("justifyRight");
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
                            var el = this.root.findBtn("justifyFull");
                            changeState(el);
                            off(this.root.findBtn("justifyLeft"));
                            off(this.root.findBtn("justifyRight"));
                            off(this.root.findBtn("justifyCenter"));
                            this.root.exec("justifyFull");
                        }
                    }

                }
            }
            ,
            indentGroup: {
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
            ,
            subGroup: {

                subscript: {
                    type: "button",
                    class: "fa fa-subscript",
                    events: {
                        click: function () {
                            var el = this.root.findBtn("subscript");
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
                            var el = this.root.findBtn("superscript");
                            changeState(el);
                            this.root.exec("superscript");
                        }
                    }

                }
            },
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
                            var el = this.root.findBtn("insertUnorderedList");
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
                            var el = this.root.findBtn("insertOrderedList");
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
                            var tmp = document.createElement("div");
                            tmp.innerText = "Arial";
                            tmp.className = this.class;
                            var inode = document.createElement("i");
                            inode.className = "fa fa-caret-down";
                            inode.style.float="right";
                            inode.style.fontSize="14px";
                            tmp.appendChild(inode);
                            subdiv.view = tmp;
                            subdiv.addEvent('click', function (e) {
                                var vi = this.parent.dropdown.view.style.visibility;
                                if(vi == "" || vi == "hidden"){
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
                            var tmp = document.createElement("div");
                            tmp.className = this.class;
                            var ul = document.createElement("ul");
                            arr.forEach(function (item, index) {
                                var li = document.createElement("li");
                                li.style.fontFamily = item;
                                li.innerHTML = item;
                                var list = new List(li);
                                dropdown.addList(list);
                                list.addEvent('click', function () {
                                    var display = this.root.findBtn('fonttype');
                                    var dropdown_view = this.parent.view;
                                    display.childNodes[0].childNodes[0].nodeValue = this.view.innerHTML;
                                    dropdown_view.style.visibility = "hidden";
                                    var body = this.root.editor.view.contentDocument.body;
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
        for (let group in menu_list) {
            var btnGroup = new Btngroup();
            MenuObj.addButtonGroup(btnGroup);
            var btnGroup_view = document.createElement("div");
            btnGroup_view.setAttribute('class', 'btnGroup');
            btnGroup.view = btnGroup_view;
            for (var obj in menu_list[group]) {
                va  r tmp = menu_list[group][obj];
                    var type = tmp.type;
                    if (type == "button") {
                        var button = new Button(obj);
                    var button_view = document.createElement("button");
                    button_view.type = type;
                    var inode = document.createElement("i");
                    inode.setAttribute('class', tmp.class);
                    if (tmp.tooltip) {
                        var tooltip = document.createElement("span");
                        tooltip.className = "tooltip";
                        tooltip.innerHTML = tmp.tooltip;
                        tooltip.style.marginLeft = -(tmp.tooltip.length * 8 / 2 + 15) + "px";
                        button_view.appendChild(tooltip);
                    }
                    button_view.appendChild(inode);
                    button.view = button_view;
                    btnGroup.addButton(button);
                    if(tmp.events){
                        for (var evt in tmp.events) {
                            button.addEvent(evt, tmp.events[evt]);
                        }
                    }


                }else if (type == "color" || type == "file") {
                    var button = new Button(obj);
                    var button_view;
                    if (type == "color") {
                        button_view = document.createElement("button");
                        button_view.setAttribute('type', "color");
                        button_view.setAttribute('class', tmp.class);
                    }
                    else {
                        button_view = document.createElement("input");
                        button_view.type = "file";
                        button_view.setAttribute('class', tmp.class);

                    }
                    button.view = button_view;
                    btnGroup.addButton(button);
                    for (var evt in tmp.events) {
                        button.addEvent(evt, tmp.events[evt]);
                    }


                } else {
                    var button = new Button(obj);
                    var dropdown;
                    var button_view = document.createElement("div");
                    button_view.className = tmp.class;

                    button.view = button_view;
                    btnGroup.addButton(button);
                    if(tmp.subdiv){
                        var subdiv = new Subdiv("");
                        button.addSubdiv(subdiv);
                        var subdiv_obj = tmp.subdiv;
                        subdiv_obj.render(subdiv);
                    }
                    if (tmp.dropdown) {
                        var element;
                        dropdown = new Dropdown("");
                        button.setDropdown(dropdown);
                        var dropdown_obj = tmp.dropdown;
                        dropdown.view = dropdown_obj.render(tmp.option, dropdown);


                    }
                    for (var evt in tmp.events) {
                        button.addEvent(evt, tmp.events[evt]);
                    }
                }

            }


        }

        var editor_view = document.createElement("iframe");
        editor_view.setAttribute("class", "hycube_editor");

        var editor = new Editor(editor_view);
        notepad.setEditor(editor);
        notepad.render();
        editor.addEvent('click',function () {
            checkState(this.view,this.root.findBtn('bold'),'bold');
            checkState(this.view,this.root.findBtn('italic'),'italic');
            checkState(this.view,this.root.findBtn('underline'),'underline');
            checkState(this.view,this.root.findBtn('strikeThrough'),'strikeThrough');
            checkState(this.view,this.root.findBtn('justifyLeft'),'justifyLeft');
            checkState(this.view,this.root.findBtn('justifyRight'),'justifyRight');
            checkState(this.view,this.root.findBtn('justifyCenter'),'justifyCenter');
            checkState(this.view,this.root.findBtn('justifyFull'),'justifyFull');
            checkState(this.view,this.root.findBtn('insertUnorderedList'),'insertUnorderedList');
            checkState(this.view,this.root.findBtn('insertOrderedList'),'insertOrderedList');
            var str = reportFonttype(this.view.contentWindow).replace(/['"]+/g, '');
            var fonttype = this.root.findBtn('fonttype');
            fonttype.childNodes[0].childNodes[0].nodeValue = str;

            fonttype.childNodes[1].style.visibility = "hidden";

        });
        editor.addEvent('focusout',function () {
            this.root.doSave();

        });

        window.addEventListener('click',function (event) {
            var root = notepad.findBtn('fonttype');
            var el = root.childNodes[0];
            var er = root.childNodes[1];
            var ev= event.target;
            if (ev != root && ev != er && ev != el) {
                er.style.visibility = "hidden";
            }
        })
        notepad.execArg('fontName', "Arial");
    }
}
function noteValue(target) {
    var textarea = document.getElementById(target);
    var tag = textarea.tagName;
    var elem = document.getElementById(tag);
    return elem.contentDocument.body.innerHTML;
}

function image(editor) {
    var imgSrc = prompt('Enter image location', '');
    if (imgSrc != null) {
        var editor = document.getElementById('hycube_editor').contentDocument;
        editor.document.execCommand('insertimage', false, imgSrc);
    }
}

function loadImg() {
    var filesSelected = document.getElementById(this.id.split("_")[0] + "_inputfile").files;

    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        if (fileToLoad.type.match("image.*")) {
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var imageLoaded = editor.document.createElement("img");
                imageLoaded.src = fileLoadedEvent.target.result;
                editor.document.body.appendChild(imageLoaded);
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    }
}
function setSize() {

}






function modify(el, state) {
    if (state) {
        if (!(el.className.match(/(?:^|\s)active(?!\S)/))) {
            el.className += " active";
        }
    } else {
        el.className = el.className.replace(/(?:^|\s)active(?!\S)/g, '');
    }
}
function off(el) {
    el.className = el.className.replace(/(?:^|\s)active(?!\S)/g, '');
}
function checkState(editor, el,state) {
    if (editor.contentDocument.queryCommandState(state)) {
        modify(el, true);
    }
    else {
        modify(el, false);
    }
}
function updateFont(editor, el){
    var str = editor.contentDocument.queryCommandValue();
}

function reset(editor) {
    var tmp = editor;
    var text = tmp.body.textContent;
    if (empty(text)) {

        tmp.body.textContent = "<p></p>";

    } else {


    }
}
function empty(el) {
    var area = el;
    if (area == '') {
        return true
    } else {
        return false;
    }
}

function invoke(el) {
    if (document.createEvent) {
        let evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    (evt) ? el.dispatchEvent(evt) : (el.click && el.click());
}
function getComputedStyleProperty(el, propName, window) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(el, null)[propName];
    } else if (el.currentStyle) {
        return el.currentStyle[propName];
    }
}
function reportFonttype(elem) {
    var containerEl, sel;
    if (elem.getSelection) {
        sel = elem.getSelection();
        if (sel.rangeCount) {
            containerEl = sel.getRangeAt(0).commonAncestorContainer;
            // Make sure we have an element rather than a text node (nodetype 3 : text)
            if (containerEl.nodeType == 3) {
                containerEl = containerEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        containerEl = sel.createRange().parentElement();
    }

    if (containerEl) {
        var fontSize = getComputedStyleProperty(containerEl, "fontFamily", elem);
        return fontSize;
    }
}

function reportColourAndFontSize(elem) {
    var containerEl, sel;
    if (elem.getSelection) {
        sel = elem.getSelection();
        if (sel.rangeCount) {
            containerEl = sel.getRangeAt(0).commonAncestorContainer;
            // Make sure we have an element rather than a text node (nodetype 3 : text)
            if (containerEl.nodeType == 3) {
                containerEl = containerEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        containerEl = sel.createRange().parentElement();
    }

    if (containerEl) {
        var fontSize = getComputedStyleProperty(containerEl, "fontSize", elem);
        var colour = getComputedStyleProperty(containerEl, "color", elem);
    }
}

/**
 * Gets the browser name or returns an empty string if unknown.
 * This function also caches the result to provide for any
 * future calls this function has.
 *
 * @returns {string}
 */
var browser = function() {
    // Return cached result if avalible, else get result then cache it.
    if (browser.prototype._cachedResult)
        return browser.prototype._cachedResult;

    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    return browser.prototype._cachedResult =
        isOpera ? 'Opera' :
            isFirefox ? 'Firefox' :
                isSafari ? 'Safari' :
                    isChrome ? 'Chrome' :
                        isIE ? 'IE' :
                            isEdge ? 'Edge' :
                                "Don't know";
};
function changeState(el) {
    if (el.className.match(/(?:^|\s)active(?!\S)/)) {
        el.className = el.className.replace(/(?:^|\s)active(?!\S)/g, '');
    } else {
        el.className += " active";
    }
}