import { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function Timer ({timer, complete}) {
    // useEffect(()=>{
    //     console.log(timer);
    // },[timer]);
    return (
        <CountdownCircleTimer
              isPlaying
              size={40}
              strokeWidth={2}
              duration={timer}
              initialRemainingTime={timer}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
            //   onComplete={() => {complete();  }}}
            >
              {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
    ); 
}