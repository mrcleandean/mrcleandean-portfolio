import { useState } from 'react';
import Back from '../components/Back';

export default function Calculator() {
    const w = 2.98 * 7;
    const h = 5.94 * 7;
    const bS = w * 0.8 * 0.25;
    const [eq, setEq] = useState('0');
    const [display, setDisplay] = useState('0');
    return (
        <div>
            <Back zindex={'z-10'} title={'Calculator'} sub={'In Development'} ver={'1.0.0'} />
            <div className='absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center'>
                <div className='bg-black rounded-3xl flex flex-col items-center justify-end' style={{ width: `${w}vw`, height: `${h}vw` }}>
                    <div className='mb-4 h-28 w-full flex justify-end'>
                        <h1 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: `${w / 5}vw` }} className="mr-7 text-white">{display}</h1>
                    </div>
                    <Button
                        buttons={
                            [
                                { bgc: 'bg-gray-300', val: eq === '0' ? 'AC' : 'C' },
                                { bgc: 'bg-gray-300', val: '+/-' },
                                { bgc: 'bg-gray-300', val: '%' },
                                { bgc: 'bg-orange-500', val: '/' }
                            ]
                        }
                        w={bS}
                        setDisplay={setDisplay}
                        display={display}
                        setEq={setEq}
                        eq={eq}
                    />
                    <Button
                        buttons={
                            [
                                { bgc: 'bg-gray-500', val: '1' },
                                { bgc: 'bg-gray-500', val: '2' },
                                { bgc: 'bg-gray-500', val: '3' },
                                { bgc: 'bg-orange-500', val: '+' }
                            ]
                        }
                        w={bS}
                        setDisplay={setDisplay}
                        display={display}
                        setEq={setEq}
                        eq={eq}
                    />
                    <Button
                        buttons={
                            [
                                { bgc: 'bg-gray-500', val: '4' },
                                { bgc: 'bg-gray-500', val: '5' },
                                { bgc: 'bg-gray-500', val: '6' },
                                { bgc: 'bg-orange-500', val: '-' }
                            ]
                        }
                        w={bS}
                        setDisplay={setDisplay}
                        display={display}
                        setEq={setEq}
                        eq={eq}
                    />
                    <Button
                        buttons={
                            [
                                { bgc: 'bg-gray-500', val: '7' },
                                { bgc: 'bg-gray-500', val: '8' },
                                { bgc: 'bg-gray-500', val: '9' },
                                { bgc: 'bg-orange-500', val: 'x' }
                            ]
                        }
                        w={bS}
                        setDisplay={setDisplay}
                        display={display}
                        setEq={setEq}
                        eq={eq}
                    />
                    <Button
                        buttons={
                            [
                                { bgc: 'bg-gray-500', val: '0', f: 2, mb: 2.2 },
                                { bgc: 'bg-gray-500', val: '.', mb: 2.2 },
                                { bgc: 'bg-orange-500', val: '=', mb: 2.2 }
                            ]
                        }
                        w={bS}
                        setDisplay={setDisplay}
                        display={display}
                        setEq={setEq}
                        eq={eq}
                    />
                </div>
            </div>
        </div>
    );
}

function Button(props) {
    return (
        <div className='flex w-full justify-evenly'>
            {props.buttons.map((button, i) => {
                let wf = button.f;
                let mf = button.mb;
                if (!wf) wf = 1;
                if (!mf) mf = 1;
                return (
                    <div
                        key={i}
                        className={`${button.bgc} mb-4 rounded-full text-white flex justify-center items-center`}
                        style={{ width: `${props.w * wf}vw`, height: `${props.w}vw`, marginBottom: `${1 * mf}rem` }}
                        onClick={() => {
                            switch (button.val) {
                                case 'C':
                                case 'AC':
                                    props.setDisplay('0');
                                    props.setEq('0');
                                    return;
                                case '+/-':
                                    return;
                                case '%':

                                    return;
                                case '/':
                                    setOperator(props.display, props.eq, props.setEq, '/');
                                    return;
                                case 'x':
                                    setOperator(props.display, props.eq, props.setEq, 'x');
                                    return;
                                case '-':
                                    setOperator(props.display, props.eq, props.setEq, '-');
                                    return;
                                case '+':
                                    setOperator(props.display, props.eq, props.setEq, '+');
                                    return;
                                case '=':
                                    
                                    return;
                            }
                            if (pendingOperator(props.eq)) props.setDisplay(button.val);
                            else props.setDisplay(prevState => prevState === '0' ? button.val : prevState + button.val);
                        }}
                    >{button.val}</div>
                )
            })}
        </div>
    )
}

function pendingOperator(eq) {
    const last = eq[eq.length - 1];
    return (
        last === '+'
        || last === '-'
        || last === 'x'
        || last === '/'
    )
    
}

function setOperator(disp, eq, setEq, op) {
    if (pendingOperator(eq)) setEq(eq.slice(0, -1) + op);
    else setEq(disp + op);
}