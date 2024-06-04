import React from 'react'

const NewItem=(props)=>{
    let{title,desc,imgUrl,newsUrl,author,date,source}=props;
    return (
      <div className=' my-3'>
        <div className="card">
        <span className='badge rounded-pill bg-danger' style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:'0'}}>{source}</span>
            <img src={imgUrl?imgUrl:"https://media.assettype.com/sentinelassam-english%2F2024-06%2F996269a3-a78e-4c34-a2c6-26bf734c2913%2Frealme_gt_neo_6_1715245450576.webp?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100"} className="card-img-top" alt="Not Found" />
            <div className="card-body">
                <h5 className="card-title">{title}{"..."}</h5>
                <p className="card-text">{desc}{"..."}</p>
                <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target='_black' className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    )
}

export default NewItem