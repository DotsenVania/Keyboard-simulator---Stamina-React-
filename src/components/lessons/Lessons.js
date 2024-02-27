import Main from "../main";
import lessonsData from '../lesson.json'; 
import {useState, useEffect} from 'react'; 
import './lessons.scss'
function Lessons (props) {
    const [lessonsActive, setLessonsActive] = useState(false);
    const [st, setSt] = useState(''); 
    useEffect(() => {
        console.log(st)
    }, [st])

    function str (s) {
        setSt(s)
    }

    function lessonsActiveToggle () {
        setLessonsActive(state => !state)
    }

    return (
        <div className="all-wrapper">
            <div className={lessonsActive ? "section1 active": 'section1'}>
                <LessonsList lessonsActiveToggle={lessonsActiveToggle} st={str}/>
            </div>
            <div className={lessonsActive ? "section2 active": 'section2'}>
                <Main lessonsActiveToggle={lessonsActiveToggle} str={st}/>
            </div>
        
        </div>
    )
}


function LessonsList (props) {
    const [str, setStr] = useState(''); 
    const [lessonsArr, setLessonsArr] = useState(lessonsData)

    useEffect(() => {
        props.st(str)
    }, [str])

    function clickSetStr (e, str) {
        try {
            props.lessonsActiveToggle()
            setStr(str)
        } catch (error) {
            
        }
       
    }

    const contentEng = () => {
       const res =  lessonsData.lessonsEng.map((el) => {
            return (
                <>
                    <div onClick={(e) => clickSetStr(e, {text: el.text, name: el.name, id: el.id, leng: 'eng'})} className="lesson" key={el.id}>
                        <div className="name">{el.name}</div>
                    </div>
                </>
            )
        })
        return res;
    }
    const contentUkr = () => {
        const res = lessonsData.lessonsUkr.map((el) => {
            return (
                <>
                    <div onClick={(e) => clickSetStr(e, {text: el.text, name: el.name, id: el.id, leng: 'ukr'})} className="lesson" key={el.id}>
                        <div className="name">{el.name}</div>
                    </div>
                </>
            )
        })
        return res;
    }

    return (
        <div className="button__wrapper">
            <h1 className="title">STAMINA</h1>
            <div className="list__lessons">
                <div className="ukr">
                    <div className="lis__title">Українська</div>                                        
                    {contentUkr()}
                </div>
                <div className="eng">
                    <div className="lis__title">Англійська</div>                        
                    {contentEng()}
                </div>
            </div>
            
        </div>
    )
}

export default Lessons;
