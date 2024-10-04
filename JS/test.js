const categories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}
const videoCaregories = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => displayVideoCategory(data.videos))
    .catch((error) => console.log(error))
}

function setTime (time){
    const hour = parseInt(time / 3600);
    let remainingSecond= parseInt(time % 3600)
    const minite = parseInt(remainingSecond / 60)
     remainingSecond = remainingSecond % 60
     return   `${hour} hour ${minite}minite ${remainingSecond} second ago`
}
const removeActiveClass =() => {
    const butons = document.getElementsByClassName('category-btn')
    console.log(butons)
    for(let btn of butons){
        btn.classList.remove('active')
    }
}
const clickHandlare = (id) =>{
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {

        removeActiveClass()
        const activebtn = document.getElementById(`btn ${id}`)
        activebtn.classList.add('active')
        displayVideoCategory(data.category)
    })
    .catch((error) => console.log(error))
    
}
const displayVideoCategory = (item) => {
    const videoSection = document.getElementById('videos')
    // new part
    videoSection.innerText = ''
    if(item.length == 0){
        videoSection.classList.remove('grid')
        videoSection.innerHTML =`
        <div class=" min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="assest/Icon.png" alt="" />
        <h2 class="font-bold text-xl text-center">No content here in this categories</h2>
        </div>
        `
    }else{
        videoSection.classList.add('grid')
    }
    item.forEach((video) => {
        console.log(video)
        const card = document.createElement('div')
        card.classList = "card card-compact bg-base-100"
        card.innerHTML =`
        <figure class="h-[200px]">
            <img class="w-full h-full object-cover" src="${video.thumbnail}" />
        </figure>
        <div class="flex py-2 gap-2 px-0 relative">
           <img class="w-[30px] h-[30px] object-cover rounded-full" src="${video.authors[0].profile_picture}" />
           ${video.others.posted_date?.length == 0 ? '' :` <span class="absolute bg-black text-xs text-white right-5 bottom-20"> ${setTime(video.others.posted_date)}</span>`}
       
           <div>
            <h2 class="font-bold ">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p class="text-gray-600">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified === true ? `  <img class="w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" />` : ''}
                  
                </div>
           </div>
        </div>
        </div>
        
        ` 
        videoSection.append(card)
    })
}

const displayCategories = (data) => {
    const categories = document.getElementById('categories')
    data.forEach((item) => {
    const div = document.createElement('div')
    div.innerHTML =`
    <button id="btn ${item.category_id}" onclick ="clickHandlare(${item.category_id})" class="btn category-btn">${item.category}</button>
    `
    categories.append(div)
    })
 
}
categories()
videoCaregories()