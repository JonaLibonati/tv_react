import React, { useEffect, useRef, useState } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { channels } from '../../data/channels';

export const Channel = () => {

  const handle = useFullScreenHandle();

  const divFrame = useRef(false);

  const diva = useRef(false);
  const logo = useRef(false);

  const fullScreen = useRef(false);

  const i = useRef(0);
  const [channel, setChannel] = useState(channels[0])

  const handleKey = (e) => {


    console.log(e.key)

    if (e.key == 'l' || e.key == 'L') {
      if (fullScreen.current ) {
        handle.exit()
        fullScreen.current = false
      } else {
        handle.enter()
        fullScreen.current = true
      }
    }

    if (e.key == 'ArrowUp' ) {
      i.current = i.current + 1;

      if (i.current < channels.length) {
        setChannel(channels[i.current])
      } else {
        i.current = 0;
        setChannel(channels[0])
      }
    }

    if (e.key == 'ArrowDown' ) {
      i.current = i.current - 1;

      if (i.current >= 0) {
        setChannel(channels[i.current])
      } else {
        i.current = channels.length - 1;
        setChannel(channels[i.current])
      }
    }
  }

  useEffect(() => {
    divFrame.current.addEventListener("keydown", handleKey);

    setTimeout(() => {logo.current.style.opacity = 0}, 1000)

    setInterval ( () => {
      divFrame.current.focus()
    }, 1000)

    return () => divFrame.current.addEventListener("keydown", handleKey);
  }, [])

  useEffect(() => {
    logo.current.style.opacity = 1

    setTimeout(() => {logo.current.style.opacity = 0}, 2000)


  }, [channel])

  return (
    <>
        <FullScreen handle={handle} >
          <div ref={divFrame} tabIndex={-1} className='pointer-events-none'>
            <img ref={logo} className='absolute h-[200px] m-9 transition-opacity duration-[2s]' src={channel.images} />
            <iframe ref={diva} className='h-dvh' allow="encrypted-media" width="100%" height="100%" allowFullScreen src={channel.url}></iframe>
          </div>
        </FullScreen>
    </>
  )
}
