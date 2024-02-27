import './main.scss'; 
import lessonsData from './lesson.json'; 
import data from './data.json'; 
import { useState, useEffect, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import StopWatch from './stopWatch/Stop-watch';
import btnBack from './back.svg'; 
import btnNextAndPrev from './right-arrow.png';
import * as action from '../actions/actions.js'; 

const Main = (props) => {

    const {test} = useSelector(state => state)
    const dispatch = useDispatch(); 

    const [str, setStr] = useState(data[0].str.split('')); // Містить головне речення яке потрібно ввести...
    const [str2, setStr2] = useState(data[0].str.split('')); // Містить головне речення яке потрібно ввести...
    const [arrSpanNum, setArrSpanNum] = useState(0); // Лічильник букв по порядку 
    const [sumWidth, setSumWidth] = useState(0); // Лічильник відстанні загального зрушення тексту
    const [sumWidth2, setSumWidth2] = useState(0); // Лічильник відстанні загального зрушення тексту загальний
    const [err, setErr] = useState(0); // Лічильник помилок
    const [errStyle, setErrStyle] = useState({}) // Стилі для оформлення помилки
    const [focusActive, setFocusActive] = useState(false) // Старт або пауза процесу залежить від фокусу поля вводу...
    const [changeTextarea, setChangeTextarea] = useState('') // Текст вводу в - <textarea>...
    const [nullSecond, setNullSecond] = useState(false)
    const [progres, setProgres] = useState(0)
    const [res, setRes] = useState(0)//Ширина прогрес бару...
    const [lessonId, setLessonId] = useState(1)//Ширина прогрес бару...
    const [resultObj, setResultObj] = useState({})//Результат уроку

    const myRef = useRef();
    useEffect(() => {
        resetColor()
    },[focusActive]); 
    
    useEffect(() => {
        console.log(resultObj)
    }, {resultObj})

    useEffect(() => {
        if(props.str.length !== 0) {
            setStr(props.str.text.split(''))
            setStr2(props.str.text.split(''))
            setLessonId(props.str.id)
        }
    }, [props.str])
          
    function next () {
        if(props.str.leng === 'eng') {
            lessonsData.lessonsEng.map(el => { 
                if(lessonId + 1 === el.id) {
                    setStr(state => el.text.split(''))
                    setStr2(state => el.text.split(''))
                    setLessonId(state => state + 1)
                    reset()
                }
            })
        }else {
            lessonsData.lessonsUkr.map(el => { 
                if(lessonId + 1 === el.id) {
                    setStr(state => el.text.split(''))
                    setStr2(state => el.text.split(''))
                    setLessonId(state => state + 1)
                    reset()
                }
            })
        }
        
    }
    function prev () {
        if(props.str.leng === 'eng') {
            lessonsData.lessonsEng.map(el => { 
                if(lessonId - 1 === el.id) {
                    setStr(state => el.text.split(''))
                    setStr2(state => el.text.split(''))
                    setLessonId(state => state - 1)
                    reset()
                }
            })       }else {
            lessonsData.lessonsUkr.map(el => { 
                if(lessonId - 1 === el.id) {
                    setStr(state => el.text.split(''))
                    setStr2(state => el.text.split(''))
                    setLessonId(state => state - 1)
                    reset()
                }
            })
        }
        
    }

    function progresBar () {
        const sumString = str.length; 

        setProgres(100 / sumString); 

    }

    useEffect(() => {
        addWordsAndSpace()
        progresBar()

    }, [str]); 

    useEffect(() => {
        if(arrSpanNum === str.length) {
            setFocusActive(false)
            myRef.current.blur()
        }
        if(arrSpanNum < str.length) {
            resetColor()
        }
    }, [arrSpanNum]); 

    useEffect(() => {
        console.log(resultObj)
    }, [resultObj])

    function focusBox (e) {
        e.target.focus(); 
        if(e.target) {
            e.target.focus(); 
            setFocusActive(true)
        }
    } 

    function getSize() {
        const span = document.querySelectorAll('.wrapper__words > span');
        const widthSpan = getComputedStyle(span[arrSpanNum]).inlineSize; 
        setArrSpanNum((state => state + 1))
        setSumWidth(state => state + +widthSpan.replace(/px/, '')) 
    }
    function getSize2() {
        const spann = document.querySelectorAll('.view__lessons > span');
        setSumWidth2(spann[arrSpanNum].getBoundingClientRect())
        if(getComputedStyle(spann[arrSpanNum]).color !== 'rgb(255, 0, 0)') {
            spann[arrSpanNum].style.color = 'rgb(79, 182, 0)';
        }
    }

    function resetColor() {
        try {
            const spann = document.querySelectorAll('.view__lessons > span');
            setSumWidth2(spann[arrSpanNum].getBoundingClientRect())
            if(arrSpanNum == 0) {
                spann.forEach(element => {
                    element.style.color = 'white'
                    element.style.borderBottom = 'none'
                });
            }; 
            
        } catch (error) {
            console.log(error   )
        }
        
    }


    function addWordsAndSpace ()  {
        const spans = str.map((elem, i ) => {
        const styles = elem === " " ? {width: '20px'}: null;
            return (
                <span style={styles} key={i}>{elem}</span>
                )
        })
        return spans; 
    }
    function addWordsAndSpace2 ()  {
        const spans = str2.map((elem, i ) => {
        const styles = elem === " " ? {width: '10px'}: null;
            return (
                <span style={styles} key={i}>{elem}</span>
                )
        })
        return spans; 
    }

    function checkPressing(e) {
        setNullSecond(false)
        if(e.key === str[arrSpanNum]) {
            setRes(state => state + progres);
            getSize()
            getSize2()
        } else {
            if(e.key !== 'Shift' && e.key !== 'Alt' && e.key !== 'Control') {
                const spann = document.querySelectorAll('.view__lessons > span');
                setErr(state => state + 1)
                if (spann[arrSpanNum].textContent === " " ) {
                    spann[arrSpanNum].style.borderBottom = 'solid 2px red'; 
                    spann[arrSpanNum].style.top = '3px'; 
                } else {
                    spann[arrSpanNum].style.color = 'red';
                } 
                
                setErrStyle({borderTop: '5px solid red',  borderBottom: '5px solid red'})
            
                setTimeout(() => {
                    setErrStyle({})
                }, 100)
            }
        }
    }

    function allBack () {
        back();
        reset();
    }

    function reset() {
        setArrSpanNum(0)
        setSumWidth(0)
        setErr(0)
        setNullSecond(true)
        setRes(0)
    }

    function onChangeTextarea(e) {
        setChangeTextarea(e.target.value)
    }

    function setString (e) {
        e.preventDefault()
        setStr(changeTextarea.split(''))
        reset()
    }

    function back () {
        props.lessonsActiveToggle()
    }

    const spanElem = addWordsAndSpace();
    const spanElem2 = addWordsAndSpace2();
    const stylesPosition = {
        position: 'absolute',
        top: sumWidth2.top + 3 ,
        left: arrSpanNum === str.length ? sumWidth2.left + sumWidth2.width : sumWidth2.left
    } 
   
    function resultLesssons (objResult) {
        setResultObj(objResult)
    }

    function resultAll() {
        if(arrSpanNum === str.length) {
            const {hour, minute, second, speed} = resultObj; 
            return (
                <div className='result'>
                    <h2 className='result__title'>Ваш результат</h2>
                    <div className="result__wrapper">
                        <div className="result__time"> <span>Час</span> - {`${hour} : ${minute} : ${second}`}</div>
                        <div className="result__speed"><span>Швидкість</span> - {Math.trunc(speed)}</div>
                        <div className="result__error"><span>Помилки</span> - {err} </div>
                    </div>
                    <div className="buttons">
                        <div className='btn prev' onClick={() => prev()}>
                            <img src={btnNextAndPrev} alt="prev" className="btn__img prev" />
                        </div>
                        <button className="buttons__back" onClick={allBack}>Back home</button>
                        <div className='btn' onClick={() => next()}>
                            <img src={btnNextAndPrev} alt="next" className="btn__img" />
                        </div>
                    </div>
                    
                    <button className='close' onClick={() => setArrSpanNum(state=> state - 1)}>&#10006;</button>
                </div>
            )
        }
    }
    
    return (
        <>
            <div style={stylesPosition} className="line"></div>
            <img src={btnBack} onClick={() => {allBack()}} alt="back" className="back" />
            <h1 className="title">{props.str.leng === 'eng' ? lessonsData.lessonsEng[lessonId - 1].name : lessonsData.lessonsUkr[lessonId > lessonsData.lessonsUkr.length ? lessonsData.lessonsUkr.length - 1  : lessonId - 1 ].name}</h1>
                {/* <div className="form_wrapper">
                    <form action="#">
                        <div className="form__title">Введіть текст</div>
                        <textarea value={changeTextarea} onChange={(e) => onChangeTextarea(e)} name="text" id="text" cols="50" rows="5"></textarea>
                        <button onClick={setString}>Go</button>
                    </form>
                </div> */}
            <div className="lessons-title">Загальний огляд завдання</div>
            <div className="wrapper__view-lesson">
                <div className="view__lessons">{spanElem2}</div>
            </div>
            


            <StopWatch resultLesssons={resultLesssons} back={allBack} reset={(boolean) => setFocusActive(boolean)} strSum={str.length} arrSpanNum={arrSpanNum} nullSecond={nullSecond}  err={err} focusActive={focusActive}/>
            <div className="box" onBlur={() => setFocusActive(false) } style={errStyle} ref={myRef} onKeyDown={checkPressing} onClick={focusBox} tabIndex={1} > 
                <span className={focusActive ?'info-status': 'info-status active'}>{arrSpanNum > 0 ? 'PAUSE/PLAY':  'START'}</span>
                <div className="progres-top" style={{width: res + "%"}}></div>
                <div className="progres-bottom" style={{width: res + "%"}}></div>
                <div  className={focusActive ? 'wrapper' : 'wrapper active' }>
                    <div style={{left: -sumWidth + 'px'}}  className="wrapper__words active">
                        {spanElem}
                    </div>
                </div>
            </div>
            <div className="buttons">
                <div className='btn prev' onClick={() => prev()}>
                    <img src={btnNextAndPrev} alt="prev" className="btn__img prev" />
                </div>
                <button onClick={reset} className='buttons__stop'>Stop</button>
                <div className='btn' onClick={() => next()}>
                    <img src={btnNextAndPrev} alt="next" className="btn__img" />
                </div>
            </div>
            {resultAll()}
            <button>{test}</button>
        </>
        
    )
}
export default Main; 