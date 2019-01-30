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
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function () {
      if(data.total.inc > 0)
          this.percentage = this.value / data.budget * 100;
      else
          this.percentage = '---';
    };

    Expense.prototype.getPercentage = function () {
      return this.percentage;
    };

    var data = {
        items: {
            inc: [],
            exp: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0
    };

    var countSum = function (type) {
        var sum = 0;
        data.items[type].forEach(function (cur) {
            sum += cur.value;
        });

        data.total[type] = sum;
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
            return newItem;
        },

        updateBudget: function () {
            countSum('inc');
            countSum('exp');
            if(data.total.inc > 0)
                data.budget = data.total.inc - data.total.exp;

            return {
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                totalBudget: data.budget
            }
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
        btnDOM: '.add__btn',
        incomeList: '.income__list',
        expenseList: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        monthLabel: '.budget__title--month'

    };

    var formatNumber = function (num, type) {
        var sign, splitNum, int, dec, newNum;

        type === 'inc' ? sign = '+ ' : sign = '- ';
        num = Math.abs(num).toFixed(2);

        splitNum = num.split('.');
        int = splitNum[0];
        dec = splitNum[1];

        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        newNum = sign + int + '.' + dec;
        return newNum;
    };

    return{
        updateYearMonth: function () {
            var now, year, month, monthsArr;

            monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            now = new Date();
            year = now.getFullYear();
            month = monthsArr[now.getMonth()];
            document.querySelector(DOMStrings.monthLabel).textContent = month + ' ' + year;
        },

        getDomStrings: function () {
            return DOMStrings;
        },

        getInputValues: function () {
            return {
                type: document.querySelector(DOMStrings.typeDOM).value,
                description: document.querySelector(DOMStrings.descriptionDOM).value,
                value: document.querySelector(DOMStrings.valueDOM).value
            };
        },

        addItemToUI: function (obj, type) {
            var html, itemType;
            if(type === 'inc') {
                itemType = DOMStrings.incomeList;
                html = '                <div class="item clearfix" id="income-%id%">\n' +
                    '                    <div class="item__description">%description%</div>\n' +
                    '                    <div class="right clearfix">\n' +
                    '                        <div class="item__value">%value%</div>\n' +
                    '                        <div class="item__delete">\n' +
                    '                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>';
            } else {
                itemType = DOMStrings.expenseList;
                html = '<div class="item clearfix" id="expense-%id%">\n' +
                    '                    <div class="item__description">%description%</div>\n' +
                    '                    <div class="right clearfix">\n' +
                    '                        <div class="item__value">%value%</div>\n' +
                    '                        <div class="item__percentage">21%</div>\n' +
                    '                        <div class="item__delete">\n' +
                    '                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>';
            }
            html = html.replace('%id%', obj.id);
            html = html.replace('%description%', obj.description);
            html = html.replace('%value%', formatNumber(obj.value, type));

            document.querySelector(itemType).insertAdjacentHTML('beforeend', html);
        },

        updateBudgetUI: function (obj) {
            var type;
            obj.totalBudget >= 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.totalBudget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
        },

        clearFields: function () {
            document.querySelector(DOMStrings.descriptionDOM).value = '';
            document.querySelector(DOMStrings.valueDOM).value = '';
            document.querySelector(DOMStrings.descriptionDOM).focus();
        }
    };
})();

var appController = (function (UICtrl, mainCtrl) {

    var DomElem = UICtrl.getDomStrings();

    function setEventListeners() {
        document.querySelector(DomElem.btnDOM).addEventListener('click', addItem);
        document.addEventListener('keypress', function (e) {
            if(e.keyCode === 13 || e.which === 13){
                addItem();
            }
        });
    }

    function addItem() {
        var inputValues,  newItem;
        inputValues = UICtrl.getInputValues();

        if(inputValues.description !== '' && inputValues.value !== '' && inputValues.value !== '0') {
            newItem = mainCtrl.addItem(inputValues.type, inputValues.description, inputValues.value);
            UICtrl.addItemToUI(newItem, inputValues.type);
            UICtrl.clearFields();
            updateBudget();
        }
    }

    function updateBudget() {
        var bgtObj;
        bgtObj = mainCtrl.updateBudget();
        UICtrl.updateBudgetUI(bgtObj);
    }

    return {
        init: function () {
            console.log('App Started!');
            UICtrl.updateYearMonth();
            UICtrl.updateBudgetUI({totalInc: 0, totalExp: 0, totalBudget: 0});
            setEventListeners();
        }
    };

})(UIController, mainController);

appController.init();