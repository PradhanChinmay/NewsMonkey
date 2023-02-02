import React from 'react'

const NewsItem = (props) => {
    
    let {title, description, imageUrl, newsUrl, author, date, source} = props; //this is called array destructuring, meaning it will find out title and
    //description from the array and assign it to the variables.

    // let myStyle = {
    //   width : '18rem'
    // }
    return (
      <div  className='my-3'>
        <div className="card">
          <div style={{display : 'flex', justifyContent : 'flexEnd', position : 'absolute', right : '0'}}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={!imageUrl? "https://profile.usatoday.com/newsletters/resources/usat/property/usatoday/newsletter-thumbs/8872UT-E-NLETTER02@2x.jpg" : imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {(!author) ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem