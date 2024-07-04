

const wiki = {

  config: {
    WIKI_BASE_URL: 'https://en.wikipedia.org/w/rest.php/v1/search/page?limit=20'
  },


  //q=YOUR_SEARCH_GOES_HERE
  initUI(){

    this.dom = {

      userForm: document.querySelector('#userForm'),
      userInput: document.querySelector('#userInput'),
      resultsDiv: document.querySelector('#results'),
      errorDiv: document.querySelector('#error'),

    }

  
    this.dom.userForm.addEventListener('submit', ev => {

      ev.preventDefault();

      //console.log(userInput.value);

      this.loadSearchResults(userInput.value)

    }) // submit



  }, // initUI()

//=====================================================================================
  

  loadSearchResults(search){
    axios.get(this.config.WIKI_BASE_URL, {
      params: {
        q: search,
      }
    })
    .then( res => {
      console.log(res.data.pages);
      this.renderSearchResults(res.data.pages)
    })
    .catch( err => {
      console.warn('There was an error', err);
      this.dom.errorDiv.innerHTML = 'There was an error!';
    });
  },


//=====================================================================================

  renderSearchResults(result){

    this.dom.resultsDiv.replaceChildren();

    for (const item of result){



      this.dom.resultsDiv.innerHTML += item.title;


      if(item.thumbnail !== null){

         console.log(item.thumbnail.url);

         const imgNode = document.createElement('img');
         imgNode.src = this.generateImageURL(item.thumbnail.url);
         imgNode.alt = item.title;
         this.dom.resultsDiv.appendChild(imgNode);

      } else {

        this.dom.resultsDiv.innerHTML += ' No THUMBNAIL IMAGE available..<br>'

      }

       
    }
  }, // renderSearchResults()
  


//=====================================================================================
  generateImageURL(url){

    return `https:${url}`;

  },





//=====================================================================================



  loadSearchDetails(){
    axios.get(``)
    .then( res => {
      
    })
    .catch( err => {
      console.warn('There was an error', err);
      errorDiv.innerHTML = 'There was an error!';
    });
  },
//=====================================================================================

  renderSearchDetails(){},


}; // wiki{}



wiki.initUI();

