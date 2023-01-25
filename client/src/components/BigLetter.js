export default function BigLetter(props) {
    return (
        <span className={`text-5xl ${props.l === ' ' ? 'block w-3' : 'inline'} hover:text-blue-300 hover:text-6xl transition-all`}>
            {props.l}
        </span>
    )
}