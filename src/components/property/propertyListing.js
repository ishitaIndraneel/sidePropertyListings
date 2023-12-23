import { useCallback, useEffect, useState } from "react"
import simplyRetsService from "../../simplyretsservice"
import { Grid } from "@mui/material"
import  { NavData } from '../../App'
import './styles.css'
import heartFill from '../../assets/heart-fill.svg'
import heartStroke from '../../assets/heart-stroke.svg';


const PropertyListing = () => {
    const [listings, setListings] = useState([])
    const [isFavArr, setIsFavArr] = useState([])
    const {setPageName} = NavData()

    const getData = useCallback(async()=> {
        const favListings =  JSON.parse(localStorage.getItem('favListing'))
        const res = await simplyRetsService("https://api.simplyrets.com/properties")
        localStorage.setItem("listings", JSON.stringify(res))
        setListings(res)
        if(favListings.length === 0) {
            let favArr = []
            res.forEach((r)=>{
                favArr.push({
                    id: r.mlsId,
                    isFav: false
                })        
            })
            setIsFavArr(favArr)
            localStorage.setItem("favListing", JSON.stringify(favArr))
        }
        else {
            setIsFavArr(JSON.parse(localStorage.getItem("favListing")))
        }
    },[])

    useEffect(()=>{
        setPageName("Property Listings")
       getData()
       return ()=>{
        setPageName("")
       }
    },[setPageName,getData])

    const getFormattedPrice = (price) => {
       return Intl.NumberFormat("en-US",{maximumFractionDigits: 0}).format(price)
    }

    const getListingDate = (listDate) => {
        
        return new Date(listDate).toLocaleString('en-US').split(',')[0]
    }

    const storeFav = (listingId) => {
        let favArr = [...isFavArr]
        favArr.filter((element)=> element.id === listingId)[0].isFav = !favArr.filter((element)=> element.id === listingId)[0].isFav
        setIsFavArr(favArr)
        localStorage.setItem("favListing", JSON.stringify(favArr))
    }

    const isListingFav = (listingId) => {
        return isFavArr.filter((element)=> element.id === listingId)[0].isFav
    }
    return (
        <>
        <Grid container className="container" rowSpacing={3} >

                   
                    {
                        listings.map((listing)=>{
                        return (
                            <Grid className="alignImage" item key={listing.mlsId} sm={12} xl={4} lg={4} md={5}>

                                   <div className="property_details_container" >
                                        <img className="property_pics" src={listing.photos[0]}  alt="listing" />
                                        <div onClick={()=>storeFav(listing.mlsId)}className="heart_icon">
                                            {
                                                isListingFav(listing.mlsId) ? 
                                                <img src={heartFill}  alt="favorite icon" />
                                                :
                                                <img src={heartStroke}  alt="unfavorite icon" />
                                            }
                                        </div>
                            
                                        <div className="bed_bath">
                                            <span>{listing.property.bedrooms} BR | </span>
                                            <span>{`${listing.property.bathsFull}${listing.property.bathsHalf > 0 ? '.5': ''}`} BR | </span>
                                            <span>{listing.property.area} Sq Ft</span>
                                        </div>
                                        <div className="home_price">${getFormattedPrice(listing.listPrice)}</div>
                                        <div className="address">{listing.address.streetNumber} {listing.address.streetName}, {listing.address.city}, {listing.address.state}</div>
                                        <div className="date">{getListingDate(listing.listDate)}</div>
                                    </div>
                                  

                            </Grid>
                        )
                        })
                    }
                    
               

        </Grid>
        </>
        
    )
}
export default PropertyListing