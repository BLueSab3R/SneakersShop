import Item from "../Item/Item";
function Home({ addToFavourite, isItem, counter, setSearchValue, searchValue, onChangeSearchInput, onAddtoCart, itemInCart }) {
    return (
        <>
            <div className="content  p-40 ">
                <div className="d-flex align-center  justify-between mb-40">
                    <h1>{searchValue ? `Search by request:"${searchValue}" ` : "All sneakers"}</h1>
                    {/* якщо хочаб щось є searchValue */}
                    <div className="searchBlock d-flex">
                        <img src="/img/search.png" alt="search"></img>
                        {searchValue && <img onClick={() => { setSearchValue('') }}
                            className="clear cu-p"
                            src='/img/remove-button.svg'
                            alt='Remove' />}
                        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..."></input>
                    </div>
                </div>
                {isItem.length > 0 &&
                    <div className="d-flex flex-wrap" key={counter}>
                        {isItem.filter(items => items.title.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((item, index) => (
                                <Item
                                    key={index}
                                    title={item.title}
                                    price={item.price}
                                    imgUrl={item.imgUrl}
                                    id={item.id}
                                    addToCart={(obj) => onAddtoCart(obj)}
                                    inCart={itemInCart(item)}
                                    addToFavourite={(obj) => addToFavourite(obj)}
                                />
                            ))}
                    </div>
                }
            </div>
        </>

    )
}


export default Home;