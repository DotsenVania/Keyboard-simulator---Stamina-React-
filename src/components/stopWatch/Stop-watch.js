import { useState, useEffect, useCallback } from 'react';

import './stop-watch.scss'; 

function StopWatch (props) {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [int, setInt] = useState();
    const [trueKeystroke, setTrueKeystroke] = useState(0) //Підрахунок всіх вірних натискань
    const [counterSecond, setCounterSecond] = useState(0) 
    const [speedResult, setSpeedResult] = useState(0)
    

    

let hours = hour,
minutes = minute,
seconds = second,
interval;

useEffect(() => {
    nullTimer()
}, [props.nullSecond])

useEffect(() => {
    setTrueKeystroke(props.arrSpanNum)
    result ()
}, [props.arrSpanNum])

function nullTimer () {
    if (props.nullSecond) {
        clearInterval(int);
        setSecond(state => 0);
        setMinute(state => 0);
        setHour(state => 0);
        setCounterSecond(state => 0);
    }
}


function intervalTotal() {
    interval = setInterval(() => {
        startTimer()
    }, 1000);
    setInt(interval)

}
function clearInt() {
    clearInterval(int)
}

function getSpeed() {
    let sum = counterSecond / trueKeystroke; 
    console.log(trueKeystroke)

    return sum
}

useEffect(() => {
    setSpeedResult(60 / getSpeed())
}, [props.arrSpanNum])



function startTimer() { 
    getSpeed()
    setCounterSecond(state => state + 1)
    seconds++
    setSecond(seconds)
    setMinute(minutes)
    setHour(hours)
    //Second 
    if(seconds >= 59) {
        minutes++;
        seconds = -1; 
    }
    //Minutes
    if(minutes >= 60) {
        hours++;
        minutes = 0; 
    }
     //Hours 
    if(hours >= 24) {
        hours = 0
    }
}
   

   
    
   
    useEffect(()=> {
         if(props.focusActive) {
            intervalTotal()
         }else {
            clearInt ()
         }
        
    }, [props.focusActive]);


    
   function result () {
        if(props.arrSpanNum === props.strSum ) {
            // nullTimer()
            // clearInterval(int)
            // return (
            //     <div className='result'>
            //         <h2 className='result__title'>Ваш результат</h2>
            //         <div className="result__wrapper">
            //             <div className="result__time"> <span>Час</span> - {`${hour} : ${minute} : ${second}`}</div>
            //             <div className="result__speed"><span>Швидкість</span> - {Math.trunc(speedResult)}</div>
            //             <div className="result__error"><span>Помилки</span> - {props.err} </div>
            //         </div>
            //         <button onClick={props.back}>Back home</button>
            //     </div>
            // )

            const obj = {
                hour,
                minute,
                second,
                speed: Math.trunc(speedResult)
            }
            props.resultLesssons(obj)
        }
    }

//    console.log(props.strSum)
    

    return (
        <div className='stop-watch'>
            <div onClick={intervalTotal} className="wrapper">
                <div className="timer">
                    <div className="timer__block">
                        <div className="time hour">{hour <= 9 ? '0' + hour : hour }</div>
                        <span> : </span>
                        <div className="time minute">{minute <= 9 ? '0' + minute : minute }</div>
                        <span> : </span>
                        <div className="time second">{second <= 9 ? '0' + second : second }</div>
                    </div>
                    <div className="err">Err: {props.err}</div>
                    <div className="speed">Speed : {trueKeystroke == 0 ? 0 : Math.trunc(speedResult) } s/m</div>
                    <div className="descr">Для "ПАУЗИ" натисніть будь якому місці екрану</div>
                </div>
            </div>
        </div>
    )
};

export default StopWatch; 