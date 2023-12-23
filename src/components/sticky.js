import { useCallback, useEffect, useRef, useState } from "react"
import './styles.css'


const Sticky = (props) => {
    const [sticky, setSticky] = useState(false)
    const ref = useRef(null)
    const handleScroll = useCallback(() => {
        if(ref && ref.current && ref.current.getBoundingClientRect()){
            setSticky(ref.current.getBoundingClientRect().top <=props.top)
        }
    },[props.top])
    useEffect(()=>{
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", () => handleScroll)
        }
    },[handleScroll])
    return (
            <div className={`sticky__wrapper ${sticky && 'sticky'}`} ref={ref}>
                <div className={`sticky--inner ${props.background}`}>
                    {props.children}
                </div>
            </div>
    )
}
export default Sticky