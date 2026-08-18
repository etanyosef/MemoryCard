import './spinner.css'

export default function Spinner() {
    return (
        <>
            <div className='spinner'>
                <span className="pokeball"></span>
                <h2 className='loading'>Loading...</h2>
            </div>
        </>
    )
}