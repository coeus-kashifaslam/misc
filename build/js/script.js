var mainController = (function () {
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        items: {
            inc: [],
            exp: []
        },
        total: {
            exp: 0,
            inc: 0
        }
    };


    return {
        addItem: function (type, des, val) {
            var newItem;
            var ID = 0;

            if(data.items[type].length > 0) {
                ID = data.items[type][data.items[type].length - 1].id + 1;
            }

            if(type === 'inc') {
                newItem = new Income(ID, des, val);
            } else {
                newItem = new Expense(ID, des, val);
            }

            data.items[type].push(newItem);
        },

        showData: function () {
            console.log(data);
        }

    };

})();

var UIController =(function () {
    var DOMStrings = {
        typeDOM: '.add__type',
        descriptionDOM: '.add__description',
        valueDOM: '.add__value',
        btnDOM: '.add__btn'
    };

    return{
        getDomStrings: function () {
            return DOMStrings;
        },

        getInpuValues: function () {
            return {
                type: document.querySelector(DOMStrings.typeDOM).value,
                description: document.querySelector(DOMStrings.descriptionDOM).value,
                value: document.querySelector(DOMStrings.valueDOM).value
            };
        }
    };
})();

var appController = (function (UICtrl, mainCtrl) {

    function setEventListeners() {
        var DomElem = UICtrl.getDomStrings();
        document.querySelector(DomElem.btnDOM).addEventListener('click', addItem);
        document.addEventListener('keypress', function (e) {
            if(e.keyCode === 13 || e.which === 13){
                addItem();
            }
        });
    }

    function addItem() {
        var newItem = UICtrl.getInpuValues();
        mainCtrl.addItem(newItem.type, newItem.description, newItem.value);
    }

    return {
        init: function () {
            setEventListeners();
        }
    };

})(UIController, mainController);

appController.init();