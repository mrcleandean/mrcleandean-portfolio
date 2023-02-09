import { useState } from 'react';
import Back from '../components/Back';
import iphone from '../assets/images/iphone.png';
import { MdSignalCellularAlt } from 'react-icons/md';
import { AiOutlineWifi } from 'react-icons/ai';
import { BsBatteryFull } from 'react-icons/bs';
import { FaDivide, FaTimes, FaMinus, FaPlus, FaEquals, FaPercent } from 'react-icons/fa';
const dems = {
    w: 1170 * 0.325,
    h: 2532 * 0.325,
    buttonSize: 1170 * 0.325 * 0.8 * 0.25
}

const sC = '#9f9f9f'; // special operator colors
const oC = '#f69a06'; // operator colors
const nC = '#313131'; // number colors

class bp { // buttonProps
    constructor(val, bgc, wFactor = 1, mbFactor = 1, size = dems.w * 0.8 * 0.25) {
        this.val = val;
        this.bgc = bgc;
        this.wFactor = wFactor;
        this.mbFactor = mbFactor;
        this.size = size;
    }
}

const buttons = [
    [new bp('AC', sC), new bp('+/-', sC), new bp(<FaPercent />, sC), new bp(<FaDivide />, oC)],
    [new bp(7, nC), new bp(8, nC), new bp(9, nC), new bp(<FaTimes />, oC)],
    [new bp(4, nC), new bp(5, nC), new bp(6, nC), new bp(<FaMinus />, oC)],
    [new bp(1, nC), new bp(2, nC), new bp(3, nC), new bp(<FaPlus />, oC)],
    [new bp(0, nC, 2, 5), new bp('.', nC, 1, 5), new bp(<FaEquals />, oC, 1, 5)]
];

const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
const toExponentialString = (num) => Number.parseFloat(num).toExponential(2).replace(/\+/g, "");
const removeSpaces = (num) => num.toString().replace(/\s/g, "");
const math = (a, b, sign) =>
    sign === "+"
        ? a + b
        : sign === "-"
            ? a - b
            : sign === "X"
                ? a * b
                : a / b;

export default function Calculator() {
    const [calc, setCalc] = useState({
        sign: '',
        num: 0,
        res: 0,
        activeButton: {
            divide: false,
            add: false,
            subtract: false,
            multiply: false
        }
    });

    const clearHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
            activeButton: {
                divide: false,
                add: false,
                subtract: false,
                multiply: false
            }
        });
    }
    const invertHandler = () => {
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
            res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
            sign: ""
        });
    }
    const percentHandler = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) / Math.pow(100, 1) : 0;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) / Math.pow(100, 1) : 0;
        setCalc({
            ...calc,
            num: String(num).length > 9
                ? toExponentialString(num)
                : num,
            res: String(res).length > 9
                ? toExponentialString(res)
                : res,
            sign: ""
        });
    }
    const signHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        });
    }
    const resultHandler = () => {
        if (!calc.sign || !calc.num) return;
        let val = math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), calc.sign);
        setCalc({
            ...calc,
            res: calc.num === '0' && calc.sign === '/'
                ? 'Error'
                : String(val).length > 9
                    ? toExponentialString(val)
                    : toLocaleString(val),
            sign: '',
            num: 0
        });
    }
    const commaHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        setCalc({
            ...calc,
            num: !String(calc.num).includes(".") ? calc.num + value : calc.num,
        });
    }
    const numberHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        if (removeSpaces(calc.num).length < 9) {
            setCalc({
                ...calc,
                num:
                    calc.num === 0 && value === "0"
                        ? "0"
                        : removeSpaces(calc.num) % 1 === 0 && value !== '0'
                            ? toLocaleString(Number(removeSpaces(calc.num + value)))
                            : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
            });
        }
    }
    return (
        <div className='flex justify-center items-center h-full'>
            <Back zindex={'z-30'} title={'Calculator'} sub={'In Development'} ver={'1.0.0'} />
            <div className='relative flex justify-center items-center' style={{ width: `${dems.w}px`, height: `${dems.h}px` }}>
                <img src={iphone} alt="iPhone" className=" w-full h-full z-20 absolute" />
                <div className=' absolute z-10 top-9 left-16 text-white'>1:00</div>
                <div className=' absolute z-10 top-10 right-14 text-white flex'><MdSignalCellularAlt /><AiOutlineWifi style={{ marginRight: '5px', marginLeft: '5px' }} /><BsBatteryFull /></div>
                <div className='bg-white absolute bottom-12 h-1 z-10 rounded-3xl' style={{ width: `${dems.w * (1/3)}px` }}></div>
                <div className='absolute top-[22px] left-[22px] right-[22px] bottom-[22px] bg-slate-900 z-0 flex flex-col justify-end' style={{ borderRadius: '40px' }}>
                    <div className='h-24 w-full flex justify-end'>
                        <h1 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: `${dems.w / 6.5}px` }} className="mr-7 text-white">{calc.num ? calc.num : calc.res}</h1>
                    </div>
                    {buttons.map((row, i) => {
                        return (
                            <Row key={`${i}-row`}>
                                {row.map((button, j) => {
                                    const val = button.val;
                                    return (
                                        <Button key={`${i}${j}-button`}
                                            button={button}
                                            onClick={
                                                val === 'C' || val === 'AC'
                                                    ? clearHandler
                                                    : val === '+/-'
                                                        ? invertHandler
                                                        : val === '%'
                                                            ? percentHandler
                                                            : val === '/' || val === '+' || val === '-' || val === 'X'
                                                                ? signHandler
                                                                : val === '.'
                                                                    ? commaHandler
                                                                    : val === '='
                                                                        ? resultHandler
                                                                        : numberHandler
                                            }
                                        />
                                    )
                                })}
                            </Row>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

const Row = ({ children }) => <div className='flex justify-evenly w-full text-white'>{children}</div>;

const Button = ({ button, onClick }) => {
    const { val, bgc, wFactor, mbFactor, size } = button;
    return (
        <div
            className={`rounded-full flex justify-center items-center`}
            style={{ width: `${size * wFactor}px`, height: `${size}px`, marginBottom: `${1 * mbFactor}rem`, backgroundColor: bgc }}
            onClick={onClick}
        >{val}</div>
    )
}