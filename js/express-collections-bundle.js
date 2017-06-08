(function ($) {
  $(document).ready(function(){
    $(".bean-collection-grid .expand-trigger").each(function(i){
      var trigger = $(this).attr('href');
      var trigger2 = trigger + '-' + i;
      var target = trigger2.substring(1);
      $(this).attr('href', trigger2);
      $(this).next('.expand-content').attr('id', target);
    });
    $(".collection-items-categories").hide();

    $("ul.collection-items-navigation a").first().addClass('active');
    $("ul.collection-items-navigation a, .collection-filter-links button").click(function(){
      // Get the collection to operate on
      var collectionTarget = $(this).attr("data-collection");
      // Remove disabled class, aria from all items in collection
      $("#" + collectionTarget + " .collection-item").removeClass('collection-item-disabled').removeAttr('aria-hidden').removeAttr('role').removeClass('collection-item-active');
      // Get the collection category
      var target = $(this).attr("data-collection-category");
      // Apply disabled class, aria to all items not in category
      $('#' + collectionTarget + ' .collection-item').not('.collection-category-' + target).addClass('collection-item-disabled').attr('aria-hidden', 'true').attr('role', 'presentation');
      $('#' + collectionTarget + ' .collection-item.collection-category-' + target).addClass('collection-item-active');
      // Remove active class from category links
      $('#' + collectionTarget + ' .collection-filter-links button').removeClass('active');
      // Apply active class to the clicked link
      $(this).addClass('active');
      updateCollectionResults(collectionTarget);
      return false;
    });
    // Collection ALL link
    $("ul.collection-items-navigation a.collection-category-all, button.collection-filter-clear").click(function(){
      // Get the collection to operate on
      var collectionTarget = $(this).attr("data-collection");
      // Remove disabled class, aria from all items in collection
      $("#" + collectionTarget + " .collection-item").removeClass('collection-item-disabled').removeAttr('aria-hidden').removeAttr('role').addClass('collection-item-active');
      // Remove active class from category links
      $("ul.collection-items-navigation a").removeClass('active');
      // Apply active class to the clicked link
      $(this).addClass('active');
      updateCollectionResults(collectionTarget);
      return false;
    });


    $("select.collection-filter").change(function(){
      // Get the collection to operate on
      var collectionTarget = $(this).attr("data-collection");
      // Get the collection category
      var target = $(this).val();
      // Show all collection items
      $("#" + collectionTarget + " .collection-item").removeClass('collection-item-disabled').removeAttr('aria-hidden').removeAttr('role');
      // Add disabled class, aria to collection items that are not part of the category chosen
      if (target != 'all') {
        $('#' + collectionTarget + ' .collection-item').not('.collection-category-' + target).addClass('collection-item-disabled').attr('aria-hidden', 'true').attr('role', 'presentation');
      }
    });

    $('.collection-filter-links-multiple h3.collection-filter-label').click(function(event){
      event.preventDefault();
      $('.collection-filter-links').hide();
      $('h3.collection-filter-label').attr('aria-expanded', 'false');
      $(this).next().fadeIn();
      $(this).attr('aria-expanded', 'true');
    });
    $('.collection-grid').each(function(){
      $('.collection-item', this).addClass('collection-item-active');
      var items = $('.collection-item-active', this).length;
      $('.collection-grid .results').text(items + ' items found.');
      $('.collection-filter-clear').addClass('active');
    });
    function updateCollectionResults(collectionId) {
      $('#' + collectionId + ' .collection-item').removeAttr('tabindex');
      var items = $('#' + collectionId + ' .collection-item-active').length;
      $('#' + collectionId + ' .results').text(items + ' items found.').attr('tabindex','-1').focus();;
      $('.element-item').removeAttr('tabindex');
      $('#' + collectionId + ' .collection-item-active').attr('tabindex',0);

    }
  });
})(jQuery);
