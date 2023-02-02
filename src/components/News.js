import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const[articles, setArticles] = useState([]);
  const[loading, setLoading] = useState(true);
  const[page, setPage] = useState(1);
  const[totalResults, setTotalResults] = useState(0);
  // document.title = `${this.capitaliseFirstLetter(props.category)} - NewsMonkey`;

  const capitaliseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async() => {
    props.setProgress(10);
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&
      page=${page}&pagesize=${props.pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  }

  //implemented componenetDidMount
  useEffect(() => {
    updateNews();
  }, [])

  // async componentDidMount() {
  //   props.setProgress(10);
  //   //runs after execution of render method gets over.
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pagesize=${props.pagesize}`;
  //   this.setState({loading : true});
  //   let data = await fetch(url);
  //   props.setProgress(30);
  //   let parsedData = await data.json();
  //   props.setProgress(70);
  //   this.setState({articles : parsedData.articles, totalResults : parsedData.totalResults, loading : false});

  //   props.setProgress(100);
  // }

  // handlePrevClick = async() => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=84989bf3fb134236b213b64045b3d60e&page=${this.state.page - 1}&pagesize=${props.pagesize}`;
  //   this.setState({loading : true})
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page : this.state.page - 1, 
  //     articles :  parsedData.articles,
  //     loading : false,
  //     totalResults : parsedData.totalResults
  //   })
  // }
  
  // handleNextClick = async() => {
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pagesize))) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=84989bf3fb134236b213b64045b3d60e&page=${this.state.page + 1}&pagesize=${props.pagesize}`;
  //     this.setState({loading : true})
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     this.setState({
  //       page : this.state.page + 1,
  //       articles :  parsedData.articles,
  //       loading : false,
  //       parsedData : parsedData.totalResults
  //     })
  //   }
  // }

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pagesize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

    return (
      <>
        <h1 className='text-center' style={{marginTop:"5.7rem"}}>NewsMonkey - Top {capitaliseFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ''} description={element.description? element.description : ''} 
                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pagesize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>  
    )
}

News.defaultProps = {
  country : 'in',
  pagesize : 8,
  category : 'general'
}

News.propTypes = {
  country : PropTypes.string,
  pagesize : PropTypes.number,
  category : PropTypes.string
}

export default News