(function() {
  var CreateRelation;

  CreateRelation = (function() {
    function CreateRelation(_at_addRelationSelector) {
      this.addRelationSelector = _at_addRelationSelector;
      this.relatedToInputSelector = '#add_related_to_name';
      this.relationTypeInputSelector = '#add_type';
      this.discountInputSelector = '#add_discount';
      this.setupListeners();
    }

    CreateRelation.prototype.setupListeners = function() {
      return $(document).on('click', this.addRelationSelector, (function(_this) {
        return function(event) {
          event.preventDefault();
          return _this.sendCreateAction(event.target);
        };
      })(this));
    };

    CreateRelation.prototype.sendCreateAction = function(target) {
      var update_target;
      if ($(this.relatedToInputSelector).val()) {
        update_target = $(target).data('update');
        return $.ajax({
          dataType: 'script',
          url: $(target).attr('href'),
          type: 'POST',
          data: {
            'relation[related_to_id]': $(this.relatedToInputSelector).val(),
            'relation[relation_type_id]': $(this.relationTypeInputSelector).val(),
            'relation[discount_amount]': $(this.discountInputSelector).val()
          }
        });
      }
    };

    return CreateRelation;

  })();

  Spree.ready(function($) {
    var addRelationSelector;
    addRelationSelector = '#add_related_product';
    if ($(addRelationSelector).is('*')) {
      return new CreateRelation(addRelationSelector);
    }
  });

}).call(this);