class InfiniteTile {

    infiniteTileContainer: HTMLDivElement
    tileRef: HTMLDivElement

    beforeScrollTop = 0
    beforeScrollLeft = 0
    scrollDirection: 'toLeft' | 'toRight' | 'toTop' | 'toBottom' = 'toRight'

    constructor(infiniteTileContainer: unknown, tileToDuplicateInInfiniteContainer: unknown) {
        window.addEventListener('scroll', (e) => {
                    if( this.beforeScrollLeft < window.scrollX ) this.scrollDirection = 'toRight'
            else    if( this.beforeScrollLeft > window.scrollX ) this.scrollDirection = 'toLeft'
            else    if( this.beforeScrollTop < window.scrollY  ) this.scrollDirection = 'toBottom'
            else    if( this.beforeScrollTop > window.scrollY  ) this.scrollDirection = 'toTop'

            this.beforeScrollTop = window.scrollY
            this.beforeScrollLeft = window.scrollX
        })

        if(! (infiniteTileContainer instanceof HTMLDivElement) )                {
            console.error("infiniteTileContainer of InfiniteTile constructor must be an HTMLDivElement")
            return
        }
        if(! (tileToDuplicateInInfiniteContainer instanceof HTMLDivElement) )  {
            console.error("tileToDuplicateInInfiniteContainer of InfiniteTile constructor must be an HTMLDivElement")
            return
        }

        this.infiniteTileContainer                  = infiniteTileContainer
        this.tileRef     = tileToDuplicateInInfiniteContainer

        this.#duplicateRefTile().then(() => {console.info('tile duplicated')})

        this.#initObserver().then(() => {console.info('tile observer ready')})
    }

    async #duplicateRefTile(){
        for(let i = 1; i <= 9; i++) {
            if( i < 5 ) this.#addElementBeforeTileRef()
            else if( i === 5) continue
            else this.#addElementAfterTileRef()
        }
    }

    async #initObserver() {
        const observer = new IntersectionObserver((entries, observer1) => {
            entries.map(entrie => {
            console.log("hello")
                if(entrie.isIntersecting) return

                     if (this.scrollDirection === 'toRight')
                    window.scrollTo({
                        left: window.innerWidth - (entrie.boundingClientRect.width + entrie.boundingClientRect.x),
                    })
                else if (this.scrollDirection === 'toLeft')
                    window.scrollTo({
                        left: window.innerWidth + (entrie.boundingClientRect.width - entrie.boundingClientRect.x),
                    })
                else if (this.scrollDirection === 'toTop')
                    window.scrollTo({
                        top: window.innerHeight + (entrie.boundingClientRect.height - entrie.boundingClientRect.y),
                    })
                else if (this.scrollDirection === 'toBottom')
                    window.scrollTo({
                        top: window.innerHeight - (entrie.boundingClientRect.height + entrie.boundingClientRect.y),
                    })
            })
        }, {
            rootMargin: '-100px',
        })

        observer.observe(this.tileRef)
    }

    #addElementBeforeTileRef() {
        const cloneToAdd = this.tileRef.cloneNode(true) as HTMLDivElement
        cloneToAdd.classList.add('is-clone')
        cloneToAdd.classList.add('is-before')
        this.infiniteTileContainer.insertBefore(cloneToAdd, this.tileRef)
    }

    #addElementAfterTileRef() {
        const cloneToAdd = this.tileRef.cloneNode(true) as HTMLDivElement
        cloneToAdd.classList.add('is-clone')
        cloneToAdd.classList.add('is-after')
        this.infiniteTileContainer.appendChild(cloneToAdd)
    }

}


const infiniteTile = new InfiniteTile(
    document.querySelector('.infinite-tile-container'),
    document.querySelector('.infinite-tile-container__tile'),
)
