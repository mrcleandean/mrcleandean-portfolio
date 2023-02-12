import { useState, useCallback } from 'react';
import Back from '../components/Back';
import iphone from '../assets/images/iphone.png';
import { MdSignalCellularAlt } from 'react-icons/md';
import { AiOutlineWifi } from 'react-icons/ai';
import { BsBatteryFull } from 'react-icons/bs';
import { FaDivide, FaTimes, FaMinus, FaPlus, FaEquals, FaPercent } from 'react-icons/fa';
import { BsSlashLg } from 'react-icons/bs';
import Particles from "react-tsparticles";
import { loadSeaAnemonePreset } from "tsparticles-preset-sea-anemone";

// CALCULATOR DEMS AND BUTTON SIZE
const dems = {
    w: 1170 * 0.325,
    h: 2532 * 0.325,
    buttonSize: 1170 * 0.325 * 0.8 * 0.25
}
// CALCULATOR DEMS AND BUTTON SIZE

// BUTTON SIZING AND COLORS
const iS = { width: '28px', height: '28px' }; // icon size
const sC = '#9f9f9f'; // special operator colors
const oC = '#f69a06'; // operator colors
const nC = '#313131'; // number colors
// BUTTON SIZING AND COLORS

// BUTTON PROPS
class bp { // buttonProps
    constructor(disp, val, bgc, wFactor = 1, mbFactor = 1, size = dems.w * 0.8 * 0.25) {
        this.disp = disp;
        this.val = val;
        this.bgc = bgc;
        this.wFactor = wFactor;
        this.mbFactor = mbFactor;
        this.size = size;
    }
}
// BUTTON PROPS

// HELPER COMPONENTS
const Row = ({ children }) => <div className='flex justify-evenly w-full text-white'>{children}</div>;
const Button = ({ button, active, onClick }) => {
    const { disp, val, bgc, wFactor, mbFactor, size } = button;
    const activeCol = '#f5f5f5';
    return (
        <div
            className='rounded-full flex justify-center items-center cursor-pointer'
            style={{ width: `${size * wFactor}px`, height: `${size}px`, marginBottom: `${1 * mbFactor}rem`, backgroundColor: active ? activeCol : bgc, color: active ? bgc : null }}
            onClick={() => onClick(val)}
        >{disp}</div>
    )
}
const PlusOrMinus = () => {
    const pOrMS = { width: '13px', height: '13px', color: 'black' }; // plus or minus style
    return (
        <div className='relative'>
            <FaPlus className="absolute bottom-3 right-4" style={pOrMS} />
            <BsSlashLg className='-rotate-12' style={{ width: '21px', height: '21px', color: 'black' }} />
            <FaMinus className='absolute top-3 left-4' style={pOrMS} />
        </div>
    )
}
const TextOrNum = ({ v, col }) => {
    return (
        <p className='text-3xl font-semibold' style={{ color: col }}>{v}</p>
    )
}
// HELPER COMPONENTS

// BUTTONS FOR RENDERING
const buttons = [
    [
        new bp(<TextOrNum v='AC' col='black' />, 'AC', sC),
        new bp(<PlusOrMinus />, '+/-', sC),
        new bp(<FaPercent style={{ ...iS, color: 'black' }} />, '%', sC),
        new bp(<FaDivide style={iS} />, '/', oC)
    ],
    [
        new bp(<TextOrNum v={7} col='white' />, 7, nC),
        new bp(<TextOrNum v={8} col='white' />, 8, nC),
        new bp(<TextOrNum v={9} col='white' />, 9, nC),
        new bp(<FaTimes style={iS} />, 'X', oC)
    ],
    [
        new bp(<TextOrNum v={4} col='white' />, 4, nC),
        new bp(<TextOrNum v={5} col='white' />, 5, nC),
        new bp(<TextOrNum v={6} col='white' />, 6, nC),
        new bp(<FaMinus style={iS} />, '-', oC)
    ],
    [
        new bp(<TextOrNum v={1} col='white' />, 1, nC),
        new bp(<TextOrNum v={2} col='white' />, 2, nC),
        new bp(<TextOrNum v={3} col='white' />, 3, nC),
        new bp(<FaPlus style={iS} />, '+', oC)
    ],
    [
        new bp(<TextOrNum v={0} col='white' />, 0, nC, 2, 5),
        new bp(<TextOrNum v='.' col='white' />, '.', nC, 1, 5),
        new bp(<FaEquals style={iS} />, '=', oC, 1, 5)
    ]
];
// BUTTONS FOR RENDERING

// HELPER FUNCTIONS
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

// MAIN COMPONENT
export default function Calculator() {
    const particlesInit = useCallback(async instance => {
        await loadSeaAnemonePreset(instance);
    }, []);
    // STATE
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
    // STATE

    // HANDLERS
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
            sign: "",
            activeButton: {
                divide: false,
                add: false,
                subtract: false,
                multiply: false
            }
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
            sign: "",
            activeButton: {
                divide: false,
                add: false,
                subtract: false,
                multiply: false
            }
        });
    }
    const signHandler = (val) => {
        const value = val;
        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
            activeButton: {
                divide: val === '/' ? true : false,
                add: val === '+' ? true : false,
                subtract: val === '-' ? true : false,
                multiply: val === 'X' ? true : false
            }
        });
    }
    const resultHandler = () => {
        if (!calc.sign || !calc.num) return;
        let val = math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), calc.sign);
        setCalc({
            ...calc,
            res: calc.res === 'Error' || (Number(calc.num) === 0 && calc.sign === '/')
                ? 'Error'
                : String(val).length > 9
                    ? toExponentialString(val)
                    : toLocaleString(val),
            sign: '',
            num: 0,
            activeButton: {
                divide: false,
                add: false,
                subtract: false,
                multiply: false
            }
        });
    }
    const commaHandler = (val) => {
        const value = val;
        setCalc({
            ...calc,
            num: !String(calc.num).includes(".") ? calc.num + value : calc.num,
            activeButton: {
                divide: false,
                add: false,
                subtract: false,
                multiply: false
            }
        });
    }
    const numberHandler = (val) => {
        const value = String(val);
        if (removeSpaces(calc.num).length < 9) {
            setCalc({
                ...calc,
                num:
                    calc.num === 0 && value === "0"
                        ? 0
                        : removeSpaces(calc.num) % 1 === 0 && value !== '0'
                            ? toLocaleString(Number(removeSpaces(calc.num + value)))
                            : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
                activeButton: {
                    divide: false,
                    add: false,
                    subtract: false,
                    multiply: false
                }
            });
        }
    }
    // HANDLERS

    // RENDERING
    return (
        <div className='flex justify-center items-center h-full'>
            <Particles
                init={particlesInit}
                options={{
                    preset: "seaAnemone",
                }}
            />
            <Back zindex={'z-30'} title={'Calculator'} sub={'In Development'} ver={'1.0.0'} />
            <div className='relative flex justify-center items-center' style={{ width: `${dems.w}px`, height: `${dems.h}px` }}>
                <img src={iphone} alt="iPhone" className=" w-full h-full z-20 absolute pointer-events-none" />
                <div className=' absolute z-10 top-9 left-16 text-white'>1:00</div>
                <div className=' absolute z-10 top-10 right-14 text-white flex'><MdSignalCellularAlt /><AiOutlineWifi style={{ marginRight: '5px', marginLeft: '5px' }} /><BsBatteryFull /></div>
                <div className='bg-white absolute bottom-12 h-1 z-10 rounded-3xl' style={{ width: `${dems.w * (1 / 3)}px` }}></div>
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
                                            active={
                                                val === '/'
                                                    ? calc.activeButton.divide
                                                    : val === '+'
                                                        ? calc.activeButton.add
                                                        : val === '-'
                                                            ? calc.activeButton.subtract
                                                            : val === 'X'
                                                                ? calc.activeButton.multiply
                                                                : null
                                            }
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
    // RENDERING
}
// MAIN COMPONENT