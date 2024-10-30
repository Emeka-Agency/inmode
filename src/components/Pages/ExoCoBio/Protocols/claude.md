```tsx
<div id="page_exocobio-protocols-videos_container">
    <button id="exocobio-videos-previous" onClick={() => exocobio_previous_video()}>
        <svg viewBox="0 0 100 100">
            <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow"></path>
        </svg>
    </button>
    <div id="page_exocobio-protocols-videos">
        {
            videos.map((video, i) => 
                <div
                    key={"page_exocobio-protocols-videos-video-" + i}
                    className="page_exocobio-protocols-videos-video"
                    style={{transform: `translateX(${i * 100}%)`}}
                >
                    <video controls>
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
            )
        }
    </div>
    <button id="exocobio-videos-next" onClick={() => exocobio_next_video()}>
        <svg viewBox="0 0 100 100">
            <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" transform="translate(100, 100) rotate(180) "></path>
        </svg>
    </button>
</div>
```

```css
#page_exocobio-protocols-videos_container {
    display: flex;
    flex-direction: row;
    column-gap: 16px;
    align-items: center;
    justify-content: center;
}

#page_exocobio-protocols #page_exocobio-protocols-videos {
    min-height: 592px;
    max-width: 80%;
    box-sizing: border-box;
    position: relative;
    border: 2px solid var(--pure-black);
    width: calc(98% - 100px);
    font-size: 0;
    white-space: nowrap;
    overflow: hidden;
}

@media (min-width: 768px) {
    #page_exocobio-protocols #page_exocobio-protocols-videos {
        width: calc(80% - 100px);
    }
}

@media (min-width: 1024px) {
    #page_exocobio-protocols #page_exocobio-protocols-videos {
        width: 80%;
    }
}

@media (min-width: 1440px) {
    #page_exocobio-protocols #page_exocobio-protocols-videos {
        width: 90%;
    }
}

/* VIDEO */

#page_exocobio-protocols .page_exocobio-protocols-videos-video {
    height: auto;
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
    transition: transform 0.4s linear(0 0%, 0 1.8%, 0.01 3.6%, 0.03 6.35%, 0.07 9.1%, 0.13 11.4%, 0.19 13.4%, 0.27 15%, 0.34 16.1%, 0.54 18.35%, 0.66 20.6%, 0.72 22.4%, 0.77 24.6%, 0.81 27.3%, 0.85 30.4%, 0.88 35.1%, 0.92 40.6%, 0.94 47.2%, 0.96 55%, 0.98 64%, 0.99 74.4%, 1 86.4%, 1 100%) 0s;
    display: inline-block;
}

#page_exocobio-protocols .page_exocobio-protocols-videos-video video {
    height: 100%;
    width: 100%;
}

/* FLÈCHES */

#page_exocobio-protocols-videos_container #exocobio-videos-next,
#page_exocobio-protocols-videos_container #exocobio-videos-previous {
    background-color: var(--pure-white);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    outline: transparent;
    border: none;
    cursor: pointer;
}

#page_exocobio-protocols-videos_container #exocobio-videos-previous:disabled,
#page_exocobio-protocols-videos_container #exocobio-videos-next:disabled {
    opacity: 0.3;
    cursor: default;
}
```