import {useContext, useEffect, useState } from "react";
import getGifs from "../services/getGifs";
import GifsContext from '../context/GifsContext'

export function useGifs({keyword} = {keyword: null}){
    const [loading, setLoading] = useState(false);
    const {gifs, setGifs} = useContext(GifsContext);
  
    useEffect(
      function () {
        setLoading(true);
        //recuperamos la keyword del localstorage
        const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'minimalism';
        getGifs({ keyword: keywordToUse })
        .then((gifs) => {
          setGifs(gifs);
          setLoading(false);
          //guardamos la keyword del localstorage
          localStorage.setItem('lastKeyword', keyword);
        });
      },
      [keyword, setGifs]
    );

    return {loading, gifs}
}
