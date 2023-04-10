import { useEffect, useState } from 'react';
import emojiList from "../emojiList";
import EmojiContainer from './EmojiContainer';

const Main = () => {
    // console.log(emojiList);
    const [list, setList] = useState(emojiList);
    // console.log(list);
    const [keyword, setKeyword] = useState("");

    const typed = (e) => {
        const value = e.target.value.toLowerCase();
        setKeyword(value);
    };

    useEffect(_ => {
        // filtered based on Description or Aliases or Category
        const searched = emojiList.filter(searchEmoji => {
            if (searchEmoji.emoji === keyword) {
                return true;
            }
            if (searchEmoji.description.startsWith(keyword)) {
                return true;
            }
            if (searchEmoji.category.startsWith(keyword)) {
                return true;
            }
            if (searchEmoji.aliases.some(e => e.startsWith(keyword))) {
                return true;
            }
            return false;
        });
        setList(searched);
    }, [keyword]);

    return (
        <>
            <div className='search'>
                <input type="text" placeholder=' F i l t e r 🔍' onKeyUp={typed} />
                {keyword === "" ? false : (<h3>Result for - {keyword}</h3>)}

            </div>

            <hr />
            {list.length === 0 ? (
                <div className='not-found'>
                    <h3 className='result-non'> Sorry😔 </h3>
                    <h6>Image no found..</h6>
                </div>
            ) : (
                <EmojiContainer list={list} />
            )}

        </>
    );
}
export default Main;
