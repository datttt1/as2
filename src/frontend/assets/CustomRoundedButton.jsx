const CustonRoundedButton = ({ text, width, height, onClick, isFilled }) => {
    const numericHeight = typeof height === "string" && height.endsWith("px") ? parseInt(height) : 40;

    // Tính fontSize tỉ lệ với chiều cao (ví dụ 50% của height)
    const fontSize = numericHeight * 0.6; // 0.5 là tỉ lệ bạn muốn
    return (
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
                fontSize: `${fontSize}px`
            }}
            onClick={onClick}>
            {text}
        </button>
    )

}
export default CustonRoundedButton;