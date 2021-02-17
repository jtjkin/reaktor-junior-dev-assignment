import './LoadingIcon.css'

import {useState, useEffect} from 'react'
import {useSpring, animated} from 'react-spring'

const LoadingIcon = () => {
    const [one, setOne] = useState(false)
    const [two, setTwo] = useState(false)

    useEffect(() => {
        const intervalOne = setInterval(() => {
            setOne(one => !one)
        }, 800)

        const timeoutTwo = setTimeout(() => {
            const intervalTwo = setInterval(() => {
                setTwo(two => !two)
            }, 800)

            return () => clearInterval(intervalTwo)
        }, 800);

        return () => {
            clearInterval(intervalOne)
            clearTimeout(timeoutTwo)
        }

    }, [])

    const animOne = useSpring(
        {
            transform: one ? 'scale(1.2)' : 'scale(0.9)',
            config: {
                tension: 300,
                friction: 5,
            }
        }
    )
    const animTwo = useSpring(
        {
            transform: two ? 'scale(1.2)' : 'scale(0.9)',
            config: {
                tension: 300,
                friction: 5,
            }
        }
    )

    return(
        <div className='spring-container'>
            <animated.div style={animOne} className='spring-ball'/>
            <animated.div style={animTwo} className='spring-ball'/>
            <animated.div style={animOne} className='spring-ball'/>
        </div>
    )
}

export default LoadingIcon