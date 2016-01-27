angular.module('nnAdminUi')

  // Constant that controls whether or not elements are collapsed by default.
  .constant('COLLAPSED_DEFAULT', true)

  // Service that handles all logic related to elements.
  .service('elementService', function($log) {
    var typeOptions = [
      {type: 'choice', label: 'Choice'},
      {type: 'form', label: 'Form'},
      {type: 'html', label: 'HTML'},
      {type: 'next', label: 'Next'}
    ];

    /**
     *
     * @param {object} model
     * @returns {string}
     */
    function getLabel(model) {
      var label = 'Unknown';
      angular.forEach(typeOptions, function(value, key) {
        if (value.type === model.type) {
          label = value.label;
        }
      });
      return label;
    }

    /**
     *
     * @param {object} model
     * @returns {string}
     */
    function getName(model) {
      return model.name;
    }

    /**
     *
     * @param elements
     * @param type
     * @returns {boolean}
     */
    function canCreate(elements, type) {
      if (!elements) {
        return false;
      }
      if (type === 'next' && elements.length) {
        return elements[elements.length - 1].type !== 'next';
      }
      return true;
    }

    /**
     *
     * @param elements
     * @param type
     */
    function create(elements, type) {
      if (!canCreate(elements, type)) {
        return;
      }
      var element = {id: chance.guid(), type: type};
      if (elements.length && elements[elements.length - 1].type === 'next') {
        elements.splice(elements.length - 1, 0, element);
      } else {
        elements.push(element);
      }
    }

    /**
     *
     * @param elements
     * @param to
     * @returns {boolean}
     */
    function canMove(elements, to) {
      if (to < 0 || to > (elements.length - 1)) {
        return false;
      }
      return elements[to].type !== 'next';

    }

    /**
     *
     * @param elements
     * @param from
     * @param to
     */
    function move(elements, from, to) {
      if (!canMove(elements, to)) {
        return;
      }
      var removed = elements.splice(from, 1);
      if (!removed.length) {
        return;
      }
      elements.splice(to, 0, removed[0]);
    }

    /**
     *
     * @param elements
     * @param index
     */
    function remove(elements, index) {
      elements.splice(index, 1);
    }

    this.typeOptions = typeOptions;

    this.getLabel = getLabel;
    this.getName = getName;
    this.canCreate = canCreate;
    this.create = create;
    this.canMove = canMove;
    this.move = move;
    this.remove = remove;
  })

  // Service that handles all logic related to items.
  .service('itemService', function() {
    /**
     *
     * @param items
     * @param to
     * @returns {boolean}
     */
    function canMove(items, to) {
      if (!items) {
        return false;
      }
      return to >= 0 && to <= (items.length - 1);
    }

    /**
     *
     * @param items
     * @param from
     * @param to
     */
    function move(items, from, to) {
      if (!canMove(items, to)) {
        return;
      }
      var removed = items.splice(from, 1);
      if (!removed.length) {
        return;
      }
      items.splice(to, 0, removed[0]);
    }

    /**
     *
     * @param items
     * @param type
     */
    function create(items, type) {
      items.push({id: chance.guid(), type: type});
    }

    /**
     *
     * @param {Array} items
     */
    function add(items) {
      items.push({id: chance.guid()});
    }

    /**
     *
     * @param {Array} items
     * @param {Number} index
     */
    function remove(items, index) {
      items.splice(index, 1);
    }

    /**
     * @param {*} items
     * @returns {Array}
     */
    function normalize(items) {
      return angular.isDefined(items) && angular.isArray(items) ? items : [];
    }

    this.canMove = canMove;
    this.move = move;
    this.create = create;
    this.add = add;
    this.remove = remove;
    this.normalize = normalize;
  });
