let siteData = {
    settings: {'sortType': 'price', 'sortOrder': 'asc', 'pageSize': 20, 'currentPage': 1, 'searchTerm': ''},
    config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
}
  
if (typeof(backendPath) == 'undefined') {
    var backendPath = '';
}

async function initUI() {
    axios.post(
      backendPath+'./server/ajax.php',
      {
        request: 'initUI',
      },
      this.config
    )
    .then(function(response) {
        this.shops = response.data;
        Object.keys(this.shops).forEach((key) => {
            parent = document.getElementById('shopsContainer');
            option_name = document.createElement('div');
            checkbox = document.createElement('input');
            img = document.createElement('img');
            propsCBOX = {
                type: 'checkbox',
                value: key,
                onchange: 'shopUpdater(this.value, this.checked)',
                checked: this.shops[key]['state'],
            }
            propsImg = {
                src: this.shops[key]['url'],
                alt: key,
                class: 'shopImage',
            }
            for (prop in propsCBOX) {
                checkbox.setAttribute(prop, propsCBOX[prop]);
            }
            for (prop in propsImg) {
                img.setAttribute(prop, propsImg[prop]);
            }
            option_name.appendChild(checkbox); 
            option_name.appendChild(img);
            parent.appendChild(option_name);
        });
        console.log("Added shops: " + Object.keys(this.shops).length);
    })
}

function componentWillMount(){
    window.addEventListener('scroll', this.loadMore);
}
  
function componentWillUnmount(){
    window.removeEventListener('scroll', this.loadMore);
}

function showLoadingWithTimer(status) {
    const loadingContainer = document.getElementById('loading-container');
    if (status) {
       loadingContainer.style.display = 'flex';
    } else {
        loadingContainer.style.display = 'none';
    }
}

function loadMore(){
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
        siteData.settings['currentPage'] += 1;
        searchTerm(siteData.settings['searchTerm'], 'scrollMore');
    }
}

async function searchTerm(term, event) {
    siteData.settings['searchTerm'] = term;
    if (event.key === 'Enter' || event.keyCode === 13 || event.buttons === 0 || event === 'scrollMore') {
        showLoadingWithTimer(true);
        console.time('REQ');
        if (event !== 'scrollMore'){
            document.getElementById('itemCont').innerHTML = '';
            siteData.settings['currentPage'] = 1;
            componentWillMount();
        }
        axios.post(
            backendPath+'./server/ajax.php',
            {
              request: 'performSearch',
              search: term,
              sortType: siteData.settings['sortType'],
              sortOrder: siteData.settings['sortOrder'],
              pageSize: siteData.settings['pageSize'],
              currentPage: siteData.settings['currentPage'],
              shops: this.shops,
            },
            this.config
          )
          .then(function(response) {
            if (response.data['count'] === 0) {
                componentWillUnmount();
                //no item found
                createAlert('Nem található a keresett termék, próbálkozzon más szavakkal!', 'warning', 5);
            }
            response.data['founds'].forEach(element => {
                parent = document.getElementById('itemCont');
                mainDiv = document.createElement('div');
                cardCont = document.createElement('div');
                cardTitle = document.createElement('div');
                cardPrice = document.createElement('div');
                cardShop = document.createElement('div');
                cardImg = document.createElement('img');
                image = document.createElement('img');
                onsale = document.createElement('div');
                if (element['onsale']){
                    onsale.innerHTML = '%';
                    mainDiv.setAttribute('class', 'card stacked onsale');
                    cardPrice.appendChild(document.createTextNode(element['salePrice'] + ', ' + element['SQPrice'] + ' Ft /' + element['SQVolume']));
                }else{
                    mainDiv.setAttribute('class', 'card stacked');
                    cardPrice.appendChild(document.createTextNode(element['price'] + ' Ft, ' + element['SQPrice'] + ' Ft /' + element['SQVolume']));
                };
                cardCont.setAttribute('class', 'card-content');
                cardTitle.setAttribute('class', 'card-title');
                cardPrice.setAttribute('class', 'card-price');
                cardShop.setAttribute('class', 'card-shop');
                cardImg.setAttribute('class', 'card-image-shop');
                onsale.setAttribute('class', 'onsale-percent');
                cardImg.setAttribute('src', this.shops[element['store']]['cardImg']);
                cardTitle.appendChild(document.createTextNode(element['itemName']));
                cardShop.appendChild(cardImg);
                image.setAttribute('src', element['imgUrl']);
                image.setAttribute('class', 'card-img');
                cardCont.appendChild(cardTitle);
                cardCont.appendChild(cardPrice);
                cardCont.appendChild(cardShop);
                mainDiv.appendChild(onsale);
                mainDiv.appendChild(image);
                mainDiv.appendChild(cardCont);
                parent.appendChild(mainDiv);
            });
            showLoadingWithTimer(false);
            console.timeEnd('REQ');
            console.log('Search submited with term: ' + response.data['searchTerm'] + ', page: ' + siteData.settings['currentPage']);
          })
    }
}

function createAlert(text, type, durationInSeconds) {
    // Create the alert div element
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', type);
  
    // Create the close button
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('closebtn');
    closeBtn.innerHTML = '&times;';
  
    alertDiv.appendChild(closeBtn);
    alertDiv.appendChild(document.createTextNode(text));
  
    // Append the alert div to the document body
    document.body.appendChild(alertDiv);
  
    // Add an event listener to close the alert when the close button is clicked
    closeBtn.addEventListener('click', function () {
      document.body.removeChild(alertDiv);
    });
  
    // Automatically fade out the alert after the specified duration
    setTimeout(function () {
      alertDiv.style.opacity = 0;
      setTimeout(function () {
        document.body.removeChild(alertDiv);
      }, 1000); // Remove the element after the fade-out animation (1 second)
    }, durationInSeconds * 1000); // Convert seconds to milliseconds
}

// Example usage:
//createAlert('This alert will slowly fade out after 5 seconds.', 'info', 5);

function shopUpdater(changedItem, status) {
    this.shops[changedItem]['state'] = status;
}
