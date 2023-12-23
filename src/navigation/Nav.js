
import './styles.css'
import Sticky from '../components/sticky';
import { Grid } from "@mui/material"
import  { NavData } from '../App'
import { Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';


const Nav = () => {
  const {pageName, setPageName} = NavData()
    useEffect(()=>{
      setPageName("Property Listings")
    },[setPageName])
    return (
          <>
           <Grid container className='navigationBar'>
              <Grid item md={12} lg={12}>
                <Sticky top={60} background="navBackColor">
                  <Grid container>
                    <Grid item lg={12} md={12}>
                      <h3 className='menu_items'><Link to="/properties" >{pageName !== "" ? pageName : "Property Listings" }</Link></h3>
                    </Grid>
                  </Grid>
                </Sticky>
              </Grid>
            </Grid>
        <Outlet/>
          </>

    )
}
export default Nav