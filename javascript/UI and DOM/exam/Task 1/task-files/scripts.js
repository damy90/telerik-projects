function createImagesPreviewer(selector, items) {
    var container = document.querySelector(selector);
    var sidebar = document.createElement('div');
    var filter = document.createElement('input');
    var imageContainer = document.createElement('div');
    var imageAnchor = document.createElement('strong');
    var image = document.createElement('img');
    var selectedImageContainer = document.createElement('div');
    var selectedImageAnchor = document.createElement('strong');
    var selectedImage = document.createElement('img');
    var inputLabel = document.createElement('p');
    var searchString;

    filter.onkeyup = refresh;

    sidebar.appendChild(inputLabel);
    sidebar.appendChild(filter);

    imageContainer.appendChild(imageAnchor);
    imageContainer.appendChild(image);

    selectedImageContainer.appendChild(selectedImageAnchor);
    selectedImageContainer.appendChild(selectedImage);

    sidebar.style.width = '200px';
    sidebar.style.height = '500px';
    sidebar.style.overflow = 'scroll';
    sidebar.style.float = 'left';
    sidebar.style.textAlign = 'center';
    image.style.width = '100%';
    image.style.borderRadius = '5px';

    selectedImageContainer.style.float = 'left';
    selectedImageContainer.style.width = '505px';
    selectedImage.style.width = '100%';
    selectedImage.style.borderRadius = '15px';
    selectedImageContainer.style.margin = '20px';
    selectedImageContainer.style.textAlign = 'center';
    selectedImageContainer.style.fontSize = '30px';

    selectedImageAnchor.innerHTML = items[0].title;
    selectedImage.src = items[0].url;
    container.appendChild(selectedImageContainer);
    inputLabel.innerHTML = 'Filter';

    refresh();

    function refresh() {
        var divs = sidebar.querySelectorAll('div');
        for (var i = 0; i < divs.length; i++) {
            sidebar.removeChild(divs[i]);
        }
        for (i = 0, length = items.length; i < length; i++) {
            searchString = filter.value;
            image.src = items[i].url;
            imageAnchor.innerHTML = items[i].title;
            if (imageAnchor.innerHTML.toLowerCase().indexOf(searchString) !== -1 || searchString == 0) {
                var clonedNode = imageContainer.cloneNode(true);
                clonedNode.addEventListener('click', onImageSelect);
                clonedNode.addEventListener('mouseover', onMouseOver);
                clonedNode.addEventListener('mouseout', onMouseOut);
                sidebar.appendChild(clonedNode);
            }
        }
    }
    container.appendChild(sidebar);

    function onMouseOut(ev) {
        this.style.backgroundColor = '';
    }

    function onMouseOver(ev) {
        this.style.backgroundColor = 'lightgray';
    }

    function onImageSelect(ev) {
        var image = this.querySelector('img');
        var anchor = this.querySelector('strong');
        selectedImage.src = image.src;
        selectedImageAnchor.innerHTML = anchor.innerHTML;
    }
}