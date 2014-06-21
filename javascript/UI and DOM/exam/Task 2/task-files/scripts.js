$.fn.gallery = function (cols) {
    cols = cols || 4;
    //cols = 1;
    var $container = this;
    $container.addClass('gallery');
    var $selected = $container.find('.selected')
        .hide();
    var newLineSelector = '.image-container:nth-child(' + cols + 'n+1)';
    $container.find(newLineSelector)
        .addClass('clearfix');
    var $blockerDiv = $('<div>').insertBefore($selected)
        .addClass('disabled-background')
        .hide();

    $container.find('.gallery-list').on('click', '.image-container', function () {
        var $this = $(this);
        var selectedSrc = $this.find('img').attr('src');
        var prevSrc = $this.prev().find('img').attr('src');
        var nextSrc = $this.next().find('img').attr('src');
        if ($this.is(':last-child')) {
            nextSrc = $container.find('.image-container:first-child img').attr('src');
        }
        if ($this.is(':first-child')) {
            prevSrc = $container.find('.image-container:last-child img').attr('src');
        }
        //set src-s in .slected
        $selected.find('.previous-image img')
            .attr('src', prevSrc);
        $selected.find('.current-image img')
            .attr('src', selectedSrc);
        $selected.find('.next-image img')
            .attr('src', nextSrc);
        $selected.show();
        $container.find('.gallery-list')
            .addClass('blurred');
        $blockerDiv.show();
    });

    $container.find('.current-image').on('click', 'img', function () {
        $container.find('.gallery-list')
            .removeClass('blurred');
        $selected.hide();
        $blockerDiv.hide();
    });

    $container.find('.previous-image img').on('click', function () {
        var $this = $(this);
        var clickedSrcTag = "[src='" + $this.attr('src') + "']";
        var $clickedImmageInList = $container.find('.gallery-list').find(clickedSrcTag);
        $clickedImmageInList.parent()
            .trigger('click');
    });

    $container.find('.next-image').on('click', 'img', function () {
        var $this = $(this);
        var clickedSrcTag = "[src='" + $this.attr('src') + "']";
        var $clickedImmageInList = $container.find('.gallery-list').find(clickedSrcTag);
        $clickedImmageInList.parent()
            .trigger('click');
    });
};