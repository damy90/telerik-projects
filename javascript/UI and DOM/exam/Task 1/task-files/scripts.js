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

    //test comit
    filter.addEventListener('keyup', showResults);

    imageContainer.appendChild(imageAnchor);
    imageContainer.appendChild(image);

    sidebar.appendChild(inputLabel);
    sidebar.appendChild(filter);

    sidebar.style.width = '200px';
    sidebar.style.height = '500px';
    sidebar.style.overflowY = 'scroll';
    sidebar.style.float = 'left';
    sidebar.style.textAlign = 'center';
    image.style.width = '100%';
    image.style.borderRadius = '5px';

    selectedImageContainer.appendChild(selectedImageAnchor);
    selectedImageContainer.appendChild(selectedImage);
    selectedImageAnchor.innerHTML = items[0].title;
    selectedImage.src = items[0].url;
    container.appendChild(selectedImageContainer);
    inputLabel.innerHTML = 'Filter';

    selectedImageContainer.style.float = 'left';
    selectedImageContainer.style.width = '505px';
    selectedImage.style.width = '100%';
    selectedImage.style.borderRadius = '15px';
    selectedImageContainer.style.margin = '20px';
    selectedImageContainer.style.textAlign = 'center';
    selectedImageContainer.style.fontSize = '30px';

    // generate galery
    for (var i = 0, length = items.length; i < length; i++) {
        image.src = items[i].url;
        imageAnchor.innerHTML = items[i].title;
        var clonedNode = imageContainer.cloneNode(true);
        clonedNode.addEventListener('click', onImageSelect);
        clonedNode.addEventListener('mouseover', onMouseOver);
        clonedNode.addEventListener('mouseout', onMouseOut);
        sidebar.appendChild(clonedNode);
    }
    container.appendChild(sidebar);

    function showResults() {
        var imageContainers = sidebar.querySelectorAll('div');
        var searchString = filter.value.toLowerCase();
        for (var i = 0, length = items.length; i < length; i++) {
            imageContainers[i].style.display = '';
            var currentAnchor = imageContainers[i].querySelector('strong').innerHTML.toLowerCase();
            if (currentAnchor.indexOf(searchString) === -1) {
                imageContainers[i].style.display = 'none';
            }
        }
    }

    function onMouseOut() {
        this.style.backgroundColor = ''; // default
    }

    function onMouseOver() {
        this.style.backgroundColor = 'lightgray';
    }

    function onImageSelect() {
        selectedImage.src = this.querySelector('img').src;
        selectedImageAnchor.innerHTML = this.querySelector('strong').innerHTML;
    }
}