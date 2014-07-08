define(['tech-store-models/item'], function () {
    var Store;
    Store = (function () {
        function Store(name) {
            this.name = name;
            this._items = [];
        }

        var itemTypes = ['accessory', 'smart-phone', 'notebook', 'pc', 'tablet'];
        Store.prototype = {
            addItem: function (item) {
                if (itemTypes.indexOf(item.type) === -1) {
                    throw new Error('Invalid item type');
                }
                if (item.name.length < 6 || item.name.length > 40) {
                    throw new Error('Invalid name must be between 6 and 40 characters long!');
                }
                if (!isNumber(item.price)) {
                    throw new Error('The price must be a number!');
                }
                this._items.push(item);
                return this;
            },

            getAll: function () {
                this._items = this._items.sort(createCompareByPropFunction('name'));
                return this._items;
            },

            getSmartPhones: function () {
                var result = filter(this._items, {
                    type: 'smart-phone'
                });
                result = result.sort(createCompareByPropFunction('name'));
                return result;
            },

            getMobiles: function () {
                var result = filter(this._items, {
                    type: 'smart-phone',
                });
                result = result.concat(filter(this._items, {
                    type: 'tablet'
                }));
                result = result.sort(createCompareByPropFunction('name'));
                return result;
            },

            getComputers: function () {
                var result = filter(this._items, {
                    type: 'pc'
                });
                result = result.sort(createCompareByPropFunction('name'));
                return result;
            },

            countItemsByType: function () {
                var count, i, length,
                    item = {},
                    type;
                for (i = 0, length = itemTypes.length; i < length; i++) {
                    count = filter(this._items, {
                        type: itemTypes[i]
                    }).length;
                    type = itemTypes[i];
                    item[type] = count;
                }

                return item;
            },

            filterItemsByName: function (name) {
                var result = filter(this._items, {
                    name: name.toLocaleLowerCase()
                });
                result = result.sort(createCompareByPropFunction('name'));
                return result;
            },

            filterItemsByType: function (filterType) {
                if (itemTypes.indexOf(filterType) === -1) {
                    throw new Error('Invalid item type');
                }

                var result = filter(this._items, {
                    type: filterType
                });
                result = result.sort(createCompareByPropFunction('name'));
                return result;
            },

            filterItemsByPrice: function (options) {
                options = options || {};
                var min = (options.min || 0);
                var max = (options.max || Number.MAX_VALUE);
                var result = [];

                for (var i = 0, length = this._items.length; i < length; i++) {
                    if (this._items[i].price > min && this._items[i].price < max) {
                        result.push(this._items[i]);
                    }
                }
                result = result.sort(createCompareByPropFunction('price'));

                return result;
            },
        };
        return Store;
    })();
    return Store;
});

function filter(arr, criteria) {
    return arr.filter(function (obj) {
        return Object.keys(criteria).every(function (c) {
            return new RegExp(criteria[c]).test(obj[c].toLocaleLowerCase());
        });
    });
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function createCompareByPropFunction(prop) {
    return function (a, b) {
        if (isNumber(a[prop]) && isNumber(b[prop])) {
            return a[prop] - b[prop];
        }
        return a[prop].localeCompare(b[prop]);
    };
}
