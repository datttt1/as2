const CustonRoundedButton = ({text,width,height,onClick,isFilled}) =>{
    return(
        <button
            style={{
                width: `${width}`,
                height: `${height}`,
                borderRadius: "6px",
                cursor: "pointer",
                border: isFilled ? "none" : "2px solid black",
                backgroundColor: isFilled ? "black" : "transparent",
                color: isFilled ? "white" : "black",
                fontWeight: "bold",
                fontSize: "medium"
            }}
            onClick={onClick}>
        {text}
        </button>
    )

}
export default CustonRoundedButton;