const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyADHlipMs2Ldtdh_ILKHwJp_5Wze21BSNQ";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 40,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
    console.log(data)
}



const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})

  
    const subscriberCount= document.getElementById('Subscriberid');
    const viewCount = document.getElementById('views');
    const videoCount = document.getElementById('videocount');
    
   
    let getdata = () => {
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${'UC_x5XG1OV2P6uZZ5FSM9Ttw'}&key=${api_key}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            subscriberCount.value = data["items"][0].statistics.subscriberCount;
            viewCount.value = data["items"][0].statistics.viewCount;
            videoCount.value = data["items"][0].statistics.videoCount;
            
            
        })
    }
   getdata();