const Form = (props)=>{


    const {submitHandler, onChangeHandler, instrument, errors, buttonText } = props; 

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Title</label>
                    <input name = "title" value = {instrument.title} onChange = {onChangeHandler} type = "text"></input>

                {
                    errors.title?
                    <span>{errors.title.message}</span>
                    :null 
                }

                </div>
                <div>
                    <label>Price</label>
                    <input name = "price" value = {instrument.price} onChange = {onChangeHandler} type = "text"></input>
                {
                    errors.price?
                    <span>{errors.price.message}</span>
                    :null 
                }

                </div>
                <div>
                    <label>Description</label>
                    <input name = "description" value = {instrument.description} onChange = {onChangeHandler} type = "text"></input>
                {
                    errors.description?
                    <span>{errors.description.message}</span>
                    :null 
                }
                </div>
                <div>
                    <label>Image</label>
                    <input name = "image" value = {instrument.image} onChange = {onChangeHandler} type = "text"></input>
                {
                    errors.image?
                    <span>{errors.image.message}</span>
                    :null 
                }
                </div>
                <button>{buttonText}</button>
            </form>
        </div>
    )
}

export default Form;