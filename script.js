const apiKey = '0633578875c046aeb4013ee776230e8b';
let url = 'https://newsapi.org/v2/everything?q='

window.addEventListener('load' , fetchNews("India"))

async function fetchNews(query){
   const response = await fetch(`${url}${query}&apiKey=${apiKey}`);
   const data = await response.json();
   binding(data.articles);
}

function binding(articles){
   const newsContainer = document.getElementById('newsContainer');
   const newsTemplate = document.getElementById('newsTemplate');
   newsContainer.innerHTML = "";
   articles.forEach((article) =>{
      if(!article.urlToImage){
         return;
      }
      const cloneTemplate = newsTemplate.content.cloneNode(true);
      fillData(cloneTemplate,article);
      newsContainer.appendChild(cloneTemplate)
   })
}

function fillData(cloneTemplate,article){
   const newsImg = cloneTemplate.querySelector('#newsImg');
   const source = cloneTemplate.querySelector('#source');
   const title = cloneTemplate.querySelector('#title')
   const description = cloneTemplate.querySelector('#description')
   const newsDate = cloneTemplate.querySelector('#newsDate')
   const urlToRead = cloneTemplate.querySelector('#readMore')
   
   const date = new Date(article.publishedAt).toLocaleString("en-US",{
      timeZone:"Asia/jakarta"
   })
   
   newsImg.src = article.urlToImage;
   source.innerHTML = article.source.name;
   title.innerHTML = article.title;
   description.innerHTML = article.description;
   newsDate.innerHTML = date;
   urlToRead.href = article.url;
   
   
}


let searchInput = document.getElementById('searchText');
let searchButton = document.getElementById('searchButton');
 
searchButton.addEventListener( "click" ,()=>{
   let query = searchInput.value;
   if(!query){
      return;
   }
   fetchNews(query);
})

 