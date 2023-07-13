const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const Playlist = $('.playlist');
let Songs = $$('.song');
const Heading = $('.header--title');
const HeadingName = $('.header--name');
const CDImage = $('.cd-thumb');
const audio = $('.audio');
const Progress = $('.progress');
const BtnNext = $('.btn-next');
const BtnPrev = $('.btn-prev');
const BtnRandom = $('.btn-suffle');
let cd = $('.cd-player');
let cdHeight = $('.cd-player').offsetWidth;
let BtnToggle = $('.btn-play');
let BtnPlay = $('.icon-play');  
let BtnPause = $('.icon-pause');
let BtnReplay = $('.btn-replay');
let CurrentSongActive = 0;
let rotateAnimation;
const app = {
    IndexCurrentSong: 0,
    RandomSongVisited: [],
    RandomSongVisitedCnt: 0,
    songs: [
        {
            name: "Nghe như tình yêu",
            singer: "MCK",
            path: './assets/mp3/NgheNhuTinhYeu-MCK.mp3',
            image: "./assets/img/nghenhutinhyeu.jpg"
        },
        {
            name: "Nến và hoa",
            singer: "Rhymastic",
            path: './assets/mp3/NenVaHoa-Rhymastic.mp3',
            image: "./assets/img/nenvahoa.jpg"
        },
        {
            name: "Đã lỡ yêu em nhiều",
            singer: "JustaTee",
            path: "./assets/mp3/DaLoYeuEmNhieu-JustaTee.mp3",
            image: "./assets/img/daloyeuemnhieu.jpg"
        },
        {
            name: "Chơi như tụi mỹ",
            singer: "Andree Right Hand",
            path: "./assets/mp3/ChoiNhuTuiMy-Andree.mp3",
            image: "./assets/img/choinhutuimy.jpg"
        },
        {
            name: "Trong Sương",
            singer: "Minh Lai",
            path: "./assets/mp3/TrongSuong-MinhLai.mp3",
            image: "./assets/img/trongsuong.jpg"
        },
        {
            name: "Shut Down",
            singer: "Black Pink",
            path: "./assets/mp3/ShutDown-BlackPink.mp3",
            image: "./assets/img/shutdown.jpg"
        },
        {
            name: "MAKING MY WAY",
            singer: "Sơn Tùng MTP",
            path: "./assets/mp3/MAKINGMYWAY-SonTungMTP.mp3",
            image: "./assets/img/makingmyway.jpg"
        },
        {
            name: "Yêu anh đi mẹ anh bán bánh mì",
            singer: "Phúc Du",
            path: "./assets/mp3/YeuAnhDiMeAnhBanBanhMi-PhucDu.mp3",
            image: "./assets/img/yeuanhdimeanhbanbanhmi.jpg"
        },
        {
            name: "Thằng Điên",
            singer: "JustaTee & Phương Ly",
            path: "./assets/mp3/ThangDien-JustaTee&PhuongLy.mp3",
            image: "./assets/img/thangdien.jpg"
        },
        {
            name: "Có ai thương em như anh",
            singer: "Tóc Tiên",
            path: "./assets/mp3/CoAiThuongEmNhuAnh-TocTien.mp3",
            image: "./assets/img/catena.jpg"
        },
    ],
    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[app.IndexCurrentSong];
            }
        })
        for(let i = 0;i < app.songs.length;i++){
            this.RandomSongVisited[i] = 0;
        }
    },
    loadCurrentSong: function(){
        HeadingName.innerText = this.currentSong.name;
        CDImage.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    render: function(){
        let htmls = this.songs.map((song,index) => {
            return `
                <div class="song" song-index = "${index}">
                    <div class="song-img" style = "background-image: url('${song.image}')">
                    </div>
                    <div class="song-description">
                        <h3 class="title">
                            ${song.name}
                        </h3>
                        <p class = "author">
                            ${song.singer}
                        </p>
                    </div>
                    <div class="song-option">
                        <i class="song-option--icon fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        });
        Playlist.innerHTML = htmls.join('');
        Songs = $$('.song')
    },
    HandleEvent: function(){
        // CD rotate
        rotateAnimation = CDImage.animate([
            {
                transform:'rotate(0)',
            },
            {
                transform:'rotate(360deg)',
            }
        ],{
            duration:10000,
            iterations:Infinity,
        });
        rotateAnimation.pause();
        //Xử lý phóng to thu nhỏ cd
        document.onscroll = function(){
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            let newHeight = cdHeight - scrollTop;
            if(newHeight <= 0) cd.style.width = 0;
            else cd.style.width = newHeight+'px';
            cd.style.opacity = newHeight/cdHeight;
        }
        // Xử lý play/pause btn
        BtnPlay.onclick = function(){
            app.PlaySong();
            BtnPlay.classList.toggle('active');
            BtnPause.classList.toggle('active');
        };
        BtnPause.onclick = function(){
            app.PauseSong();
            BtnPlay.classList.toggle('active');
            BtnPause.classList.toggle('active');
        };
        // Xử lý thanh progress
        audio.ontimeupdate = function(){
            if(audio.duration){
                Progress.value = audio.currentTime * 100 / audio.duration;
                Progress.style.background = `linear-gradient(90deg,#EC1F55 ${Progress.value}%,#E0E0E0 0)`;
            }
        };
        Progress.oninput = function(e){
            audio.muted = true;
            audio.currentTime = (e.target.value * audio.duration / 100);
        };
        Progress.onchange = function(){
            audio.muted = false;
        };

        //Next Song
        BtnNext.onclick = function(){
            if(BtnRandom.classList.contains('active')){
                app.PlayRandomSong();
                return;
            }
            app.IndexCurrentSong++;
            if(app.IndexCurrentSong >= app.songs.length){
                app.IndexCurrentSong = 0;
            }
            app.loadCurrentSong();
            app.PlaySong();
            if(BtnPlay.classList.contains('active')){
                BtnPlay.classList.toggle('active');
                BtnPause.classList.toggle('active');
            }
            app.ActiveSongUpdate();
        };
        //Prev Song
        BtnPrev.onclick = function(){
            if(BtnRandom.classList.contains('active')){
                app.PlayRandomSong();
                return;
            }
            app.IndexCurrentSong--;
            if(app.IndexCurrentSong < 0){
                app.IndexCurrentSong = app.songs.length - 1;
            }
            app.loadCurrentSong();
            app.PlaySong();
            if(BtnPlay.classList.contains('active')){
                BtnPlay.classList.toggle('active');
                BtnPause.classList.toggle('active');
            }
            app.ActiveSongUpdate();
        };
        // Random Song
        BtnRandom.onclick = function(){
            BtnRandom.classList.toggle('active');
        };

        // Xử lý nextSong khi audio ended
        audio.onended = function(){
            BtnNext.click();
        };
        // Xử lý Phát lại bài hát
        BtnReplay.onclick = function(){
            BtnReplay.classList.toggle('active');
            if(BtnReplay.classList.contains('active')){
                audio.loop = true;
            }
            else{
                audio.loop = false;
            }
        };
        //Change Song when click
        /*for(let song of Songs){
            song.onclick = function(){
                let nextSongIndex = song.getAttribute('song-index');
                if(nextSongIndex != app.IndexCurrentSong){
                    app.IndexCurrentSong = nextSongIndex;
                    app.loadCurrentSong();
                    app.PlaySong();
                    if(BtnPlay.classList.contains('active')){
                        BtnPlay.classList.toggle('active');
                        BtnPause.classList.toggle('active');
                    }
                    app.ActiveSongUpdate();
                }
            }
        }
        */
        Playlist.onclick = function(e){
            if(e.target.closest('.song:not(.active)')){
                if(e.target.closest('.song-option')){
                }
                else{
                    let nextSongIndex = e.target.closest('.song:not(.active)').getAttribute('song-index');
                    app.IndexCurrentSong = nextSongIndex;
                    app.loadCurrentSong();
                    app.PlaySong();
                    if(BtnPlay.classList.contains('active')){
                        BtnPlay.classList.toggle('active');
                        BtnPause.classList.toggle('active');
                    }
                    app.ActiveSongUpdate();
                }
            };
        };


        //Volume
        audio.volume = 0.4;
    },
    PlaySong: function(){
        audio.play();
        rotateAnimation.play();
    },
    PauseSong:function(){
        audio.pause();
        rotateAnimation.pause();
    },
    PlayRandomSong: function(){
        let LastestIndex = this.IndexCurrentSong;
        this.RandomSongVisited[this.IndexCurrentSong] = 1;
        while(LastestIndex == this.IndexCurrentSong || this.RandomSongVisited[this.IndexCurrentSong] == 1){
            this.IndexCurrentSong = Math.floor(Math.random() * 100000 % app.songs.length);
        }
        this.RandomSongVisitedCnt++;
        // Reset Array Visited
        if(this.RandomSongVisitedCnt == app.songs.length - 1){
            for(let i = 0;i < app.songs.length;i++){
                this.RandomSongVisited[i] = 0;
            }
            this.RandomSongVisitedCnt = 0;
        }
        app.loadCurrentSong();
        app.PlaySong();
        if(BtnPlay.classList.contains('active')){
            BtnPlay.classList.toggle('active');
            BtnPause.classList.toggle('active');
        }
        app.ActiveSongUpdate();

    },
    ScrollInToActiveSong: function(){
        CurrentSongActive.scrollIntoView({
            behavior:'smooth',
            block:'center'
        });
    },
    ActiveSongUpdate: function(){
        let OldSongActive = CurrentSongActive;
        if(OldSongActive != 0){
            OldSongActive.classList.remove('active');
            CurrentSongActive = $(`[song-index="${this.IndexCurrentSong}"]`);
            CurrentSongActive.classList.add('active');
            this.ScrollInToActiveSong();
        }
        else{
            CurrentSongActive = $('[song-index="0"]');
            CurrentSongActive.classList.add('active');
        }
    },
    start: function(){
        //define Properties
        this.defineProperties();
        // Load bài đầu tiên UX
        this.loadCurrentSong();
        this.render();
        //Active bai dau tien
        this.ActiveSongUpdate();
        // Xử lý event
        this.HandleEvent();
    }
}
app.start();