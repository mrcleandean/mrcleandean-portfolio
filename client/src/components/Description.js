import { useEffect } from "react"

export default function Description(props) {
    useEffect(() => {
        console.log(props.description);
    }, [props.description]);
    return (
        <div>

        </div>
    )
}