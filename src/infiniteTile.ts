class InfiniteTile {

    infiniteTileContainer: HTMLDivElement
    tileRef: HTMLDivElement

    constructor(infiniteTileContainer: unknown, tileToDuplicateInInfiniteContainer: unknown) {

        if (!(infiniteTileContainer instanceof HTMLDivElement)) {
            console.error("infiniteTileContainer of InfiniteTile constructor must be an HTMLDivElement")
            return
        }
        if (!(tileToDuplicateInInfiniteContainer instanceof HTMLDivElement)) {
            console.error("tileToDuplicateInInfiniteContainer of InfiniteTile constructor must be an HTMLDivElement")
            return
        }

        this.infiniteTileContainer = infiniteTileContainer
        this.tileRef = tileToDuplicateInInfiniteContainer

        this.#set_createGridTiles().then(() => {
            console.info('tile duplicated')
        })

        this.#set_addScrollListener()

    }

    async #set_createGridTiles(){
        for(let i = 1; i <= 9; i++) {
            if( i < 5 ) this.#set_createGridTiles_addElementBeforeTileRef()
            else if( i === 5) continue
            else this.#set_createGridTiles_addElementAfterTileRef()
        }
    }

    #set_createGridTiles_addElementBeforeTileRef() {
        const cloneToAdd = this.tileRef.cloneNode(true) as HTMLDivElement
        cloneToAdd.classList.add('is-clone')
        cloneToAdd.classList.add('is-before')
        this.infiniteTileContainer.insertBefore(cloneToAdd, this.tileRef)
    }
    #set_createGridTiles_addElementAfterTileRef() {
        const cloneToAdd = this.tileRef.cloneNode(true) as HTMLDivElement
        cloneToAdd.classList.add('is-clone')
        cloneToAdd.classList.add('is-after')
        this.infiniteTileContainer.appendChild(cloneToAdd)
    }

    #set_addScrollListener() {
        this.infiniteTileContainer.addEventListener('scroll', () => {

            const maxScrollLeft = this.infiniteTileContainer.scrollWidth - this.infiniteTileContainer.getBoundingClientRect().width
            const maxScrollTop = this.infiniteTileContainer.scrollHeight - this.infiniteTileContainer.getBoundingClientRect().height

            switch (this.infiniteTileContainer.scrollLeft) {
                case maxScrollLeft:
                    this.infiniteTileContainer.scrollLeft = 1
                    break;
                case 0:
                    this.infiniteTileContainer.scrollLeft = maxScrollLeft - 1
                    break;
            }

            switch (this.infiniteTileContainer.scrollTop) {
                case maxScrollTop:
                    this.infiniteTileContainer.scrollTop = 1
                    break;
                case 0:
                    this.infiniteTileContainer.scrollTop = maxScrollTop - 1
                    break;
            }
        })
    }

}


new InfiniteTile(
    document.querySelector('.infinite-tile-container'),
    document.querySelector('.infinite-tile-container__tile'),
)
