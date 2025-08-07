function LongSection(){
    const items = []

    for(let i=0; i<=100; i++){
        items.push(<p>Items number {i} KEEP GOING </p>)
    }

    return (
        <>
            <div>
                {items}
            </div>
        </>
    )
}

export default LongSection