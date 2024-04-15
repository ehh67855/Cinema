

export default function UserInputField(props) {
    return (
        <>
            <label>{props.label}</label>
            <input id={props.id} name={props.name} type={props.type}/>
        </>
    );
}