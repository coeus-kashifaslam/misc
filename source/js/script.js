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
          this.percentage = Math.round((parseInt(this.value) / data.total.inc) * 100);
      else
          this.percentage = -1;
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
        budget: 0,
        percentage: 0
    };

    var countSum = function (type) {
        var sum = 0;
        data.items[type].forEach(function (cur) {
            sum += parseFloat(cur.value);
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

        dltItem: function (type, id) {
            var idsArr, itemIndex;

            idsArr = data.items[type].map(function (cur) {
                return cur.id;
            });

            itemIndex = idsArr.indexOf(id);

            if(itemIndex !== -1)
                data.items[type].splice(itemIndex, 1);

        },

        updateBudget: function () {
            countSum('inc');
            countSum('exp');

            data.budget = data.total.inc - data.total.exp;

            if(data.total.inc > 0) {
                data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
            } else {
                data.percentage = -1;
            }

            return {
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                totalBudget: data.budget,
                totalPerc: data.percentage
            };
        },

        getPercentages: function () {
            var percentages;
            percentages = data.items.exp.map(function (cur) {
                 cur.calcPercentage();
                 return cur.getPercentage();
            });

            return percentages;
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
        monthLabel: '.budget__title--month',
        totalPerc: '.budget__expenses--percentage',
        mainContainer: '.container',
        itemPerc: '.item__percentage'

    };

    var formatNumber = function (num, type) {
        var sign, splitNum, int, dec, newNum;

        type === 'inc' ? sign = '+' : sign = '-';
        num = Math.abs(num).toFixed(2);

        splitNum = num.split('.');
        int = splitNum[0];
        dec = splitNum[1];

        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        newNum = sign + ' ' + int + '.' + dec;
        return newNum;
    };

    var nodeListForEach = function (arr, callback) {
        for(var i = 0; i < arr.length; i++) {
            callback(arr[i], i);
        }
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
                html = '                <div class="item clearfix" id="inc-%id%">\n' +
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
                html = '<div class="item clearfix" id="exp-%id%">\n' +
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

        dltItemFromUI: function (idStr) {
            var el;
            el = document.getElementById(idStr);
            el.parentNode.removeChild(el);
        },

        updateBudgetUI: function (obj) {
            var type;

            obj.totalBudget >= 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.totalBudget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if(obj.totalInc  > 0)
                document.querySelector(DOMStrings.totalPerc).textContent = obj.totalPerc + '%';
            else
                document.querySelector(DOMStrings.totalPerc).textContent = '---';
        },

        updatedPercentages: function (percArr) {
            var itemsPercAr;

            itemsPercAr = document.querySelectorAll(DOMStrings.itemPerc);

            nodeListForEach(itemsPercAr, function (cur, ind) {

                if(percArr[ind] > 0)
                    cur.textContent = percArr[ind] + '%';
                else
                    cur.textContent = '---';
            });


        },

        changeinputUi: function () {

            var nodesList;
            nodesList = document.querySelectorAll(
                DOMStrings.typeDOM + ',' +
                DOMStrings.descriptionDOM + ',' +
                DOMStrings.valueDOM
            );


            nodeListForEach(nodesList, function (cur) {
               cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.btnDOM).classList.toggle('red');
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

    var setEventListeners = function () {
        document.querySelector(DomElem.btnDOM).addEventListener('click', addItem);
        document.addEventListener('keypress', function (e) {
            if(e.keyCode === 13 || e.which === 13){
                addItem();
            }
        });
        document.querySelector(DomElem.mainContainer).addEventListener('click', dltItem);
        document.querySelector(DomElem.typeDOM).addEventListener('change', UICtrl.changeinputUi);
    };

    var addItem = function () {
        var inputValues,  newItem;
        inputValues = UICtrl.getInputValues();

        if(inputValues.description !== '' && inputValues.value !== '' && inputValues.value !== '0') {

            newItem = mainCtrl.addItem(inputValues.type, inputValues.description, inputValues.value);
            UICtrl.addItemToUI(newItem, inputValues.type);
            UICtrl.clearFields();

            updateBudget();
            updatePecentages();
        }
    };

    var dltItem = function (el) {
        var id, splitId, itemId, itemType;
        id = el.target.parentNode.parentNode.parentNode.parentNode.id;

        splitId = id.split('-');
        itemType = splitId[0];
        itemId = parseInt(splitId[1]);

        mainCtrl.dltItem(itemType, itemId);
        UICtrl.dltItemFromUI(id);

        updateBudget();
        updatePecentages();
    };

    var updateBudget = function () {
        var bgtObj;
        bgtObj = mainCtrl.updateBudget();
        UICtrl.updateBudgetUI(bgtObj);
    };

    var updatePecentages = function () {
        var percentages;

        percentages = mainCtrl.getPercentages();
        UICtrl.updatedPercentages(percentages);

    };


    return {
        init: function () {
            console.log('App Started!');
            UICtrl.updateYearMonth();
            UICtrl.updateBudgetUI({totalInc: 0, totalExp: 0, totalBudget: 0, totalPerc: -1});
            setEventListeners();
        }
    };

})(UIController, mainController);

appController.init();