//@ts-check

class InfiniteTile {

    infiniteTileContainer
    tileRef

    constructor(infiniteTileContainer, tileToDuplicateInInfiniteContainer) {

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
        for(let i = 0; i < 3; i++) {
            this.#set_createGridTiles_addElementAfterTileRef()
        }
    }

    #set_createGridTiles_addElementAfterTileRef() {
        const cloneToAdd = this.tileRef.cloneNode(true)
        cloneToAdd.classList.add('is-clone')
        this.infiniteTileContainer.appendChild(cloneToAdd)
    }

    #set_addScrollListener() {
        this.infiniteTileContainer.addEventListener('scroll', () => {

            const maxScrollLeft = this.tileRef.getBoundingClientRect().width
            const maxScrollTop  = this.tileRef.getBoundingClientRect().height

            if (this.infiniteTileContainer.scrollLeft >= maxScrollLeft) {
                this.infiniteTileContainer.scrollLeft = 1
            } else if (this.infiniteTileContainer.scrollLeft <= 0) {
                this.infiniteTileContainer.scrollLeft = maxScrollLeft - 1
            }

            if (this.infiniteTileContainer.scrollTop >= maxScrollTop) {
                this.infiniteTileContainer.scrollTop = 1
            } else if (this.infiniteTileContainer.scrollTop <= 0) {
                this.infiniteTileContainer.scrollTop = maxScrollTop - 1
            }
        })
    }

}


new InfiniteTile(
    document.querySelector('.infinite-tile-container'),
    document.querySelector('.infinite-tile-container__tile'),
)
