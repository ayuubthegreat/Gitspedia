
export const Grid = ({gridWidth = "1fr", children}) => {
    return (
        <>
        <div className="grid">
            {children}
        </div>
        </>
    )
}