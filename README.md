# Nasa Image API search engine
Using Nasa's Image and Video Library [API](https://api.nasa.gov/), I made a search engine. The API has 4 endpoints- Search, Asset, Metadata, and Captions. Under Search, there are also further options for Images, Videos, and Audio. I chose to stick to using only Search since I wanted this to be an engine showcasing only Images. This project helped me practice fetching data from an API, reading documentation, state control, bootstrap, and also usage of pagination. 
[Click](https://jpadillacoding.github.io/SpaceSnap/) to view the deployed app.

## Project progression 
My Initial plan was just to use data from one search and display a portion of the data retrieved. After I got my initial plan complete, I decided to challenge myself a bit by making a search function for the user to be able to retrieve any image on Nasa's database. Once this was complete, pagination was made so the user wouldn't need to scroll so much and add a better experience.

## Getting started   

The API's search endpoint works by making a request 
```
curl -G https://images-api.nasa.gov/search
 --data-urlencode "q=apollo 11"
 --data-urlencode "description=moon landing"
 --data-urlencode "media_type=image" |
 python -m json.tool
```
or fetching with a URL 
```
"https://images-api.nasa.gov/searchq=apollo%2011description=moon%20landing&media_type=image" 
```
I chose to go with just searching "ISS" with `mediatype=image` to make a starter version. I kept it simple with `useEffect` wrapping a `fetch`. useEffect was used to control the data from fetching indefinitely by adding empty brackets as the second parameter, which led to issues covered later on. The amount of data was controlled with `.slice` and only one state variable was used for fetching the data. Styling was kept relatively simple with flexbox and a bit of `Bootstrap`. Bootstrap is a popular CSS framework and for that reason was incorporated into this project via `<script>`.

## Pagination 

This was the first time I used the pagination concept in one of my projects, but it was relatively simple once it was done for the first time. 
There are 6 variables added to make the pagination component happen. 2 states were added- `currentPage` which is dependent on which page button is clicked and `postPerPage`, which is set to 20. Then we just need to know the length of the array of data we have and find the first and last item per page. Since we know each page will use 20 posts, 2 variables are used to find the first and last. With these variables, we can now declare what is contained in our current page
```
currentPost = nasaInfo.collection.items.slice(firstPostIndex, lastPostIndex) 
<ItemsList nasaInfo={currentPost} />
```
Now we can make the page buttons
```
let pages = []
    for(let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++)
    {
        pages.push(i)
    }
pages.map((page, index) => 
    {
        return <button className="btn btn-dark"
        onClick={() => {setCurrentPage(page); window.scrollTo(0, 0)}} 
        key={index}>{page}</button>
    })
```
For the next and previous buttons, all that has to be done is to make functions add and subtract from the current page. They just need conditionals for min and max pages. 


## Search All Images 

Since we're already fetching data from the API, the search function was simple to set up. The heart of the code is grabbing the value put into the search bar and using template literals to plug into the fetch request. JS already has a built-in function for trimming white space and encoding it in URL format. Also didn't have to worry upper and lowercasing since the API takes care of that.
```
function newSearch() 
    {
        const formattedString = encodeURIComponent(inputVal.trim())
        setNasaData(`https://images-api.nasa.gov/search?q=${formattedString}&media_type=image`)
    }
```


## Complications 

My first biggest bug was from using accessors for the JSON data. That led to getting errors of `Cannot read properties of undefined(items)`. This was fixed by adding conditionals.
```
    nasaInfo.collection && (currentPost = 
    nasaInfo.collection.items.slice(firstPostIndex, lastPostIndex) 
    )
``` 

The second biggest bug I had was figuring out why my search function wasn't working. The problem was within `useEffect`. Since I used closed brackets as the second parameter, it never had anything to go by to know when state was changed. I changed the closed brackets to `[nasaData]`, the state used for our data. 

I also made a [spreadsheet](https://docs.google.com/spreadsheets/d/1nXqq_d8wXzVukwPlAtf1VmzLszwlMMKOKsvoybejeF4/edit?usp=sharing) of all the problems I came across. This is useful for referring to previous problems I've had on future projects. 

## Built With
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
