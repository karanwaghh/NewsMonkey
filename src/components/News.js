import React ,{useState,useEffect} from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
    // document.title=`${capitalizeFirstLetter(props.category)}- NewsMonkey`

    const[articles,setArticles]=useState([]);
    const[page,setPage]=useState(1);
    const[loading,setLoading]=useState(true);
    const[totalResults,setTotalResults]=useState(0);

    const capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews=async()=>{
        props.setProgress(0)
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
            setLoading(true)
            let data=await fetch(url);
            props.setProgress(30)
            let res=await data.json();
            props.setProgress(60)
            console.log(res);

            setArticles(articles.concat(res.articles));
            setTotalResults(res.totalResults);
            setLoading(false);

            props.setProgress(100)
    }
    useEffect(() => {
        updateNews();
        //eslint-disable-next-line
    },[]);

    const fetchMoreData = async () => {
            let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
            setPage(page+1);
            let data=await fetch(url);
            let res=await data.json();
            console.log(res);
            setArticles(articles.concat(res.articles));
            setTotalResults(res.totalResults);
            setLoading(false);
      };
    return (
      <>
        <h2 className='text-center' style={{margin:"36px, 0px",marginTop:"90px"}}>NewsMonkey- Top Headlines From {capitalizeFirstLetter(props.category)}</h2>
            {loading && <Spinner/>}
            <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length!==totalResults}
            loader={<Spinner/>}
            >
                <div className="container">
                    <div className="row">
                    {articles.map((e,index)=>{
                        return <div className="col-md-4" key={`${e.url}-${index}`}>
                            <NewItem title={e.title?e.title.slice(0,45):""} desc={e.description?e.description.slice(0,88):""} imgUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
                        </div>
                    })}
                    </div>
                </div>
            </InfiniteScroll>
      </>
    )
  }

News.defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
}

News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
}
export default News