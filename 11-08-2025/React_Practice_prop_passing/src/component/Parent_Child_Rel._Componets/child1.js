import react from 'react'


const Child1 = ({backgroundColor})=>{
    console.log(`Inside child1 props value ${backgroundColor}`)
    let color = backgroundColor;
    return(<>
        <div style={{width:"20px", height:"20px", backgroundColor:`${color}`}}>
            A
        </div>
    </>)
}

export default Child1