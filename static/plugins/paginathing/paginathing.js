/**
 * jQuery Paginathing
 * Paginate Everything
 *
 * @author Alfred Crosby <https://github.com/alfredcrosby>
 * Inspired from http://esimakin.github.io/twbs-pagination/
 *
 * Copyright (c) 2018 Alfred Crosby
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function($, window, document) {
  'use strict';

  var Paginator = function(element, options) {
    this.el = $(element);
    this.options = $.extend({}, $.fn.paginathing.defaults, options);

    this.startPage = 1;
    this.currentPage = 1;
    this.totalItems = this.el.children().length;
    this.totalPages = Math.max(Math.ceil(this.totalItems / this.options.perPage), this.options.limitPagination);
    this.container = $('<div></div>').addClass(this.options.containerClass);
    this.inner = $('<div></div>').addClass(this.options.innerClass);//axui

    this.show(this.startPage);

    return this;
  };

  Paginator.prototype = {
    pagination: function(type, page) {
      var _self = this;
      var a = $('<a></a>').attr('href', '##');//axui
      var cssClass = type === 'number' ? _self.options.pageClass : 'ax-'+type;
      var text = '';
      if (type === 'number') {
        text = page;
      } else if (type === 'total') {//axui
        // get the page numbers text
        text = _self.paginationNumbersText();
      } else {
        text = _self.paginationText(type);
      }

      a.addClass(cssClass);//axui li → a
      a.data('pagination-type', type);//axui li → a
      a.data('page', page);//axui li → a
      a.append(a.html(text));//axui li → a


      return a;
    },

    paginationText: function(type) {
      return this.options[type + 'Text'];
    },

    paginationNumbersText: function() {
      var _self = this;
      return '当前 ' + _self.currentPage + '/' + _self.totalPages;//axui
    },

    buildPagination: function() {
      var _self = this;
      var pagination = [];
      var prev =
        _self.currentPage - 1 < _self.startPage
          ? _self.startPage
          : _self.currentPage - 1;
      var next =
        _self.currentPage + 1 > _self.totalPages
          ? _self.totalPages
          : _self.currentPage + 1;

      var start, end;
      var limit = _self.options.limitPagination;

      if (limit) {
        if (_self.currentPage <= Math.ceil(limit / 2) + 1) {
          start = 1;
          end = limit;
        } else if (
          _self.currentPage + Math.floor(limit / 2) >=
          _self.totalPages
        ) {
          start = _self.totalPages + 1 - limit;
          end = _self.totalPages;
        } else {
          start = _self.currentPage - Math.ceil(limit / 2);
          end = _self.currentPage + Math.floor(limit / 2);
        }
      } else {
        start = _self.startPage;
        end = _self.totalPages;
      }

      // "First" button
      if (_self.options.firstLast) {
        pagination.push(_self.pagination('first', _self.startPage));
      }

      // "Prev" button
      if (_self.options.prevNext) {
        pagination.push(_self.pagination('prev', prev));
      }

      // Pagination
      for (var i = start; i <= end; i++) {
        pagination.push(_self.pagination('number', i));
      }

      // "Next" button
      if (_self.options.prevNext) {
        pagination.push(_self.pagination('next', next));
      }

      // "Last" button
      if (_self.options.firstLast) {
        pagination.push(_self.pagination('last', _self.totalPages));
      }
//axui
      // page numbers
     // if (_self.options.total) {
       // pagination.push(_self.pagination('total', _self.currentPage));
     // }
        //axui

      return pagination;
    },

    render: function(page) {
      var _self = this;
      var options = _self.options;
      var pagination = _self.buildPagination();

      // Remove children before re-render (prevent duplicate)
      _self.inner.children().remove();
      _self.container.children().remove();//axui
      _self.inner.append(pagination);

      //axui
        if (_self.options.total) {
            _self.container.prepend('<a class="ax-total">'+_self.paginationNumbersText()+'</a>');
        }
        if (_self.options.lessHidden == true && _self.totalItems <= _self.options.perPage) {
            _self.container.css("display","none");
        }
//axui

        _self.totalItems


      // Manage active DOM
      var startAt = page === 1 ? 0 : (page - 1) * options.perPage;
      var endAt = page * options.perPage;

      _self.el.children().hide();
      _self.el
        .children()
        .slice(startAt, endAt)
        .show();

      // Manage active state
      _self.inner.children().each(function() {
        var _page = $(this);
        var type = _page.data('pagination-type');

        switch (type) {
          case 'number':
            if (_page.data('page') === page) {
              _page.addClass(options.activeClass);
            }
            break;
          case 'first':
            page === _self.startPage && _page.toggleClass(options.disabledClass);
            break;
          case 'last':
            page === _self.totalPages && _page.toggleClass(options.disabledClass);
            break;
          case 'prev':
            page - 1 < _self.startPage &&
              _page.toggleClass(options.disabledClass);
            break;
          case 'next':
            page + 1 > _self.totalPages &&
              _page.toggleClass(options.disabledClass);
            break;
          default:
            break;
        }
      });

      // If insertAfter is defined
      if (options.insertAfter) {
        _self.container.append(_self.inner).insertAfter($(options.insertAfter));
      } else {
        _self.el.after(_self.container.append(_self.inner));
      }
    },

    handle: function() {
      var _self = this;
      _self.inner.find('a').each(function() {//axui
        var _page = $(this);

        _page.click(function(e) {
          e.preventDefault();
          var page = _page.data('page');

          _self.currentPage = page;
          _self.show(page);
        });
      });
    },

    show: function(page) {
      var _self = this;

      _self.render(page);
      _self.handle();
    },
  };

  $.fn.paginathing = function(options) {
    var _self = this;

    return _self.each(function() {
      return new Paginator(this, options);
    });
  };

  $.fn.paginathing.defaults = {
    perPage: 10,
    limitPagination: false,
    lessHidden:false,
    prevNext: true,
    firstLast: true,
    prevText: '‹',
    nextText: '›',
    firstText: '«',
    lastText: '»',
    containerClass: 'ax-pagination',
    innerClass: 'ax-group',//axui
    pageClass: '',//axui
    activeClass: 'ax-active',
    disabledClass: 'ax-disabled',
    insertAfter: null,
    total: false,//axui
  };
})(jQuery, window, document);
